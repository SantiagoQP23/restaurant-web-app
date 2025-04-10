import { restauranteApi } from '../api';
import { loadAbort } from '../helpers';
import { ICategory, IProduct, ISection, Menu } from '../models';

export const getMenu = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<ISection[]>('/menu', {
      signal: controller.signal
    }),
    controller
  };
};

export const getAllMenu = async (restaurantId: string): Promise<Menu> => {
  const resp = await restauranteApi.get<Menu>(`/menu/${restaurantId}`);
  return resp.data;
};

export const getSections = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<ISection[]>('/sections', {
      signal: controller.signal
    }),
    controller
  };
};

export const getCategories = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<ICategory[]>('/categories', {
      signal: controller.signal
    }),
    controller
  };
};
export const getProducts = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<IProduct[]>('/products', {
      signal: controller.signal
    }),
    controller
  };
};
