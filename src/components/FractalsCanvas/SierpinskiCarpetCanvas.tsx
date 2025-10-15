"use client";

import { useRef, useState, useEffect } from "react";

export default function SierpinskiCarpetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [recursionLevel, setRecursionLevel] = useState(4);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [squareColor, setSquareColor] = useState("#000000");
  const [animate, setAnimate] = useState(false);

  const drawCarpet = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (animate) {
      animateDrawing(ctx, recursionLevel);
    } else {
      drawSierpinski(ctx, 0, 0, canvas.width, recursionLevel, squareColor);
    }
  };

  const drawSierpinski = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    level: number,
    color: string
  ) => {
    if (level === 0) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);
      return;
    }

    const newSize = size / 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) continue;
        drawSierpinski(ctx, x + i * newSize, y + j * newSize, newSize, level - 1, color);
      }
    }
  };

  const animateDrawing = (
    ctx: CanvasRenderingContext2D,
    level: number
  ) => {
    let currentLevel = 0;
    const interval = setInterval(() => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawSierpinski(ctx, 0, 0, ctx.canvas.width, currentLevel, squareColor);
      currentLevel++;
      if (currentLevel > level) clearInterval(interval);
    }, 500);
  };

  useEffect(() => {
    drawCarpet();
  }, [drawCarpet]);

  const downloadImg = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "sierpinski_carpet.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-xl font-bold mb-4">Carpete de Sierpinski</h1>

      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="bg-black rounded-lg mb-4"
      />

      <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-3 w-full max-w-sm">
        <label className="flex justify-between text-sm">
          Nível de Recursão:
          <input
            type="number"
            value={recursionLevel}
            min={0}
            max={6}
            onChange={(e) => setRecursionLevel(parseInt(e.target.value))}
            className="w-20 text-center p-1 rounded bg-white text-black"
          />
        </label>

        <label className="flex justify-between text-sm">
          Cor do Fundo:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-20 h-6 rounded bg-white border-none"
          />
        </label>

        <label className="flex justify-between text-sm">
          Cor dos Quadrados:
          <input
            type="color"
            value={squareColor}
            onChange={(e) => setSquareColor(e.target.value)}
            className="w-20 h-6 rounded bg-white border-none"
          />
        </label>

        <label className="flex justify-between text-sm">
          Mostrar Animação:
          <input
            type="checkbox"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
            className="accent-orange-500"
          />
        </label>

        <button
          onClick={drawCarpet}
          className="bg-orange-500 hover:bg-orange-600 rounded p-2 font-semibold"
        >
          Atualizar
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
