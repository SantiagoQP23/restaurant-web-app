/**
 * @author Steven Rosales
 * @version 1.0 15/03/2025 Add iva to product
 * Get the price without IVA
 * @param price - The price with IVA
 * @param iva - The IVA percentage
 * @returns The price without IVA
 */
export const getPriceWithoutIva = (price: number, iva: number) => {
  return Math.floor((price / (1 + iva / 100)) * 100) / 100;
};

/**
 * @author Steven Rosales
 * @version 1.0 15/03/2025 Add iva to product
 * Get Iva value
 * @param price - The price with IVA
 * @param iva - The IVA percentage
 * @returns The Iva value
 */
export const getIvaValue = (price: number, iva: number) => {
  return Math.floor(price * (iva / 100) * 100) / 100;
};


/**
 * @author Steven Rosales
 * @version 1.0 15/03/2025 Add iva to product
 * Get the price with IVA
 * @param price - The price withIVA
 * @param iva - The IVA percentage
 * @returns The price with IVA
 */
export const getPriceWithIva = (price: number, iva: number) => {
  return Math.floor(price * (1 + iva / 100) * 100) / 100;
};




/**
 * format percentage
 * @param value - The value
 * @param decimalPlaces - The decimal places
 * @returns {string} The formatted value
 */
export const formatPercentage = (
  value: number = 0,
  decimalPlaces: number = 2
): string => {
  return `${value.toFixed(decimalPlaces)}%`;
};
