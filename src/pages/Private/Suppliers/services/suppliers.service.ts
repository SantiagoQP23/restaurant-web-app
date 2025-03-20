import { restauranteApi } from '../../../../api';
import { CreateSupplierDto } from '../models/dto/create-supplier.dto';
import { UpdateSupplierDto } from '../models/dto/udpate-supplier.dto';
import { Supplier } from '../models/supplier.model';

export const getSuppliers = async (): Promise<Supplier[]> => {
  const { data } = await restauranteApi.get<Supplier[]>('/suppliers');

  return data;
};

export const createSupplier = async (
  supplier: CreateSupplierDto
): Promise<Supplier> => {
  const { data } = await restauranteApi.post<Supplier>('/suppliers', supplier);

  return data;
};

export const updateSupplier = async (
  supplier: UpdateSupplierDto
): Promise<Supplier> => {
  const { id, ...supplierDto } = supplier;

  const { data } = await restauranteApi.patch<Supplier>(
    `/suppliers/${id}`,
    supplierDto
  );

  return data;
};

export const deleteSupplier = async (id: string): Promise<void> => {
  await restauranteApi.delete<void>(`/suppliers/${id}`);
};
