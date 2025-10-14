import { Metadata } from 'next';
import { getFractalById, fractals } from '@/lib/fractals';
import FractalsContent from './FractalsContent';

interface FractalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return fractals.map((fractal) => ({
    id: fractal.id,
  }));
}

export async function generateMetadata({ params }: FractalPageProps): Promise<Metadata> {
  const { id } = await params;
  const fractal = getFractalById(id);
  
  if (!fractal) {
    return {
      title: 'Fractal não encontrado - Fractalverse',
    };
  }

  return {
    title: `${fractal.name} - Fractalverse`,
    description: fractal.description,
    keywords: [fractal.name, 'fractal', fractal.category, fractal.discoverer, 'visualização', 'matemática'],
    openGraph: {
      title: `${fractal.name} - Fractalverse`,
      description: fractal.description,
      type: 'website',
    },
  };
}

export default async function FractalPage({ params }: FractalPageProps) {
  const { id } = await params;
  return (
    < FractalsContent fractalId={id}/>
  );
}
