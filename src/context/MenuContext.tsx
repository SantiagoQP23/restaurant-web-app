import { createContext, FC } from 'react';

import { ICategory, IProduct, ISection } from '../models';

import { useEffect, useState } from 'react';

import { setActiveSection } from '../redux/slices/menu';
import { useAppDispatch } from '../hooks/useRedux';
import { useSelector } from 'react-redux';
import { selectMenu } from '../redux/slices/menu/menu.slice';

interface IMenuContext {
  changeSection: (idSection: string) => void;
  changeCategory: (idCategory: string) => void;
  sections: ISection[];
  categories: ICategory[];
  products: IProduct[];
  activeSection: ISection | null;
  activeCategory: ICategory | null;
  /*  idSection: string;
   idCategory: string; */
}

interface Props {
  children: React.ReactNode;
}

export const MenuContext = createContext({} as IMenuContext);

export const MenuProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const [categoriasSeccion, setCategoriasSeccion] = useState<ICategory[]>([]);

  const [productosCategoria, setProductosCategoria] = useState<IProduct[]>([]);

  const { sections, activeSection, activeCategory } = useSelector(selectMenu);

  //const { sections, activeSection } = useAppSelector((selectSections));

  //const { categories, activeCategory } = useAppSelector((selectCategories));

  //const { products, activeProduct } = useAppSelector((selectProducts));

  const changeSection = (idSection: string) => {
    const section = sections.find((section) => section.id === idSection);

    dispatch(setActiveSection(section!));
    //setMenu({ ...menu, idSection });
  };

  const changeCategory = (idCategory: string) => {
    const category = categoriasSeccion.find((cate) => cate.id === idCategory);

    // dispatch(setActiveCategory(category!))
    //setMenu({ ...menu, idCategory });
  };

  const filterCategories = () => {
    if (activeSection) {
      setCategoriasSeccion(activeSection.categories!);

      if (categoriasSeccion.length > 0) changeCategory(categoriasSeccion[0].id);
    }
  };

  // Funciona
  const cargarProductosByIdCategoria = (idCategory?: string) => {
    /* 
    if (categories.length > 0 && activeCategory) {

      let productosCategoria = products.filter(product => product.category.id === activeCategory!.id);

      setProductosCategoria(activeCategory.products!);

    }else {
      setProductosCategoria([])
    } */
  };

  /*   useEffect(() => {
    
    if (categoriasSeccion.length > 0) {
      changeCategory(categoriasSeccion[0].id)
    }else {
      dispatch(resetActiveCategory())
    }

  }, [categoriasSeccion]) */

  useEffect(() => {
    filterCategories();
  }, [activeSection]);

  /*  useEffect(() => {
    filterCategories();
  }, [categories]) */

  // Funciona
  useEffect(() => {
    cargarProductosByIdCategoria();
  }, [activeCategory]);

  useEffect(() => {
    // Al actualizar se debe mostrar la nueva información
    if (sections.length > 0 && !activeSection) {
      changeSection(sections[0].id);
    }
  }, [sections]);

  return (
    <MenuContext.Provider
      value={{
        changeSection,
        changeCategory,
        sections,
        categories: categoriasSeccion,
        products: productosCategoria,
        activeCategory,
        activeSection
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
