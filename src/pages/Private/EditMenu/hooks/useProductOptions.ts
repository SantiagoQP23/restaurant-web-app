import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { queryKeys } from '@/api/query-keys';

/**
 * Hook to fetch a single product option by ID
 * @version 2.0 - Migrated to React Query v5
 */
export const useProductOption = (productionAreaId: number) => {
  return useQuery({
    queryKey: ['production-area', productionAreaId],
    queryFn: () => getProductOption(productionAreaId)
  });
};

/**
 * Hook to fetch all product options
 * @version 2.0 - Migrated to React Query v5
 */
export const useProductOptions = () => {
  return useQuery({
    queryKey: ['production-areas'],
    queryFn: () => getProductOptions()
  });
};

/**
 * Hook to create a new product option
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateProductOption = (productId: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const { findProductById } = useEditMenuStore();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<ProductOption, unknown, CreateProductOptionDto>({
    mutationFn: (data: CreateProductOptionDto) => createProductOption(data),
    onSuccess: (productOption: ProductOption) => {
      const product = findProductById(productId)!;
      const updatedProduct = {
        ...product,
        options: [...product.options, productOption]
      };

      dispatch(updateProduct(updatedProduct));
      dispatch(setActiveProduct(updatedProduct));
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(productId)
      });
      enqueueSnackbar('Se creó correctamente', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('No se pudo crear', { variant: 'error' });
    }
  });
};

/**
 * Hook to update a product option
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateProductOption = (productId: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const { findProductById } = useEditMenuStore();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<
    ProductOption,
    unknown,
    { id: number; productionArea: UpdateProductOptionDto }
  >({
    mutationFn: (data: {
      id: number;
      productionArea: UpdateProductOptionDto;
    }) => updateProductOption(data.id, data.productionArea),
    onSuccess: (productOption: ProductOption) => {
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
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(productId)
      });

      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
    }
  });
};
