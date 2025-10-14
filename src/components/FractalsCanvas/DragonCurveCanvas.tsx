"use client";

import { useEffect, useRef, useState } from "react";

export default function DragonCurveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iterations, setIterations] = useState(10);
  const [size, setSize] = useState(10);

  // Função que gera a sequência da curva do dragão
  const generateDragonCurve = (n: number) => {
    let seq = "R";
    for (let i = 0; i < n; i++) {
      const inverted = seq
        .split("")
        .reverse()
        .map((char) => (char === "R" ? "L" : "R"))
        .join("");
      seq = seq + "R" + inverted;
    }
    return seq;
  };

  // Desenho da curva
  const drawDragon = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const instructions = generateDragonCurve(iterations);
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let angle = 0;

    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 0; i < instructions.length; i++) {
      if (instructions[i] === "R") {
        angle += Math.PI / 2;
      } else {
        angle -= Math.PI / 2;
      }

      x += size * Math.cos(angle);
      y += size * Math.sin(angle);
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  };

  // Redesenha ao alterar parâmetros
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 600;
    canvas.height = 600;
    drawDragon();
  }, [iterations, size]);

  // Baixar imagem do fractal
  const downloadImg = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "dragon_curve.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 text-white">
      <canvas
        ref={canvasRef}
        className="bg-white rounded-xl shadow-lg max-w-full h-auto"
      />

      <div className="w-full max-w-md flex flex-col gap-4 bg-neutral-900 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <label htmlFor="iterations" className="text-sm">
            Iterações:
          </label>
          <input
            id="iterations"
            type="number"
            min="1"
            max="16"
            value={iterations}
            onChange={(e) => setIterations(parseInt(e.target.value))}
            className="w-20 text-center p-1 rounded bg-white text-black"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="size" className="text-sm">
            Tamanho Inicial:
          </label>
          <input
            id="size"
            type="number"
            min="1"
            max="20"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-20 text-center p-1 rounded bg-white text-black"
          />
        </div>

        <div className="flex justify-between mt-3">
          <button
            onClick={drawDragon}
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-semibold"
          >
            Atualizar
          </button>
          <button
            onClick={downloadImg}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white font-semibold"
          >
            Baixar Imagem
          </button>
        </div>
      </div>
    </div>
  );
}
