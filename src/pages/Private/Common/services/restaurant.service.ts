import { restauranteApi } from '@/api';
import { LoginResponseDto } from '@/models';

export class RestaurantService {
  static async switchRestaurant(restaurantId: string) {
    const resp = await restauranteApi.post<LoginResponseDto>(
      `/auth/switch-restaurant/${restaurantId}`
    );
    return resp.data;
  }
}
