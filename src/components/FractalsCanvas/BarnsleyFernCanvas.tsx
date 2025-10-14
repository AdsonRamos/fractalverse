"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

export default function BarnsleyFernCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [points, setPoints] = useState<number>(100000);
  const [color, setColor] = useState<string>("#00ff00");

  const clampNumber = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const resizeCanvasToDisplaySize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = Math.max(100, Math.floor(rect.width));
    const height = Math.max(100, Math.floor(rect.height));

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const transform = useCallback(
    (x: number, y: number, choice: number) => {
      if (choice < 0.01) {
        return { x: 0, y: 0.16 * y };
      } else if (choice < 0.86) {
        return { x: 0.85 * x + 0.04 * y, y: -0.04 * x + 0.85 * y + 1.6 };
      } else if (choice < 0.93) {
        return { x: 0.2 * x - 0.26 * y, y: 0.23 * x + 0.22 * y + 1.6 };
      } else {
        return { x: -0.15 * x + 0.28 * y, y: 0.26 * x + 0.24 * y + 0.44 };
      }
    },
    []
  );

  const drawFern = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color || "#00ff00";

    const pts = clampNumber(points, 1000, 500000);

    let x = 0;
    let y = 0;

    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

    const scaleX = canvasWidth / 12;
    const scaleY = canvasHeight / 12;

    for (let i = 0; i < pts; i++) {
      const choice = Math.random();
      const newPoint = transform(x, y, choice);
      x = newPoint.x;
      y = newPoint.y;

      const px = Math.round(canvasWidth / 2 + x * scaleX);
      const py = Math.round(canvasHeight - y * scaleY);
      ctx.fillRect(px, py, 1, 1);
    }
  }, [points, color, transform]);

  const downloadImg = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "barnsley_fern.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  useEffect(() => {
    resizeCanvasToDisplaySize();
    drawFern();

    const ro = new ResizeObserver(() => {
      resizeCanvasToDisplaySize();
      drawFern();
    });

    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [resizeCanvasToDisplaySize, drawFern]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-white">
      <h2 className="text-2xl font-semibold mb-4">Samambaia de Barnsley</h2>

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
        aria-label="Canvas Samambaia de Barnsley"
      />

      <div className="w-full max-w-md bg-neutral-900 p-4 rounded-lg mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label>Pontos</label>
          <input
            type="number"
            min={1000}
            max={500000}
            value={points}
            onChange={(e) => setPoints(clampNumber(Number(e.target.value) || 1000, 1000, 500000))}
            className="w-24 text-center p-1 rounded bg-white text-black"
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
            onClick={drawFern}
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
