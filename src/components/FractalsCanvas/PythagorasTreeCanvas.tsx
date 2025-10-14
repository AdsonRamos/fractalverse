"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

export default function PythagorasTreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [recursionLevel, setRecursionLevel] = useState<number>(5);
  const [baseColor, setBaseColor] = useState<string>("#228B22");

  const clampNumber = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const resizeCanvasToDisplaySize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = Math.max(100, Math.floor(rect.width));
    const height = Math.max(100, Math.floor(rect.width));

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const drawSquare = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();
    },
    []
  );

  const drawTree = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      level: number,
      color: string
    ) => {
      if (level <= 0) return;

      drawSquare(ctx, x, y, size, angle, color);

      const newSize = size * Math.cos(Math.PI / 4);

      const xLeft = x - newSize * Math.cos(angle + Math.PI / 4);
      const yLeft = y + newSize * Math.sin(angle - 3 * Math.PI / 4);

      const xRight = x + 2 * newSize * Math.cos(angle - Math.PI / 4);
      const yRight = y - 2 * newSize * Math.sin(angle + 3 * Math.PI / 4);

      drawTree(ctx, xLeft, yLeft, newSize, angle - Math.PI / 4, level - 1, color);
      drawTree(ctx, xRight, yRight, newSize, angle + Math.PI / 4, level - 1, color);
    },
    [drawSquare]
  );

  const renderTree = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const level = clampNumber(recursionLevel, 0, 12);
    const color = baseColor || "#228B22";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

    drawTree(ctx, canvasWidth / 2 - 50, canvasHeight - 100, 100, 0, level, color);
  }, [recursionLevel, baseColor, drawTree]);

  useEffect(() => {
    resizeCanvasToDisplaySize();
    renderTree();

    const ro = new ResizeObserver(() => {
      resizeCanvasToDisplaySize();
      renderTree();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
    };
  }, [resizeCanvasToDisplaySize, renderTree]);

  const downloadImg = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "pythagoras_tree.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-white">
      <h2 className="text-2xl font-semibold mb-4">Árvore de Pythagoras</h2>

      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          width: "100%",
          maxWidth: 720,
          height: "auto",
          boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
        }}
        aria-label="Canvas Árvore de Pythagoras"
      />

      <div className="w-full max-w-md bg-neutral-900 p-4 rounded-lg mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label>Nível de Recursão</label>
          <input
            type="number"
            min={0}
            max={12}
            value={recursionLevel}
            onChange={(e) => setRecursionLevel(clampNumber(Number(e.target.value) || 0, 0, 12))}
            className="w-20 text-center p-1 rounded bg-white text-black"
          />
        </div>

        <div className="flex items-center justify-between">
          <label>Cor Base</label>
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-12 h-8 p-0 border-0"
          />
        </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={renderTree}
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
