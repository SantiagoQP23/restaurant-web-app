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
  const suppliersQuery = useQuery(['suppliers'], getSuppliers, {
    onSuccess: (data) => {
      console.log(data);
    }
  });

  return {
    suppliersQuery
  };
};

export const useCreateSupplier = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Supplier, unknown, CreateSupplierDto>(createSupplier, {
    onSuccess: () => {
      enqueueSnackbar('Proveedor creado correctamente', { variant: 'success' });
      queryClient.invalidateQueries(['suppliers']);
    },
    onError: () => {
      console.log('onError');
      enqueueSnackbar('Error al crear el proveedor', { variant: 'error' });
    }
  });
};

export const useUpdateSupplier = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Supplier, unknown, UpdateSupplierDto>(updateSupplier, {
    onSuccess: () => {
      enqueueSnackbar('Proveedor actualizado correctamente', {
        variant: 'success'
      });
      queryClient.invalidateQueries(['suppliers']);
    },
    onError: () => {
      console.log('onError');
      enqueueSnackbar('Error al actualizar el proveedor', { variant: 'error' });
    }
  });
};
