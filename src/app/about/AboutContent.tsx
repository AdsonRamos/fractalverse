"use client";

import { motion } from 'framer-motion';
import { Zap, Eye, Cpu, Users, Target, Lightbulb } from 'lucide-react';

export default function GalleryContent() {
  const features = [
    {
      icon: Eye,
      title: 'Visualizações Interativas',
      description: 'Explore fractais em tempo real com controles intuitivos, zoom infinito e diferentes paletas de cores.'
    },
    {
      icon: Cpu,
      title: 'Algoritmos Otimizados',
      description: 'Implementações de alta performance que permitem renderização rápida mesmo em dispositivos menos potentes.'
    },
    {
      icon: Users,
      title: 'Acessível para Todos',
      description: 'Interface intuitiva e educativa, adequada tanto para iniciantes quanto para especialistas em matemática.'
    },
    {
      icon: Target,
      title: 'Precisão Científica',
      description: 'Algoritmos matematicamente corretos que garantem a fidelidade dos padrões fractais originais.'
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Inovação',
      description: 'Sempre buscando novas formas de visualizar e interagir com fractais.'
    },
    {
      icon: Users,
      title: 'Educação',
      description: 'Democratizando o acesso ao conhecimento matemático através de visualizações interativas.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Otimização constante para garantir a melhor experiência de usuário possível.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Sobre o Fractalverse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Uma plataforma dedicada à visualização interativa de fractais, 
            democratizando o acesso à beleza matemática e geométrica.
          </motion.p>
        </div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 md:p-12 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-6">Nossa Missão</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              O Fractalverse nasceu da paixão por tornar a matemática acessível e visualmente 
              impressionante. Acreditamos que os fractais são uma das manifestações mais belas da 
              matemática, e nossa missão é permitir que qualquer pessoa possa explorar e se maravilhar 
              com esses padrões infinitos.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Através de visualizações interativas de alta qualidade, algoritmos otimizados e uma 
              interface intuitiva, transformamos conceitos matemáticos complexos em experiências 
              visuais fascinantes e educativas.
            </p>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">O que nos diferencia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technology Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-20"
        >
          <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-6">Tecnologia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Next.js 15 com App Router</li>
                  <li>• React 18 com TypeScript</li>
                  <li>• TailwindCSS para estilização</li>
                  <li>• Framer Motion para animações</li>
                  <li>• Canvas API para renderização</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Algoritmos</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Implementações otimizadas de fractais</li>
                  <li>• Web Workers para processamento paralelo</li>
                  <li>• Algoritmos de zoom e pan suaves</li>
                  <li>• Paletas de cores dinâmicas</li>
                  <li>• Renderização em tempo real</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 md:p-12 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-white mb-4">Pronto para explorar?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Comece sua jornada pelo mundo dos fractais e descubra padrões infinitos 
              que desafiam a imaginação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/gallery"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Explorar Galeria
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-lg transition-colors"
              >
                Entrar em Contato
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}