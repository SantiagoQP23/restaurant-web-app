import { useMutation, useQuery } from '@tanstack/react-query';
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

export const useProductionArea = (productionAreaId: number) => {
  return useQuery(['production-areas'], () =>
    getProductionArea(productionAreaId)
  );
};

export const useProductionAreas = () => {
  const { loadProductionAreas, setProductionAreaActive } =
    useProductionAreasStore();
  return useQuery(['production-areas'], () => getProductionAreas(), {
    onSuccess: (data) => {
      loadProductionAreas(data);
      setProductionAreaActive(data[0]);
    }
  });
};

export const useCreateProductionArea = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { addProductionArea } = useProductionAreasStore();

  return useMutation<ProductionArea, unknown, CreateProductionAreaDto>(
    (data) => createProductionArea(data),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Se creó correctamente', { variant: 'success' });
        addProductionArea(data);
      },
      onError: () => {
        enqueueSnackbar('No se pudo crear', { variant: 'error' });
      }
    }
  );
};

export const useUpdateProductionArea = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateProductionArea: updateArea } = useProductionAreasStore();
  return useMutation<
    ProductionArea,
    unknown,
    { id: number; productionArea: UpdateProductionAreaDto }
  >((data) => updateProductionArea(data.id, data.productionArea), {
    onSuccess: (data) => {
      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
      updateArea(data);
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar', { variant: 'error' });
    }
  });
};
