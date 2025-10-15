"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Fractal } from "@/types/fractal";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface CardFractalProps {
  fractal: Fractal;
  index: number;
}

const CardFractal = ({ fractal, index }: CardFractalProps) => {
  const getComplexityColor = (complexity: Fractal["complexity"]) => {
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

  const getCategoryColor = (category: Fractal["category"]) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={fractal.route}>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group-hover:scale-105">
          {/* Image Placeholder */}
          <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">
                <Image src={fractal.image} alt="Ícone Fractal" width={300} height={300}/>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getComplexityColor(
                  fractal.complexity
                )}`}
              >
                {fractal.complexity}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                {fractal.name}
              </h3>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {fractal.shortDescription}
            </p>

            <div className="flex items-center justify-between">
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                  fractal.category
                )}`}
              >
                {fractal.category}
              </div>
              <div className="text-xs text-gray-500">
                {fractal.year} • {fractal.discoverer}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CardFractal;
