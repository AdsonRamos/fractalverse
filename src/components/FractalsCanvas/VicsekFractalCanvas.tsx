"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

export default function VicsekFractalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [depth, setDepth] = useState<number>(3);
  const [color, setColor] = useState<string>("#ffcc00");

  const clampNumber = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const resizeCanvasToDisplaySize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = Math.max(100, Math.floor(rect.width));
    const height = width; // manter quadrado

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const drawVicsek = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, d: number) => {
      if (d === 0) {
        ctx.fillRect(x, y, size, size);
      } else {
        const newSize = size / 3;
        drawVicsek(ctx, x, y, newSize, d - 1);
        drawVicsek(ctx, x + 2 * newSize, y, newSize, d - 1);
        drawVicsek(ctx, x, y + 2 * newSize, newSize, d - 1);
        drawVicsek(ctx, x + 2 * newSize, y + 2 * newSize, newSize, d - 1);
        drawVicsek(ctx, x + newSize, y + newSize, newSize, d - 1);
      }
    },
    []
  );

  const renderVicsek = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const level = clampNumber(depth, 0, 5);
    const strokeColor = color || "#ffcc00";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = strokeColor;

    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
    const size = Math.min(canvasWidth, canvasHeight) * 0.8;
    const offset = (canvasWidth - size) / 2;

    drawVicsek(ctx, offset, offset, size, level);
  }, [depth, color, drawVicsek]);

  useEffect(() => {
    resizeCanvasToDisplaySize();
    renderVicsek();

    const ro = new ResizeObserver(() => {
      resizeCanvasToDisplaySize();
      renderVicsek();
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [resizeCanvasToDisplaySize, renderVicsek]);

  const downloadImg = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "vicsek_fractal.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-white">
      <h2 className="text-2xl font-semibold mb-4">Fractal de Vicsek</h2>

      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: "#000",
          borderRadius: 12,
          width: "100%",
          maxWidth: 720,
          height: "auto",
          boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
        }}
        aria-label="Canvas Fractal de Vicsek"
      />

      <div className="w-full max-w-md bg-neutral-900 p-4 rounded-lg mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label>Profundidade</label>
          <input
            type="number"
            min={0}
            max={5}
            value={depth}
            onChange={(e) => setDepth(clampNumber(Number(e.target.value) || 0, 0, 5))}
            className="w-20 text-center p-1 rounded bg-white text-black"
          />
        </div>

        <div className="flex items-center justify-between">
          <label>Cor</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-8 p-0 border-0"
          />
        </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={renderVicsek}
            className="flex-1 bg-green-500 hover:bg-green-600 rounded p-2 font-semibold text-black"
          >
            Gerar Fractal
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
