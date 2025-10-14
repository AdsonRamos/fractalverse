"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

export default function HilbertCurveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [iterations, setIterations] = useState<number>(4);
  const [color, setColor] = useState<string>("#00ffcc");

  const clampNumber = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const resizeCanvasToDisplaySize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const width = Math.max(100, Math.floor(rect.width));
    const height = width; // manter canvas quadrado

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const hilbertCurve = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      order: number,
      x: number,
      y: number,
      xi: number,
      xj: number,
      yi: number,
      yj: number,
      firstMove: boolean = true
    ) => {
      if (order === 0) {
        const newX = x + (xi + yi) / 2;
        const newY = y + (xj + yj) / 2;
        firstMove ? ctx.moveTo(newX, newY) : ctx.lineTo(newX, newY);
        return;
      }

      hilbertCurve(ctx, order - 1, x, y, yi / 2, yj / 2, xi / 2, xj / 2, firstMove);
      hilbertCurve(
        ctx,
        order - 1,
        x + xi / 2,
        y + xj / 2,
        xi / 2,
        xj / 2,
        yi / 2,
        yj / 2,
        false
      );
      hilbertCurve(
        ctx,
        order - 1,
        x + xi / 2 + yi / 2,
        y + xj / 2 + yj / 2,
        xi / 2,
        xj / 2,
        yi / 2,
        yj / 2,
        false
      );
      hilbertCurve(
        ctx,
        order - 1,
        x + xi / 2 + yi,
        y + xj / 2 + yj,
        -yi / 2,
        -yj / 2,
        -xi / 2,
        -xj / 2,
        false
      );
    },
    []
  );

  const renderHilbert = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const order = clampNumber(iterations, 1, 7);
    const strokeColor = color || "#00ffcc";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
    const size = Math.min(canvasWidth, canvasHeight) * 0.8;
    const offsetX = (canvasWidth - size) / 2;
    const offsetY = (canvasHeight - size) / 2;

    hilbertCurve(ctx, order, offsetX, offsetY, size, 0, 0, size);
    ctx.stroke();
  }, [iterations, color, hilbertCurve]);

  useEffect(() => {
    resizeCanvasToDisplaySize();
    renderHilbert();

    const ro = new ResizeObserver(() => {
      resizeCanvasToDisplaySize();
      renderHilbert();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [resizeCanvasToDisplaySize, renderHilbert]);

  const downloadImg = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "hilbert_curve.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center text-white">
      <h2 className="text-2xl font-semibold mb-4">Curva de Hilbert</h2>

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
        aria-label="Canvas Curva de Hilbert"
      />

      <div className="w-full max-w-md bg-neutral-900 p-4 rounded-lg mt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label>Iterações</label>
          <input
            type="number"
            min={1}
            max={7}
            value={iterations}
            onChange={(e) =>
              setIterations(clampNumber(Number(e.target.value) || 1, 1, 7))
            }
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
            onClick={renderHilbert}
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
