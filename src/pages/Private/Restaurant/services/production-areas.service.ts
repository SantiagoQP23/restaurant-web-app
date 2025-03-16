import { restauranteApi } from '../../../../api';
import { ProductionArea } from '../../Common/models/production-area.model';
import { CreateProductionAreaDto } from '../dto/create-production-area.dto';
import { UpdateProductionAreaDto } from '../dto/update-production-area.dto';

export const getProductionAreas = async (): Promise<ProductionArea[]> => {
  const resp = await restauranteApi.get<ProductionArea[]>(`production-areas/`);

  return resp.data;
};

export const createProductionArea = async (
  createProductionAreaDto: CreateProductionAreaDto
): Promise<ProductionArea> => {
  const resp = await restauranteApi.post<ProductionArea>(
    `production-areas/`,
    createProductionAreaDto
  );

  return resp.data;
};

export const updateProductionArea = async (
  id: number,
  updateProductionAreaDto: UpdateProductionAreaDto
): Promise<ProductionArea> => {
  const resp = await restauranteApi.patch<ProductionArea>(
    `production-areas/${id}`,
    updateProductionAreaDto
  );

  return resp.data;
};

export const getProductionArea = async (
  id: number
): Promise<ProductionArea> => {
  const resp = await restauranteApi.get<ProductionArea>(
    `production-areas/${id}`
  );

  return resp.data;
};
