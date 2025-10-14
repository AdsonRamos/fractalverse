"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-8xl font-bold text-blue-400 mb-4">404</div>
          <h1 className="text-4xl font-bold text-white mb-4">Página não encontrada</h1>
          <p className="text-xl text-gray-400 mb-8">
            Ops! Parece que você se perdeu no infinito dos fractais. 
            A página que você está procurando não existe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors group"
            >
              <Home className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Voltar ao Início
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center px-6 py-3 border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-lg transition-colors group"
            >
              <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Explorar Galeria
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
