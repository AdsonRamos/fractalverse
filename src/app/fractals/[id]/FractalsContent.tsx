"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { getFractalById, fractals } from "@/lib/fractals";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Zap,
  Cpu,
  Palette,
} from "lucide-react";
import Link from "next/link";

interface FractalPageProps {
  fractalId: string;
}

export default function FractalsContent({ fractalId }: FractalPageProps) {
  const fractal = getFractalById(fractalId);
  const CanvasComponent = fractal?.canvas;

  if (!fractal) {
    notFound();
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "complex":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mathematical":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "geometric":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "natural":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para a Galeria
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                    fractal.category
                  )}`}
                >
                  {fractal.category}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getComplexityColor(
                    fractal.complexity
                  )}`}
                >
                  {fractal.complexity}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {fractal.name}
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                {fractal.description}
              </p>
            </motion.div>

            {/* Canvas Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Visualização Interativa
                </h2>
                {CanvasComponent ? (
                  <CanvasComponent />
                ) : (
                  <div className="relative h-96 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
                    <p className="text-gray-400 text-lg">
                      Canvas interativo será implementado aqui
                    </p>
                  </div>
                )}                
              </div>
            </motion.div>

            {/* Technical Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Detalhes Técnicos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Algoritmo
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Este fractal utiliza algoritmos iterativos para gerar
                    padrões complexos. A implementação otimizada permite
                    renderização em tempo real com alta precisão.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Performance
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Otimizado para WebGL e Canvas 2D, com suporte a Web Workers
                    para processamento paralelo e renderização suave.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Fractal Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 mb-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">Informações</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Descoberto em</p>
                    <p className="text-white font-medium">{fractal.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Descoberto por</p>
                    <p className="text-white font-medium">
                      {fractal.discoverer}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Cpu className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Complexidade</p>
                    <p className="text-white font-medium capitalize">
                      {fractal.complexity}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 mb-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">Recursos</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">Zoom infinito</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Palette className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">
                    Múltiplas paletas
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Cpu className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300 text-sm">
                    Renderização em tempo real
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Related Fractals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Fractais Relacionados
              </h2>
              <div className="space-y-3">
                {fractals
                  .filter(
                    (f) =>
                      f.category === fractal.category && f.id !== fractal.id
                  )
                  .slice(0, 3)
                  .map((relatedFractal) => (
                    <Link
                      key={relatedFractal.id}
                      href={relatedFractal.route}
                      className="block p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm group-hover:text-blue-300 transition-colors">
                          {relatedFractal.name}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
