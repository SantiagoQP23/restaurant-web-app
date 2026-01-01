import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createSupplier,
  getSuppliers,
  updateSupplier
} from '../services/suppliers.service';
import { Supplier } from '../models/supplier.model';
import { CreateSupplierDto } from '../models/dto/create-supplier.dto';
import { useSnackbar } from 'notistack';
import { UpdateSupplierDto } from '../models/dto/udpate-supplier.dto';
import { queryClient } from '../../../../api/query-client';

export const useSuppliers = () => {
  const suppliersQuery = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers
  });

  useEffect(() => {
    if (suppliersQuery.isSuccess && suppliersQuery.data) {
      console.log(suppliersQuery.data);
    }
  }, [suppliersQuery.data, suppliersQuery.isSuccess]);

  return {
    suppliersQuery
  };
};

export const useCreateSupplier = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Supplier, unknown, CreateSupplierDto>({
    mutationFn: (data: CreateSupplierDto) => createSupplier(data),
    onSuccess: () => {
      enqueueSnackbar('Proveedor creado correctamente', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: () => {
      console.log('onError');
      enqueueSnackbar('Error al crear el proveedor', { variant: 'error' });
    }
  });
};

export const useUpdateSupplier = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Supplier, unknown, UpdateSupplierDto>({
    mutationFn: (data: UpdateSupplierDto) => updateSupplier(data),
    onSuccess: () => {
      enqueueSnackbar('Proveedor actualizado correctamente', {
        variant: 'success'
      });
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
    onError: () => {
      console.log('onError');
      enqueueSnackbar('Error al actualizar el proveedor', { variant: 'error' });
    }
  });
};
