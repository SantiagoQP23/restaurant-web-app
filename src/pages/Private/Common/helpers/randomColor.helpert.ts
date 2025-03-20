export const generateRandomColor = () => {
  // Generar valores aleatorios para los componentes RGB
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Combinar los componentes RGB en una cadena de color RGBA
  const color = `rgba(${red}, ${green}, ${blue}, 0.8)`;

  return color;
};
