import { Restaurant } from '@/pages/Private/Common/models/restaurant.model';
import { IUser } from '../auth.model';

export interface LoginResponse {
  token: string;
  user: IUser;
  currentRestaurant: Restaurant | null;
}
