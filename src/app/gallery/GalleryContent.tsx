"use client";

import { motion } from 'framer-motion';
import { fractals } from '@/lib/fractals';
import CardFractal from '@/components/CardFractal';
import { Filter, Search } from 'lucide-react';

export default function GalleryContent() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Galeria de Fractais
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Explore nossa coleção completa de fractais interativos. Cada fractal possui características únicas 
            e padrões infinitos que revelam a beleza oculta da matemática.
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar fractais..."
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-lg text-white transition-colors">
                <Filter className="h-4 w-4" />
                Filtrar
              </button>
            </div>
          </div>
        </motion.div>

        {/* Fractals Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {fractals.map((fractal, index) => (
            <CardFractal key={fractal.id} fractal={fractal} index={index} />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">Estatísticas da Galeria</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">{fractals.length}</div>
                <div className="text-gray-400">Fractais Disponíveis</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {fractals.filter(f => f.category === 'mathematical').length}
                </div>
                <div className="text-gray-400">Fractais Matemáticos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {fractals.filter(f => f.category === 'geometric').length}
                </div>
                <div className="text-gray-400">Fractais Geométricos</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}