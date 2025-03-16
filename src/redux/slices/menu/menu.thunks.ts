import { toast } from 'react-toastify';

import { restauranteApi } from '../../../api';
import { ICategory, IProduct, ISection } from '../../../models';
import { AppThunk } from '../../store';
import { setActiveCategory, updateSection } from './menu.slice';

export const addCategory =
  (category: ICategory): AppThunk =>
  async (dispatch, getState) => {
    const { activeSection, sections } = getState().menu;

    //Find section
    const section = sections.find((sec) => sec.id === category.section.id);

    let newSection = {
      ...section,
      categories: [...activeSection?.categories!, category]
    }! as ISection;

    dispatch(updateSection(newSection));
  };

export const updateCategory =
  (category: ICategory): AppThunk =>
  async (dispatch, getState) => {
    const { section } = category;

    const { activeSection } = getState().menu;

    if (activeSection!.id !== category.section.id) {
      dispatch(addCategory(category));
      dispatch(deleteCategory(category));
    } else {
      const newCategories = activeSection?.categories.map((cate) => {
        if (cate.id === category.id) return { ...cate, ...category };
        return cate;
      });

      let newSection = {
        ...activeSection,
        categories: newCategories
      }! as ISection;

      dispatch(updateSection(newSection));
    }
  };

export const deleteCategory =
  (category: ICategory): AppThunk =>
  async (dispatch, getState) => {
    const { activeSection, sections } = getState().menu;

    const section = sections.find((sec) => sec.id === category.section.id);

    const newCategories = section?.categories.filter(
      (cate) => cate.id !== category.id
    );

    let newSection = { ...section, categories: newCategories } as ISection;

    dispatch(updateSection(newSection));
  };

export const addProduct =
  (product: IProduct): AppThunk =>
  async (dispatch, getState) => {
    const { category } = product;

    const { activeCategory, activeSection } = getState().menu;

    let newCategory = activeSection?.categories.find(
      (cate) => cate.id === category.id
    )!;

    newCategory! = {
      ...newCategory,
      products: [...newCategory?.products!, product]
    };

    dispatch(updateCategory(newCategory));
    dispatch(setActiveCategory(newCategory));
  };

export const updateProduct =
  (product: IProduct): AppThunk =>
  async (dispatch, getState) => {
    const { category } = product;

    const { activeCategory, activeSection } = getState().menu;

    let newCategory = activeSection?.categories.find(
      (cate) => cate.id === category.id
    )!;

    const isProduct = newCategory.products.find((p) => p.id === product.id);

    if (!isProduct) {
      dispatch(addProduct(product));
      const product2 = activeCategory!.products.find(
        (p) => p.id === product.id
      );
      product2 && dispatch(deleteProduct(product2));
      return;
    }

    let newProducts = newCategory?.products.map((p) => {
      if (p.id === product.id) return { ...p, ...product };
      return p;
    })!;

    newCategory! = { ...newCategory, products: newProducts };

    dispatch(updateCategory(newCategory));
    dispatch(setActiveCategory(newCategory));
  };

export const deleteProduct =
  (product: IProduct): AppThunk =>
  async (dispatch, getState) => {
    const { category } = product;

    const { activeCategory, activeSection } = getState().menu;

    let newCategory = activeSection?.categories.find(
      (cate) => cate.id === category.id
    )!;

    let newProducts = newCategory.products.filter((p) => p.id !== product.id);

    newCategory! = { ...newCategory, products: newProducts };

    dispatch(updateCategory(newCategory));
    dispatch(setActiveCategory(newCategory));
  };

// Crear una nueva seccion
/*

*/

// Actualizar una seccion
/* export const seccionStartUpdate = (seccion: ISection): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const resp = await fetchConToken(`menu/secciones/actualizar/${seccion.idSeccion}`, seccion, 'PUT');
    const body = await resp.json();


    if (resp.ok) {
      dispatch(seccionUpdated(seccion));
      toast.success(body.msg)

    } else {
      toast.error(body.errors[0].msg);
    }

  } catch (error) {
    console.log(error)
  }


}; */

// Eliminar una seccion
/* export const seccionStartDelete = (idSeccion: number): AppThunk => async (
  dispatch,
  getState) => {

  try {
    const resp = await fetchConToken(`menu/secciones/eliminar/${idSeccion}`, {}, 'DELETE');
    const body = await resp.json();

    if (resp.ok) {
      dispatch(seccionDeleted(idSeccion));
      toast.success(body.msg)


    }
    else {
      toast.error(body.errors[0].msg);
    }

  } catch (error) {
    console.log(error);
  }

}; */

// Cargar todas las secciones
/* export const seccionStartLoad = (): AppThunk => async (
  dispatch,
  getState) => {

  try {

    const { data } = await restauranteApi.get<ISection[]>('menu/secciones');

    dispatch(seccionLoaded([{
      id: '1',
      name: 'Seccion 1'
    }]));


  } catch (e) {
    console.log(e);
  }

}; */
