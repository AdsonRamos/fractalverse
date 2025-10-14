import { Fractal } from '@/types/fractal';
import MandelbrotCanvas from "@/components/FractalsCanvas/MandelbrotCanvas";
import JuliaCanvas from "@/components/FractalsCanvas/JuliaCanvas";
import SierpinskiTriangleCanvas from '@/components/FractalsCanvas/SierpinskiTriangleCanvas';
import DragonCurveCanvas from '@/components/FractalsCanvas/DragonCurveCanvas';
import KochSnowflakeCanvas from '@/components/FractalsCanvas/KochSnowflakeCanvas';
import SierpinskiCarpetCanvas from '@/components/FractalsCanvas/SierpinskiCarpetCanvas';
import FractalTreeCanvas from '@/components/FractalsCanvas/FractalTreeCanvas';
import PythagorasTreeCanvas from '@/components/FractalsCanvas/PythagorasTreeCanvas';
//import BarnsleyFernCanvas from '@/components/FractalsCanvas/BarnsleyFernCanvas';
import HilbertCurveCanvas from '@/components/FractalsCanvas/HilbertCurveCanvas';
import VicsekFractalCanvas from '@/components/FractalsCanvas/VicsekFractalCanvas';

export const fractals: Fractal[] = [
  {
    id: 'mandelbrot',
    name: 'Conjunto de Mandelbrot',
    description: 'O conjunto de Mandelbrot é um fractal definido como o conjunto de pontos c no plano complexo para o qual a sequência iterativa z_{n+1} = z_n² + c não diverge quando iterada a partir de z_0 = 0.',
    shortDescription: 'O fractal mais famoso, caracterizado por sua forma de "bug" e infinitos detalhes.',
    image: '/images/fractals/mandelbrot_set.png',
    route: '/fractals/mandelbrot',
    category: 'mathematical',
    complexity: 'complex',
    year: 1980,
    discoverer: 'Benoit Mandelbrot',
    canvas: MandelbrotCanvas
  },
  {
    id: 'julia',
    name: 'Conjunto de Julia',
    description: 'Os conjuntos de Julia são fractais definidos pela iteração de funções complexas. Cada conjunto de Julia é associado a um parâmetro complexo c.',
    shortDescription: 'Família de fractais relacionados ao conjunto de Mandelbrot.',
    image: '/images/fractals/julia_set.png',
    route: '/fractals/julia',
    category: 'mathematical',
    complexity: 'complex',
    year: 1918,
    discoverer: 'Gaston Julia',
    canvas: JuliaCanvas
  },
  {
    id: 'sierpinski',
    name: 'Triângulo de Sierpinski',
    description: 'O triângulo de Sierpinski é um fractal geométrico criado pela divisão recursiva de um triângulo equilátero em triângulos menores.',
    shortDescription: 'Fractal geométrico clássico com padrão triangular recursivo.',
    image: '/images/fractals/sierpinski_triangle.png',
    route: '/fractals/sierpinski',
    category: 'geometric',
    complexity: 'simple',
    year: 1915,
    discoverer: 'Wacław Sierpiński',
    canvas: SierpinskiTriangleCanvas
  },
  {
    id: 'dragon-curve',
    name: 'Curva do Dragão',
    description: 'A curva do dragão é um fractal que pode ser construído através de dobras repetidas de uma tira de papel.',
    shortDescription: 'Fractal criado através de dobras de papel, formando padrões de dragão.',
    image: '/images/fractals/dragon_curve.png',
    route: '/fractals/dragon-curve',
    category: 'geometric',
    complexity: 'intermediate',
    year: 1966,
    discoverer: 'John Heighway',
    canvas: DragonCurveCanvas
  },
  {
    id: 'koch-snowflake',
    name: 'Floco de Neve de Koch',
    description: 'O floco de neve de Koch é um fractal construído começando com um triângulo equilátero e substituindo cada lado por quatro segmentos.',
    shortDescription: 'Fractal em forma de floco de neve com padrões infinitos.',
    image: '/images/fractals/koch_snowflake.png',
    route: '/fractals/koch-snowflake',
    category: 'geometric',
    complexity: 'simple',
    year: 1904,
    discoverer: 'Helge von Koch',
    canvas: KochSnowflakeCanvas
  },
  {
    id: 'sierpinski-carpet',
    name: 'Carpete de Sierpiński',
    description:
      'O Carpete de Sierpiński é um fractal construído removendo recursivamente o quadrado central de um quadrado maior, dividindo-o em 9 partes iguais a cada iteração.',
    shortDescription:
      'Um fractal baseado em quadrados recursivos, exibindo simetria e autossimilaridade infinita.',
    image: '/images/fractals/sierpinski_carpet.png',
    route: '/fractals/sierpinski-carpet',
    category: 'geometric',
    complexity: 'intermediate',
    year: 1916,
    discoverer: 'Wacław Sierpiński',
    canvas: SierpinskiCarpetCanvas,
  },
  {
    id: 'fractal-tree',
    name: 'Árvore Fractal',
    description:
      'A árvore fractal é gerada recursivamente ao dividir um tronco em dois ou mais galhos, aplicando ângulos e escalas constantes, simulando o crescimento natural das árvores.',
    shortDescription:
      'Um fractal que imita o crescimento natural das árvores, com ramificações infinitas.',
    image: '/images/fractals/fractal_tree.png',
    route: '/fractals/fractal-tree',
    category: 'natural',
    complexity: 'simple',
    year: 1988,
    discoverer: 'Michael Barnsley',
    canvas: FractalTreeCanvas,
  },
  {
    id: 'pythagoras-tree',
    name: 'Árvore de Pitágoras',
    description:
      'A árvore de Pitágoras é um fractal geométrico formado por quadrados dispostos de forma que os lados obedecem ao teorema de Pitágoras, gerando uma estrutura de aparência orgânica.',
    shortDescription:
      'Um fractal baseado no teorema de Pitágoras, com quadrados ramificados.',
    image: '/images/fractals/pythagoras_tree.png',
    route: '/fractals/pythagoras-tree',
    category: 'geometric',
    complexity: 'intermediate',
    year: 1942,
    discoverer: 'Albert E. Bosman',
    canvas: PythagorasTreeCanvas,
  },
  {
    id: 'hilbert-curve',
    name: 'Curva de Hilbert',
    description:
      'A curva de Hilbert é uma curva fractal de preenchimento de espaço que passa por todos os pontos de uma grade quadrada, demonstrando como uma linha pode preencher uma área bidimensional.',
    shortDescription:
      'Uma curva contínua que preenche o plano, exemplo clássico de autossimilaridade.',
    image: '/images/fractals/hilbert_curve.png',
    route: '/fractals/hilbert-curve',
    category: 'mathematical',
    complexity: 'complex',
    year: 1891,
    discoverer: 'David Hilbert',
    canvas: HilbertCurveCanvas,
  },
  // {
  //   id: 'barnsley-fern',
  //   name: 'Samambaia de Barnsley',
  //   description:
  //     'A Samambaia de Barnsley é um fractal gerado por transformações lineares iteradas, capaz de reproduzir padrões encontrados na natureza, como folhas e plantas.',
  //   shortDescription:
  //     'Um fractal natural que reproduz o padrão de uma samambaia real.',
  //   image: '/images/barnsley-fern-preview.jpg',
  //   route: '/fractals/barnsley-fern',
  //   category: 'natural',
  //   complexity: 'complex',
  //   year: 1988,
  //   discoverer: 'Michael Barnsley',
  //   canvas: BarnsleyFernCanvas,
  // },
  {
    id: 'vicsek-fractal',
    name: 'Fractal de Vicsek',
    description:
      'O fractal de Vicsek é construído dividindo um quadrado em 9 partes iguais e mantendo o quadrado central e os quatro quadrados nos cantos, repetindo o processo infinitamente.',
    shortDescription:
      'Um fractal simétrico formado por padrões quadrados repetidos em diferentes escalas.',
    image: '/images/fractals/vicsek_fractal.png',
    route: '/fractals/vicsek-fractal',
    category: 'geometric',
    complexity: 'simple',
    year: 1983,
    discoverer: 'Tamás Vicsek',
    canvas: VicsekFractalCanvas,
  }
];

export const getFractalById = (id: string): Fractal | undefined => {
  return fractals.find(fractal => fractal.id === id);
};

export const getFractalsByCategory = (category: Fractal['category']): Fractal[] => {
  return fractals.filter(fractal => fractal.category === category);
};
