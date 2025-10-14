"use client";

import { useEffect, useRef, useState } from "react";

export default function SierpinskiTriangleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [depth, setDepth] = useState(5);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [triangleColor, setTriangleColor] = useState("#000000");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 520;

    const drawTriangle = (
      x: number,
      y: number,
      size: number,
      depth: number,
      delay: number
    ) => {
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / 2, y - size);
        ctx.lineTo(x + size, y);
        ctx.closePath();
        ctx.fill();
        return;
      }

      const newSize = size / 2;
      setTimeout(() => {
        drawTriangle(x, y, newSize, depth - 1, delay);
        drawTriangle(x + newSize / 2, y - newSize, newSize, depth - 1, delay);
        drawTriangle(x + newSize, y, newSize, depth - 1, delay);
      }, delay);
    };

    const render = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = triangleColor;
      drawTriangle(100, 450, 400, depth, animate ? 100 : 0);
    };

    render();
  }, [depth, bgColor, triangleColor, animate]);

  const downloadImg = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "sierpinski_triangle.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 text-white">
      <canvas
        ref={canvasRef}
        className="bg-black rounded-xl shadow-lg max-w-full h-auto"
      />

      <div className="w-full max-w-md flex flex-col gap-4 bg-neutral-900 p-4 rounded-lg">
        {/* Profundidade */}
        <div className="flex items-center justify-between">
          <label htmlFor="depth" className="text-sm">
            Profundidade:
          </label>
          <input
            id="depth"
            type="number"
            min="0"
            max="7"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="w-20 text-center text-black rounded p-1"
          />
        </div>

        {/* Cor de fundo */}
        <div className="flex items-center justify-between">
          <label htmlFor="bgColor" className="text-sm">
            Cor de Fundo:
          </label>
          <input
            id="bgColor"
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-20 p-1"
          />
        </div>

        {/* Cor do triângulo */}
        <div className="flex items-center justify-between">
          <label htmlFor="triangleColor" className="text-sm">
            Cor do Triângulo:
          </label>
          <input
            id="triangleColor"
            type="color"
            value={triangleColor}
            onChange={(e) => setTriangleColor(e.target.value)}
            className="w-20 p-1"
          />
        </div>

        {/* Checkbox animação */}
        <div className="flex items-center justify-between">
          <label htmlFor="animate" className="text-sm">
            Mostrar Animação:
          </label>
          <input
            id="animate"
            type="checkbox"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
          />
        </div>

        {/* Botões */}
        <div className="flex justify-between mt-3">
          <button
            onClick={() => {}}
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
