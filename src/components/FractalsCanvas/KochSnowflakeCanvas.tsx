"use client";

import { useRef, useState, useEffect } from "react";

export default function KochSnowflakeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iterations, setIterations] = useState(3);

  const drawFractal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawKochSnowflake(ctx, iterations);
  };

  const drawKochSnowflake = (ctx: CanvasRenderingContext2D, iterations: number) => {
    const size = 400;
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    const p1 = { x: centerX - size / 2, y: centerY + (size * Math.sqrt(3)) / 6 };
    const p2 = { x: centerX + size / 2, y: centerY + (size * Math.sqrt(3)) / 6 };
    const p3 = { x: centerX, y: centerY - (size * Math.sqrt(3)) / 3 };

    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;

    koch(ctx, p1, p2, iterations);
    koch(ctx, p2, p3, iterations);
    koch(ctx, p3, p1, iterations);
  };

  const koch = (
    ctx: CanvasRenderingContext2D,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    iterations: number
  ) => {
    if (iterations === 0) {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    } else {
      const deltaX = p2.x - p1.x;
      const deltaY = p2.y - p1.y;

      const pA = { x: p1.x + deltaX / 3, y: p1.y + deltaY / 3 };
      const pB = { x: p1.x + (2 * deltaX) / 3, y: p1.y + (2 * deltaY) / 3 };

      const angle = Math.PI / 3;
      const pC = {
        x: pA.x + Math.cos(angle) * (deltaX / 3) - Math.sin(angle) * (deltaY / 3),
        y: pA.y + Math.sin(angle) * (deltaX / 3) + Math.cos(angle) * (deltaY / 3),
      };

      koch(ctx, p1, pA, iterations - 1);
      koch(ctx, pA, pC, iterations - 1);
      koch(ctx, pC, pB, iterations - 1);
      koch(ctx, pB, p2, iterations - 1);
    }
  };

  useEffect(() => {
    drawFractal();
  }, []);

  const downloadImg = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "koch_snowflake.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-xl font-bold mb-4">Snowflake de Koch</h1>

      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="bg-white rounded-lg mb-4"
      />

      <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-3 w-full max-w-sm">
        <label className="flex justify-between text-sm">
          Número de iterações:
          <input
            type="number"
            value={iterations}
            min={0}
            max={10}
            onChange={(e) => setIterations(parseInt(e.target.value))}
            className="w-24 text-center p-1 rounded bg-white text-black"
          />
        </label>

        <button
          onClick={drawFractal}
          className="bg-orange-500 hover:bg-orange-600 rounded p-2 font-semibold"
        >
          Desenhar
        </button>

        <button
          onClick={downloadImg}
          className="bg-teal-500 hover:bg-teal-600 rounded p-2 font-semibold"
        >
          Baixar Imagem
        </button>
      </div>
    </div>
  );
}
