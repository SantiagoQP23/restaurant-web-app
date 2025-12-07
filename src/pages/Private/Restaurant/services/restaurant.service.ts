import { restauranteApi } from '../../../../api';
import { UpdateRestaurantDto } from '../../Reports/dto/update-restaurant.dto';
// import { Restaurant } from "../../Reports/models/restaurant.model";

import { Restaurant } from '../../Common/models/restaurant.model';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { LoginResponse } from '@/models/dto/auth.dto';

export const getRestaurant = async (): Promise<Restaurant> => {
  const resp = await restauranteApi.get<Restaurant>(`restaurant/`);

  return resp.data;
};

export const createRestaurant = async (restaurant: CreateRestaurantDto) => {
  const resp = await restauranteApi.post<LoginResponse>(
    `restaurant`,
    restaurant
  );

  return resp.data;
};

export const updateRestaurant = async (
  restaurantId: string,
  restaurant: UpdateRestaurantDto
): Promise<Restaurant> => {
  const resp = await restauranteApi.patch<Restaurant>(
    `restaurant/${restaurantId}`,
    restaurant
  );
  return resp.data;
};

export interface UpdateRestaurantLogoDto {
  id: string;
  file: File;
}

export const updateRestaurantLogo = async (
  id: string,
  data: UpdateRestaurantLogoDto
): Promise<Restaurant> => {
  const formData = new FormData();
  formData.append('file', data.file);

  const resp = await restauranteApi.patch<Restaurant>(
    `restaurant/logo/${id}`,
    formData
  );

  return resp.data;
};
