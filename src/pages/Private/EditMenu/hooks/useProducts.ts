import { useMutation, useQuery } from '@tanstack/react-query';
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

export const useProducts = () => {};

/**
 * Hook to get a product by id.
 * @author Santiago Quirumbay
 * @version 1.1 19/12/2023 Update activeProduct in redux store.
 */
export const useProduct = (id: string) => {
  const dispatch = useDispatch();
  return useQuery<IProduct, unknown>(['product', id], () => getProduct(id), {
    onSuccess: (product) => {
      dispatch(setActiveProduct(product));
    }
  });
};

export const useCreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IProduct, unknown, CreateProductDto>(
    (data) => createProduct(data),
    {
      onSuccess: () => {
        enqueueSnackbar('Se creó correctamente', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('No se pudo crear', { variant: 'error' });
      }
    }
  );
};

export const useUpdateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IProduct, unknown, UpdateProductDto>(
    (data) => updateProduct(data.id, data),
    {
      onSuccess: () => {
        enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
      }
    }
  );
};

export const useUpdateImageProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IProduct, unknown, UpdateProductImageDto>(
    (data) => updateProductImage(data.id, data),
    {
      onSuccess: () => {
        enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('No se pudo actualizar la imagen', {
          variant: 'error'
        });
      }
    }
  );
};
