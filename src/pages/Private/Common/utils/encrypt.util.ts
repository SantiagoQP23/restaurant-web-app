export const replaceNumbersWithAsterisks = (inputString: string): string => {
  // Use a regular expression to match numbers in the string
  const regex = /\d/g;

  // Replace matched numbers with asterisks
  const resultString = inputString.replace(regex, '*');

  return resultString;
};
