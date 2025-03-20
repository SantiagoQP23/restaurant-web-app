export const parseDate = (textFecha = ''): string => {
  let fecha = new Date(textFecha);

  let mes: string | number = fecha.getMonth() + 1; //obteniendo mes
  let dia: string | number = fecha.getDate(); //obteniendo dia
  let anio = fecha.getFullYear(); //obteniendo año

  if (dia < 10) dia = '0' + dia; //agrega cero si el menor de 10

  if (mes < 10) mes = '0' + mes; //agrega cero si el menor de 10

  return `${anio}-${mes}-${dia}`;
};
