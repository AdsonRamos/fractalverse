

const fractals = [
  { name: "Triângulo de Sierpiński", description: "Triângulo subdividido removendo o centro.", img: 'resources/fractals/sierpinski_triangle.png', link: 'sierpisnki_triangle.html' },
  { name: "Carpete de Sierpiński", description: "Quadrado dividido em 9 partes, removendo o centro.", img: 'resources/fractals/sierpinski_carpet.png', link: 'sierpinski_carpet.html' },
  { name: "Curva de Koch", description: "Segmento substituído por um padrão em forma de 'V'.", img: 'resources/fractals/koch_curve.png', link: 'koch_curve.html' },
  { name: "Floco de Neve de Koch", description: "Triângulo com cada lado transformado em curva de Koch.", img: 'resources/fractals/koch_snowflake.png', link: 'koch_snowflake.html'},
  { name: "Árvore de Pythagoras", description: "Quadrado gerando dois quadrados inclinados recursivamente." },
  { name: "Conjunto de Mandelbrot", description: "Definido por \( z_{n+1} = z_n^2 + c \), iterando no plano complexo." },
  { name: "Conjunto de Julia", description: "Similar ao Mandelbrot, mas fixando \( c \) e variando \( z_0 \)." },
  { name: "Curva de Dragon", description: "Segmento dobrado repetidamente em ângulos retos." },
  { name: "Curva de Hilbert", description: "Linha preenchendo o espaço com curvas em 'U' recursivas." },
  { name: "Curva de Peano", description: "Curva que preenche o espaço contínuo subdividindo-se." },
  { name: "Curva de Gosper", description: "Curva fractal suave baseada em ângulos diferentes." },
  { name: "Samambaia de Barnsley", description: "Gerado por transformações geométricas iteradas." },
  { name: "Triângulo de Vicsek", description: "Quadrado subdividido e removendo áreas centrais." }
];

const container = document.getElementById("cards-container");


fractals.forEach(fractal => {
  //console.log(img)
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

  /* if (fractal.img) {
    const img = document.createElement("img")
    img.src = fractal.img
    card.appendChild(img)
  } */
  container.appendChild(card);
});