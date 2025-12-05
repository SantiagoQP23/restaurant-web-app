import { Restaurant } from '@/pages/Private/Common/models/restaurant.model';
import { IPerson } from './common.model';

export interface IFormLogin {
  username: string;
  password: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
}

export enum Roles {
  admin = 'Administrador',
  mesero = 'Mesero',
  despachador = 'Despachador'
}

export interface RestaurantRole {
  id: number;
  restaurant: Restaurant;
  role: IRole;
}

export interface IUser {
  id: string;
  username: string;
  person: IPerson;
  online: boolean;
  restaurantRoles: RestaurantRole[];
  isActive: boolean;
  role: IRole;
}

export interface LoginResponseDto {
  token: string;
  user: IUser;
  currentRestaurant: Restaurant | null;
}
