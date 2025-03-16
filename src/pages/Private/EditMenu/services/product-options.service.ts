import { restauranteApi } from '../../../../api';
import { ProductOption } from '../../../../models';
import { CreateProductOptionDto, UpdateProductOptionDto } from '../dto';

export const getProductOptions = async (): Promise<ProductOption[]> => {
  const resp = await restauranteApi.get<ProductOption[]>(`product-options/`);

  return resp.data;
};

export const createProductOption = async (
  createProductOptionDto: CreateProductOptionDto
): Promise<ProductOption> => {
  const resp = await restauranteApi.post<ProductOption>(
    `product-options/`,
    createProductOptionDto
  );

  return resp.data;
};

export const updateProductOption = async (
  id: number,
  updateProductOptionDto: UpdateProductOptionDto
): Promise<ProductOption> => {
  const resp = await restauranteApi.patch<ProductOption>(
    `product-options/${id}`,
    updateProductOptionDto
  );

  return resp.data;
};

export const getProductOption = async (id: number): Promise<ProductOption> => {
  const resp = await restauranteApi.get<ProductOption>(`product-options/${id}`);

  return resp.data;
};
