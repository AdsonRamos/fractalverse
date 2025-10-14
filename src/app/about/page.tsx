import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'Sobre - Fractalverse',
  description: 'Conheça o Fractalverse, uma plataforma dedicada à visualização interativa de fractais. Descubra nossa missão de democratizar o acesso à beleza matemática.',
  keywords: ['sobre', 'fractais', 'missão', 'visualização', 'matemática', 'educação'],
  openGraph: {
    title: 'Sobre - Fractalverse',
    description: 'Conheça o Fractalverse, uma plataforma dedicada à visualização interativa de fractais.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
      <AboutContent />
    );
}
