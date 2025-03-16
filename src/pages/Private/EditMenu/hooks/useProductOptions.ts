import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createProductOption,
  getProductOption,
  getProductOptions,
  updateProductOption
} from '../services/product-options.service';
import { useSnackbar } from 'notistack';
import { ProductOption } from '../../../../models';
import { CreateProductOptionDto, UpdateProductOptionDto } from '../dto';
import { useEditMenuStore } from './useEditMenuStore';
import { useDispatch } from 'react-redux';
import { setActiveProduct, updateProduct } from '../../../../redux';

export const useProductOption = (productionAreaId: number) => {
  return useQuery(['production-areas'], () =>
    getProductOption(productionAreaId)
  );
};

export const useProductOptions = () => {
  return useQuery(['production-areas'], () => getProductOptions(), {});
};

export const useCreateProductOption = (productId: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const { findProductById } = useEditMenuStore();
  const dispatch = useDispatch();

  return useMutation<ProductOption, unknown, CreateProductOptionDto>(
    (data) => createProductOption(data),
    {
      onSuccess: (productOption) => {
        const product = findProductById(productId)!;
        const updatedProduct = {
          ...product,
          options: [...product.options, productOption]
        };

        dispatch(updateProduct(updatedProduct));
        dispatch(setActiveProduct(updatedProduct));
        enqueueSnackbar('Se creó correctamente', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('No se pudo crear', { variant: 'error' });
      }
    }
  );
};

export const useUpdateProductOption = (productId: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const { findProductById } = useEditMenuStore();
  const dispatch = useDispatch();

  return useMutation<
    ProductOption,
    unknown,
    { id: number; productionArea: UpdateProductOptionDto }
  >((data) => updateProductOption(data.id, data.productionArea), {
    onSuccess: (productOption) => {
      const product = findProductById(productId)!;

      const options = product.options.map((option) => {
        if (option.id === productOption.id) {
          return productOption;
        }
        return option;
      });

      const updatedProduct = { ...product, options };

      dispatch(updateProduct(updatedProduct));
      dispatch(setActiveProduct(updatedProduct));

      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
    }
  });
};
