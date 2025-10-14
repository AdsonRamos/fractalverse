"use client";

import { useRef, useEffect, useState } from "react";

export default function MandelbrotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [iterations, setIterations] = useState(100);
  const [zoom, setZoom] = useState(200);
  const [offsetX, setOffsetX] = useState(-2);
  const [offsetY, setOffsetY] = useState(-1.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.createImageData(width, height);
    const pixels = imageData.data;

    function mandelbrot(x: number, y: number, maxIter: number) {
      let real = x;
      let imag = y;
      for (let i = 0; i < maxIter; i++) {
        const real2 = real * real - imag * imag + x;
        const imag2 = 2 * real * imag + y;
        real = real2;
        imag = imag2;
        if (real * real + imag * imag > 4) return i;
      }
      return maxIter;
    }

    for (let px = 0; px < width; px++) {
      for (let py = 0; py < height; py++) {
        const x0 = px / zoom + offsetX;
        const y0 = py / zoom + offsetY;
        const iter = mandelbrot(x0, y0, iterations);
        const color = iter === iterations ? 0 : (255 * iter) / iterations;
        const index = (px + py * width) * 4;
        pixels[index] = color;
        pixels[index + 1] = color * 0.5;
        pixels[index + 2] = 10 - color;
        pixels[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [iterations, zoom, offsetX, offsetY]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "mandelbrot_set.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="bg-white rounded-xl w-full max-w-lg"
      />

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-lg bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
        <label className="flex flex-col text-gray-300 text-sm">
          Iterações
          <input
            type="number"
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="mt-1 p-1 text-center bg-gray-700 text-white rounded"
            min={10}
            max={1000}
          />
        </label>

        <label className="flex flex-col text-gray-300 text-sm">
          Zoom
          <input
            type="number"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="mt-1 p-1 text-center bg-gray-700 text-white rounded"
            min={50}
            max={1000}
          />
        </label>

        <label className="flex flex-col text-gray-300 text-sm">
          Offset X
          <input
            type="number"
            step="0.1"
            value={offsetX}
            onChange={(e) => setOffsetX(Number(e.target.value))}
            className="mt-1 p-1 text-center bg-gray-700 text-white rounded"
          />
        </label>

        <label className="flex flex-col text-gray-300 text-sm">
          Offset Y
          <input
            type="number"
            step="0.1"
            value={offsetY}
            onChange={(e) => setOffsetY(Number(e.target.value))}
            className="mt-1 p-1 text-center bg-gray-700 text-white rounded"
          />
        </label>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
      >
        Baixar imagem
      </button>
    </div>
  );
}
