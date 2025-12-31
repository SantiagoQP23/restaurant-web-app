import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { IProduct } from '../../../../models';
import { CreateProductDto, UpdateProductDto } from '../dto/';
import {
  UpdateProductImageDto,
  createProduct,
  getProduct,
  updateProduct,
  updateProductImage
} from '../services/menu.service';
import { useDispatch } from 'react-redux';
import { setActiveProduct } from '../../../../redux';
import { queryKeys } from '@/api/query-keys';

export const useProducts = () => {};

/**
 * Hook to get a product by id.
 * @author Santiago Quirumbay
 * @version 2.0 - Migrated to React Query v5
 */
export const useProduct = (id: string) => {
  const dispatch = useDispatch();
  const productQuery = useQuery<IProduct, unknown>({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => getProduct(id)
  });

  // Handle Redux integration - dispatch on successful data fetch
  useEffect(() => {
    if (productQuery.isSuccess && productQuery.data) {
      console.log('Product fetched:', productQuery.data);
      dispatch(setActiveProduct(productQuery.data));
    }
  }, [productQuery.data, productQuery.isSuccess, dispatch]);

  return productQuery;
};

/**
 * Hook to create a new product
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<IProduct, unknown, CreateProductDto>({
    mutationFn: (data: CreateProductDto) => createProduct(data),
    onSuccess: () => {
      enqueueSnackbar('Se creó correctamente', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
    },
    onError: () => {
      enqueueSnackbar('No se pudo crear', { variant: 'error' });
    }
  });
};

/**
 * Hook to update a product
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<IProduct, unknown, UpdateProductDto>({
    mutationFn: (data: UpdateProductDto) => updateProduct(data.id, data),
    onSuccess: (data: IProduct) => {
      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(data.id)
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
    }
  });
};

/**
 * Hook to update a product image
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateImageProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<IProduct, unknown, UpdateProductImageDto>({
    mutationFn: (data: UpdateProductImageDto) =>
      updateProductImage(data.id, data),
    onSuccess: (data: IProduct) => {
      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(data.id)
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.menu.all });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar la imagen', {
        variant: 'error'
      });
    }
  });
};
