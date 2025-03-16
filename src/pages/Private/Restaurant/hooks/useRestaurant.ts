import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
// import { Restaurant } from "../models/restaurant.model";
import {
  getRestaurant,
  updateRestaurant
} from '../../Reports/services/rules.service';
import { UpdateRestaurantDto } from '../../Reports/dto/update-restaurant.dto';
import { useRestaurantStore } from '../../Common/store/restaurantStore';
import { Restaurant } from '../../Common/models/restaurant.model';
import {
  UpdateRestaurantLogoDto,
  updateRestaurantLogo
} from '../services/restaurant.service';

export const useRestaurant = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { setRestaurant } = useRestaurantStore();

  return useQuery<Restaurant, unknown>(
    ['restaurant'],
    () => getRestaurant('1'),
    {
      onSuccess: (data) => {
        setRestaurant(data);
      },
      onError: () => {
        enqueueSnackbar('Error al obtener el restaurante', {
          variant: 'error'
        });
      }
    }
  );
};

export const useUpdateRestaurant = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { setRestaurant } = useRestaurantStore((state) => state);

  return useMutation<Restaurant, unknown, UpdateRestaurantDto>(
    (data) => updateRestaurant('1', data),
    {
      onSuccess: (data) => {
        setRestaurant(data);
        enqueueSnackbar('Restaurante actualizado', { variant: 'success' });
      },
      onError: (error) => {
        console.log(error);
        enqueueSnackbar('Error al actualizar restaurante', {
          variant: 'error'
        });
      }
    }
  );
};

export const useUpdateRestaurantLogo = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Restaurant, unknown, UpdateRestaurantLogoDto>(
    (data) => updateRestaurantLogo(data.id, data),
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
