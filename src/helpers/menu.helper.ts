import { ICategory, IProduct, ISection } from "../models";

export const getProducts= (sections: ISection[]) :IProduct[]  => {

  let products: IProduct[] = [];

  for (const section of sections) {
    for (const category of section.categories) {
      for (const product of category.products) {
        products.push(product);
        
      }
      
    }
    
  }

  return products;
}

export const getCategories = (sections: ISection[]) :ICategory[] => {
  
    let categories: ICategory[] = [];
  
    for (const section of sections) {
      for (const category of section.categories) {
        categories.push(category);
        
      }
      
    }
  
    return categories;

}




export const findProductsByName = (name: string, listProducts: IProduct[]): IProduct[] => {

  let products: IProduct[] ;

  products = listProducts.filter(product => product.name.toLowerCase().includes(name.toLowerCase())) || [] ;


  return products;

}
