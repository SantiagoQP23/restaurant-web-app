import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProductionArea,
  getProductionArea,
  getProductionAreas,
  updateProductionArea
} from '../services/production-areas.service';
import { CreateProductionAreaDto } from '../dto/create-production-area.dto';
import { ProductionArea } from '../../Common/models/production-area.model';
import { UpdateProductionAreaDto } from '../dto/update-production-area.dto';
import { useSnackbar } from 'notistack';
import { useProductionAreasStore } from '../../Common/store/production-areas-store';

/**
 * Hook to fetch a single production area by ID
 * @version 2.0 - Migrated to React Query v5
 */
export const useProductionArea = (productionAreaId: number) => {
  return useQuery({
    queryKey: ['production-area', productionAreaId],
    queryFn: () => getProductionArea(productionAreaId)
  });
};

/**
 * Hook to fetch all production areas
 * @version 2.0 - Migrated to React Query v5
 */
export const useProductionAreas = () => {
  const { loadProductionAreas, setProductionAreaActive } =
    useProductionAreasStore();

  const productionAreasQuery = useQuery({
    queryKey: ['production-areas'],
    queryFn: () => getProductionAreas()
  });

  // Handle Zustand store integration - update on successful fetch
  useEffect(() => {
    if (productionAreasQuery.isSuccess && productionAreasQuery.data) {
      loadProductionAreas(productionAreasQuery.data);
      if (productionAreasQuery.data.length > 0) {
        setProductionAreaActive(productionAreasQuery.data[0]);
      }
    }
  }, [
    productionAreasQuery.data,
    productionAreasQuery.isSuccess,
    loadProductionAreas,
    setProductionAreaActive
  ]);

  return productionAreasQuery;
};

/**
 * Hook to create a new production area
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateProductionArea = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { addProductionArea } = useProductionAreasStore();
  const queryClient = useQueryClient();

  return useMutation<ProductionArea, unknown, CreateProductionAreaDto>({
    mutationFn: (data: CreateProductionAreaDto) => createProductionArea(data),
    onSuccess: (data: ProductionArea) => {
      enqueueSnackbar('Se creó correctamente', { variant: 'success' });
      addProductionArea(data);
      queryClient.invalidateQueries({ queryKey: ['production-areas'] });
    },
    onError: () => {
      enqueueSnackbar('No se pudo crear', { variant: 'error' });
    }
  });
};

/**
 * Hook to update a production area
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateProductionArea = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateProductionArea: updateArea } = useProductionAreasStore();
  const queryClient = useQueryClient();

  return useMutation<
    ProductionArea,
    unknown,
    { id: number; productionArea: UpdateProductionAreaDto }
  >({
    mutationFn: (data: {
      id: number;
      productionArea: UpdateProductionAreaDto;
    }) => updateProductionArea(data.id, data.productionArea),
    onSuccess: (data: ProductionArea) => {
      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      updateArea(data);
      queryClient.invalidateQueries({ queryKey: ['production-areas'] });
      queryClient.invalidateQueries({ queryKey: ['production-area', data.id] });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
    }
  });
};
