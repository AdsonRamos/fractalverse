export interface Fractal {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  route: string;
  category: 'geometric' | 'mathematical' | 'natural';
  complexity: 'simple' | 'intermediate' | 'complex';
  year: number;
  discoverer: string;
  canvas?: any
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}
