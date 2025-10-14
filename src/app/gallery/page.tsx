import { Metadata } from 'next';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
  title: 'Galeria de Fractais - Fractalverse',
  description: 'Explore nossa coleção completa de fractais interativos. Descubra o conjunto de Mandelbrot, triângulo de Sierpinski, curva do dragão e muito mais.',
  keywords: ['galeria', 'fractais', 'Mandelbrot', 'Julia', 'Sierpinski', 'visualização', 'matemática'],
  openGraph: {
    title: 'Galeria de Fractais - Fractalverse',
    description: 'Explore nossa coleção completa de fractais interativos.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <GalleryContent />
  );
}
