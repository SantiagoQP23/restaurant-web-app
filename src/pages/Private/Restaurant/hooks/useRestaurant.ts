import { useEffect } from 'react';
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
  updateRestaurantLogo,
  createRestaurant
} from '../services/restaurant.service';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { LoginResponseDto } from '@/models';
import { RestaurantService } from '../../Common/services/restaurant.service';
import { useDispatch } from 'react-redux';
import { onLogin } from '@/redux';
import { LoginResponse } from '@/models/dto/auth.dto';

/**
 * Hook to switch between restaurants
 * @version 2.0 - Migrated to React Query v5
 */
export const switchRestaurantMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setRestaurant } = useRestaurantStore((state) => state);
  const dispatch = useDispatch();
  return useMutation<LoginResponseDto, unknown, string>({
    mutationFn: (restaurantId: string) =>
      RestaurantService.switchRestaurant(restaurantId),
    onSuccess: (data: LoginResponseDto) => {
      setRestaurant(data.currentRestaurant);
      dispatch(onLogin(data.user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', String(new Date().getTime()));
      setRestaurant(data.currentRestaurant);
      window.location.reload();
    },
    onError: () => {
      enqueueSnackbar('Error al cambiar de restaurante', {
        variant: 'error'
      });
    }
  });
};

/**
 * Hook to fetch current restaurant data
 * @version 2.0 - Migrated to React Query v5
 */
export const useRestaurant = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { setRestaurant } = useRestaurantStore();

  const restaurantQuery = useQuery<LoginResponse, unknown>({
    queryKey: ['restaurant'],
    queryFn: () => getRestaurant('1')
  });

  // Handle side effects - update Zustand store on successful fetch
  useEffect(() => {
    if (restaurantQuery.isSuccess && restaurantQuery.data?.currentRestaurant) {
      setRestaurant(restaurantQuery.data.currentRestaurant);
    }
  }, [restaurantQuery.data, restaurantQuery.isSuccess, setRestaurant]);

  useEffect(() => {
    if (restaurantQuery.isError) {
      enqueueSnackbar('Error al obtener el restaurante', {
        variant: 'error'
      });
    }
  }, [restaurantQuery.isError, enqueueSnackbar]);

  return restaurantQuery;
};

/**
 * Hook to update restaurant information
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateRestaurant = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { setRestaurant } = useRestaurantStore((state) => state);

  return useMutation<Restaurant, unknown, UpdateRestaurantDto>({
    mutationFn: (data: UpdateRestaurantDto) => updateRestaurant('1', data),
    onSuccess: (data: Restaurant) => {
      setRestaurant(data);
      enqueueSnackbar('Restaurante actualizado', { variant: 'success' });
    },
    onError: (error: unknown) => {
      console.log(error);
      enqueueSnackbar('Error al actualizar restaurante', {
        variant: 'error'
      });
    }
  });
};

/**
 * Hook to create a new restaurant
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateRestaurant = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setRestaurant } = useRestaurantStore((state) => state);
  const dispatch = useDispatch();
  const switchRestaurant = switchRestaurantMutation();

  return useMutation<LoginResponse, unknown, CreateRestaurantDto>({
    mutationFn: (data: CreateRestaurantDto) => createRestaurant(data),
    onSuccess: (data: LoginResponse) => {
      if (data.currentRestaurant)
        switchRestaurant.mutate(data.currentRestaurant.id);
    },
    onError: (error: unknown) => {
      console.log(error);
      enqueueSnackbar('Error al crear el restaurante', {
        variant: 'error'
      });
    }
  });
};

/**
 * Hook to update restaurant logo
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateRestaurantLogo = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<Restaurant, unknown, UpdateRestaurantLogoDto>({
    mutationFn: (data: UpdateRestaurantLogoDto) =>
      updateRestaurantLogo(data.id, data),
    onSuccess: () => {
      enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar la imagen', {
        variant: 'error'
      });
    }
  });
};
