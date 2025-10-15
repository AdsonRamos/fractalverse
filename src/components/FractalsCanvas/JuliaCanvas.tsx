"use client";
import { useRef, useEffect, useState } from "react";

export default function JuliaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [iterations, setIterations] = useState(100);
  const [zoom, setZoom] = useState(1.5);
  const [cReal, setCReal] = useState(-0.7);
  const [cImag, setCImag] = useState(0.27015);

  // Função de cálculo do fractal de Julia
  function julia(x: number, y:number, cReal: number, cImag: number, maxIter: number) {
    let real = x;
    let imag = y;
    for (let i = 0; i < maxIter; i++) {
      const real2 = real * real - imag * imag + cReal;
      const imag2 = 2 * real * imag + cImag;
      real = real2;
      imag = imag2;
      if (real * real + imag * imag > 4) return i;
    }
    return maxIter;
  }

  // Desenho principal
  function drawFractal() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    for (let px = 0; px < width; px++) {
      for (let py = 0; py < height; py++) {
        const x0 = (px - width / 2) / (zoom * width / 2);
        const y0 = (py - height / 2) / (zoom * height / 2);
        const iter = julia(x0, y0, cReal, cImag, iterations);

        const color = iter === iterations ? 0 : (255 * iter) / iterations;
        const index = (px + py * width) * 4;
        pixels[index] = color; // Vermelho
        pixels[index + 1] = color * 0.5; // Verde
        pixels[index + 2] = 10 - color; // Azul
        pixels[index + 3] = 200; // Opacidade
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // Renderiza o fractal ao carregar e ao alterar os parâmetros
  useEffect(() => {
    drawFractal();
  }, [iterations, zoom, cReal, cImag, drawFractal]);

  // Baixar imagem
  function downloadImg() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "julia_set.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="bg-white rounded-lg mx-auto block w-full max-w-[600px] h-auto"
      />

      <div className="bg-neutral-900 p-5 rounded-lg w-full max-w-md flex flex-col gap-3 text-sm">
        <label className="flex justify-between items-center">
          Iterações:
          <input
            type="number"
            value={iterations}
            min="10"
            max="1000"
            onChange={(e) => setIterations(parseInt(e.target.value))}
            className="w-24 text-center p-1 rounded-md border border-neutral-700 bg-neutral-800 text-white"
          />
        </label>

        <label className="flex justify-between items-center">
          Zoom:
          <input
            type="number"
            step="0.1"
            min="0.5"
            max="5"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-24 text-center p-1 rounded-md border border-neutral-700 bg-neutral-800 text-white"
          />
        </label>

        <label className="flex justify-between items-center">
          C Real:
          <input
            type="number"
            step="0.01"
            value={cReal}
            onChange={(e) => setCReal(parseFloat(e.target.value))}
            className="w-24 text-center p-1 rounded-md border border-neutral-700 bg-neutral-800 text-white"
          />
        </label>

        <label className="flex justify-between items-center">
          C Imaginário:
          <input
            type="number"
            step="0.01"
            value={cImag}
            onChange={(e) => setCImag(parseFloat(e.target.value))}
            className="w-24 text-center p-1 rounded-md border border-neutral-700 bg-neutral-800 text-white"
          />
        </label>

        <div className="flex gap-3 mt-2">
          <button
            onClick={drawFractal}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md"
          >
            Atualizar
          </button>
          <button
            onClick={downloadImg}
            className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold py-2 rounded-md"
          >
            Baixar
          </button>
        </div>
      </div>
    </div>
  );
}
