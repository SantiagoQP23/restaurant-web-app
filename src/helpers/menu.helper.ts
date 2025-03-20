import { ICategory, IProduct, ISection } from '../models';

export const getProducts = (sections: ISection[]): IProduct[] => {
  const products: IProduct[] = [];

  for (const section of sections) {
    for (const category of section.categories) {
      for (const product of category.products) {
        products.push(product);
      }
    }
  }

  return products;
};

export const getCategories = (sections: ISection[]): ICategory[] => {
  const categories: ICategory[] = [];

  for (const section of sections) {
    for (const category of section.categories) {
      categories.push(category);
    }
  }

  return categories;
};

export const findProductsByName = (
  name: string,
  listProducts: IProduct[]
): IProduct[] => {
  const products: IProduct[] =
    listProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    ) || [];

  return products;
};
