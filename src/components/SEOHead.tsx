import { Metadata } from 'next';
import { SEOData } from '@/types/fractal';

interface SEOHeadProps {
  data: SEOData;
}

export const generateMetadata = ({ data }: SEOHeadProps): Metadata => {
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
    openGraph: {
      title: data.ogTitle || data.title,
      description: data.ogDescription || data.description,
      images: data.ogImage ? [{ url: data.ogImage }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.ogTitle || data.title,
      description: data.ogDescription || data.description,
      images: data.ogImage ? [data.ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};

export default function SEOHead() {
  return null; // This component is only used for metadata generation
}
