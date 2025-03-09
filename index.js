

const fractals = [
  { name: "Triângulo de Sierpiński", description: "Triângulo subdividido removendo o centro.", img: 'resources/fractals/sierpinski_triangle.png', link: 'src/pages/sierpisnki_triangle.html' },
  { name: "Carpete de Sierpiński", description: "Quadrado dividido em 9 partes, removendo o centro.", img: 'resources/fractals/sierpinski_carpet.png', link: 'src/pages/sierpinski_carpet.html' },
  { name: "Curva de Koch", description: "Segmento substituído por um padrão em forma de 'V'.", img: 'resources/fractals/koch_curve.png', link: 'src/pages/koch_curve.html' },
  { name: "Floco de Neve de Koch", description: "Triângulo com cada lado transformado em curva de Koch.", img: 'resources/fractals/koch_snowflake.png', link: 'src/pages/koch_snowflake.html' },
  { name: "Árvore Fractal", description: "Árvore gerada a partir de um galho inicial que se reparte em outros dois.", img: 'resources/fractals/fractal_tree.png', link: 'src/pages/fractal_tree.html' },
  /* { name: "Árvore de Pythagoras (Consertar)", description: "Quadrado gerando dois quadrados inclinados recursivamente.", img: 'resources/fractals/pythagoras_tree.png', link: 'src/pages/pythagoras_tree.html' }, */
  { name: "Conjunto de Mandelbrot", description: "Definido por \( z_{n+1} = z_n^2 + c \), iterando no plano complexo.", img: 'resources/fractals/mandelbrot_set.png', link: 'src/pages/mandelbrot_set.html' },
  { name: "Conjunto de Julia", description: "Similar ao Mandelbrot, mas fixando \( c \) e variando \( z_0 \).", img: 'resources/fractals/julia_set.png', link: 'src/pages/julia_set.html' },
  { name: "Curva de Dragon", description: "Segmento dobrado repetidamente em ângulos retos.", img: 'resources/fractals/dragon_curve.png', link: 'src/pages/dragon_curve.html'},
  /* { name: "Curva de Hilbert", description: "Linha preenchendo o espaço com curvas em 'U' recursivas.", img: 'resources/fractals/', link: 'src/pages/'},
  { name: "Curva de Peano", description: "Curva que preenche o espaço contínuo subdividindo-se.", img: 'resources/fractals/', link: 'src/pages/'},
  { name: "Curva de Gosper", description: "Curva fractal suave baseada em ângulos diferentes.", img: 'resources/fractals/', link: 'src/pages/'},
  { name: "Samambaia de Barnsley", description: "Gerado por transformações geométricas iteradas.", img: 'resources/fractals/', link: 'src/pages/'},
  { name: "Triângulo de Vicsek", description: "Quadrado subdividido e removendo áreas centrais.", img: 'resources/fractals/', link: 'src/pages/'} */
];

const container = document.getElementById("cards-container");


fractals.forEach(fractal => {

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img")
  img.src = fractal.img
  img.alt = fractal.name

  const title = document.createElement("h2")
  title.innerText = fractal.name

  const description = document.createElement("p")
  description.innerText = fractal.description
  card.appendChild(img)
  card.appendChild(title)
  card.appendChild(description)

  card.addEventListener("click", () => {
    window.location.href = fractal.link;
  });

  container.appendChild(card);
});