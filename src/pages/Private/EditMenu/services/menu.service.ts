import { restauranteApi } from '../../../../api';
import { loadAbort } from '../../../../helpers';

import { ISection, ICategory, IProduct } from '../../../../models';
import { UpdateCategoryDto, CreateCategoryDto } from '../dto/category.dto';
import { CreateSectionDto } from '../dto/create-section.dto';
import { CreateProductDto, UpdateProductDto } from '../dto/';
import { UpdateSectionDto } from '../dto/update-section.dto';
import { UploadExcelResponseDto } from '../dto/upload-excel.dto';

export const createSection = async (
  data: CreateSectionDto
): Promise<ISection> => {
  const resp = await restauranteApi.post<ISection>('/sections', data);

  return resp.data;
};

export const updateSection = async (
  id: string,
  data: UpdateSectionDto
): Promise<ISection> => {
  const resp = await restauranteApi.patch<ISection>(`/sections/${id}`, data);

  return resp.data;
};

export const updateManySections = async (
  data: UpdateSectionDto[]
): Promise<ISection[]> => {
  const resp = await restauranteApi.patch<ISection[]>('/sections', data);

  return resp.data;
};

export const deleteSection = async (id: string): Promise<void> => {
  const resp = await restauranteApi.delete(`/sections/${id}`);

  return resp.data;
};

export const createCategory = async (
  data: CreateCategoryDto
): Promise<ICategory> => {
  const resp = await restauranteApi.post<ICategory>('/categories', data);

  return resp.data;
};

export const updateCategory = async (
  id: string,
  data: UpdateCategoryDto
): Promise<ICategory> => {
  const resp = await restauranteApi.patch<ICategory>(`/categories/${id}`, data);

  return resp.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const resp = await restauranteApi.delete(`/categories/${id}`);

  return resp.data;
};

// export const createCategory = (data: CreateCategoryDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.post<ICategory>('/categories',
//     data,
//     { signal: controller.signal }),
//     controller
//   }

// }

// export const updateCategory = (id: string, data: UpdateCategoryDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.patch<ICategory>(`/categories/${id}`,
//     data,
//     { signal: controller.signal }),
//     controller
//   }

// }

// export const deleteCategory = (id: string) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.delete(`/categories/${id}`,
//     { signal: controller.signal }),
//     controller
//   }
// }

export const createProduct = async (
  data: CreateProductDto
): Promise<IProduct> => {
  const resp = await restauranteApi.post<IProduct>('/products', data);

  return resp.data;
};

export const updateProduct = async (
  id: string,
  data: UpdateProductDto
): Promise<IProduct> => {
  const resp = await restauranteApi.patch<IProduct>(`/products/${id}`, data);

  return resp.data;
};

export const getProduct = async (id: string): Promise<IProduct> => {
  const resp = await restauranteApi.get<IProduct>(`/products/${id}`);

  return resp.data;
};

// export const createProduct = (data: CreateProductDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.post<IProduct>('/products',
//     data,
//     { signal: controller.signal }),
//     controller
//   }

// }

// export const updateProduct = (id: string,data: UpdateProductDto) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.patch<ISection>(`/products/${id}`,
//     data,
//     { signal: controller.signal }),
//     controller
//   }

// }

export interface UpdateProductImageDto {
  id: string;
  file: File;
}

export const updateProductImage = async (
  id: string,
  data: UpdateProductImageDto
): Promise<IProduct> => {
  const formData = new FormData();
  formData.append('file', data.file);

  const resp = await restauranteApi.patch<IProduct>(
    `/products/image/${id}`,
    formData
  );

  return resp.data;
};

// export const updateProductImage = (id: string, data: UpdateProductImageDto) => {

//   console.log({data})

//   const formData = new FormData();
//   formData.append('file', data.file);

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.patch<ISection>(`/files/product-image/${id}`,
//     formData,
//     { signal: controller.signal }),
//     controller
//   }

// }

export const deleteProduct = (id: string) => {
  const controller = loadAbort();

  return {
    call: restauranteApi.delete(`/products/${id}`, {
      signal: controller.signal
    }),
    controller
  };
};

export const uploadMenuExcel = async (
  file: File
): Promise<UploadExcelResponseDto> => {
  const formData = new FormData();
  formData.append('file', file);

  const resp = await restauranteApi.post<UploadExcelResponseDto>(
    '/menu/upload',
    formData
  );

  return resp.data;
};
