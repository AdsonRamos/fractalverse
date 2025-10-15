"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

export default function FractalTreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const animationIntervalRef = useRef<number | null>(null);

  // States (com tipos explícitos)
  const [recursionLevel, setRecursionLevel] = useState<number>(6);
  const [angleDeg, setAngleDeg] = useState<number>(45);
  const [branchLeft, setBranchLeft] = useState<number>(1.0);
  const [branchRight, setBranchRight] = useState<number>(1.0);
  const [scaleFactor, setScaleFactor] = useState<number>(0.7);
  const [treeColor, setTreeColor] = useState<string>("#228B22");
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const [animate, setAnimate] = useState<boolean>(false);

  // --- Helpers de validação/clamping ---
  const clampNumber = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  // Ajusta o tamanho do canvas levando em conta DPR
  const resizeCanvasToDisplaySize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = Math.max(100, Math.floor(rect.width));
    const height = Math.max(100, Math.floor((rect.width * 5) / 6)); // manter proporção parecida com 600x500

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  // Função tipada para desenhar um ramo recursivo
  const drawBranch = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      length: number,
      angleRad: number,
      level: number,
      scale: number,
      color: string,
      leftFactor: number,
      rightFactor: number
    ): void => {
      if (level <= 0) return;

      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.5, level * 0.9);
      ctx.beginPath();
      ctx.moveTo(x, y);

      const xEnd = x + length * Math.cos(angleRad);
      const yEnd = y - length * Math.sin(angleRad);

      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();

      const rad = (angleDeg * Math.PI) / 180;

      // Clamp level to prevent pathological recursion if user set a weird value
      const nextLevel = Math.max(0, Math.floor(level - 1));

      // Left branch
      drawBranch(
        ctx,
        xEnd,
        yEnd,
        length * scale * leftFactor,
        angleRad + rad,
        nextLevel,
        scale,
        color,
        leftFactor,
        rightFactor
      );

      // Right branch
      drawBranch(
        ctx,
        xEnd,
        yEnd,
        length * scale * rightFactor,
        angleRad - rad,
        nextLevel,
        scale,
        color,
        leftFactor,
        rightFactor
      );
    },
    [angleDeg]
  );

  // Função que desenha a árvore inteira (segura contra canvas/context nulo)
  const drawTree = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // sanitize / clamp inputs
    const level = clampNumber(Math.floor(recursionLevel), 0, 12); // limite superior para evitar travar
    const scale = clampNumber(scaleFactor, 0.1, 0.95);
    const leftFactor = clampNumber(branchLeft, 0.1, 2);
    const rightFactor = clampNumber(branchRight, 0.1, 2);

    // Limpa e pinta fundo
    ctx.fillStyle = backgroundColor || "#000";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Because we use transform for DPR, fill with canvas CSS size (transform already set)
    ctx.fillRect(0, 0, Number(canvas.style.width.replace("px", "")), Number(canvas.style.height.replace("px", "")));

    // Calcular tamanho de ramo baseado no canvas
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
    const baseLength = Math.min(canvasWidth, canvasHeight) * 0.18; // escala relativa

    // Desenhar
    drawBranch(
      ctx,
      canvasWidth / 2,
      canvasHeight - 40,
      baseLength,
      Math.PI / 2,
      level,
      scale,
      treeColor || "#228B22",
      leftFactor,
      rightFactor
    );
  }, [recursionLevel, scaleFactor, branchLeft, branchRight, treeColor, backgroundColor, drawBranch]);

  // efeito: resize observer para canvas responsivo + desenha inicialmente
  useEffect(() => {
    resizeCanvasToDisplaySize();
    drawTree();

    const ro = new ResizeObserver(() => {
      resizeCanvasToDisplaySize();
      drawTree();
    });

    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
    };
  }, [resizeCanvasToDisplaySize, drawTree]);

  // efeito: redesenha quando parâmetros mudam (se não estiver animando)
  useEffect(() => {
    if (!animate) {
      // desenha com debounce leve (evita flood ao arrastar sliders)
      if (animationIntervalRef.current) {
        window.clearTimeout(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
      animationIntervalRef.current = window.setTimeout(() => {
        drawTree();
      }, 60);
    }
    return () => {
      if (animationIntervalRef.current) {
        window.clearTimeout(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    };
  }, [recursionLevel, angleDeg, branchLeft, branchRight, scaleFactor, treeColor, backgroundColor, animate, drawTree]);

  // animação do ângulo (requestAnimationFrame)
  useEffect(() => {
    if (!animate) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = t - start;
      // animação suave: faz o ângulo oscilar +/- 15 graus
      const oscillation = 15 * Math.sin(elapsed / 600); // ajustável
      setAngleDeg((base) => {
        // keep base stable: compute "base" from a ref? Here we simply override with oscillation relative to current
        return clampNumber(45 + oscillation, 0, 180); // centered at 45
      });

      drawTree();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [animate, drawTree]); // intentionally not including angleDeg setter in deps

  // Baixar imagem (tratando canvas nulo)
  const downloadImg = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    try {
      link.download = "fractal_tree.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      // fallback seguro
      console.error("Erro ao gerar imagem:", err);
    }
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (animationIntervalRef.current) {
        window.clearTimeout(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-white">
      <h2 className="text-2xl font-semibold mb-4">Árvore Fractal</h2>

      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: backgroundColor || "#000",
          borderRadius: 12,
          width: "100%",
          maxWidth: 720,
          height: "auto",
          boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
        }}
        aria-label="Canvas da Árvore Fractal"
      />

      <div className="w-full max-w-md bg-neutral-900 p-4 rounded-lg mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm">Nível de Recursão</label>
          <input
            type="number"
            value={recursionLevel}
            min={0}
            max={12}
            onChange={(e) => setRecursionLevel(clampNumber(Number(e.target.value) || 0, 0, 12))}
            className="w-20 text-center p-1 rounded bg-white text-black"
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <label className="text-sm">Ângulo (°)</label>
          <input
            type="range"
            value={angleDeg}
            min={0}
            max={180}
            onChange={(e) => setAngleDeg(clampNumber(Number(e.target.value) || 0, 0, 180))}
            className="w-40"
          />
          <span className="ml-2 text-sm">{Math.round(angleDeg)}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <label className="text-sm">Galho esquerda</label>
          <input
            type="range"
            value={branchLeft}
            min={0.5}
            max={1.5}
            step={0.01}
            onChange={(e) => setBranchLeft(clampNumber(Number(e.target.value) || 1, 0.5, 1.5))}
            className="w-40"
          />
          <span className="ml-2 text-sm">{branchLeft.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <label className="text-sm">Galho direita</label>
          <input
            type="range"
            value={branchRight}
            min={0.5}
            max={1.5}
            step={0.01}
            onChange={(e) => setBranchRight(clampNumber(Number(e.target.value) || 1, 0.5, 1.5))}
            className="w-40"
          />
          <span className="ml-2 text-sm">{branchRight.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <label className="text-sm">Fator de Escala</label>
          <input
            type="number"
            step="0.05"
            value={scaleFactor}
            min={0.1}
            max={0.95}
            onChange={(e) => setScaleFactor(clampNumber(Number(e.target.value) || 0.7, 0.1, 0.95))}
            className="w-20 text-center p-1 rounded bg-white text-black"
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <label className="text-sm">Cor da Árvore</label>
          <input
            type="color"
            value={treeColor}
            onChange={(e) => setTreeColor(e.target.value)}
            className="w-12 h-8 p-0 border-0"
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <label className="text-sm">Cor de Fundo</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-12 h-8 p-0 border-0"
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <label className="text-sm">Animar</label>
          <input
            type="checkbox"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
            className="w-6 h-6"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              // forces immediate draw with sanitized values
              setRecursionLevel((v) => clampNumber(v, 0, 12));
              setScaleFactor((v) => clampNumber(v, 0.1, 0.95));
              drawTree();
            }}
            className="flex-1 bg-amber-500 hover:bg-amber-600 rounded p-2 font-semibold text-black"
          >
            Atualizar
          </button>

          <button
            onClick={downloadImg}
            className="flex-1 bg-neutral-700 hover:bg-neutral-600 rounded p-2 font-semibold text-white"
          >
            Baixar Imagem
          </button>
        </div>
      </div>
    </div>
  );
}
