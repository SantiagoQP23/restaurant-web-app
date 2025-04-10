import { useQuery } from '@tanstack/react-query';
import { getAllMenu } from '../services';
import { Menu } from '../models';
import { useDispatch } from 'react-redux';
import { loadMenu } from '../redux';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';

export const useMenu = () => {
  const dispatch = useDispatch();
  const { restaurant } = useRestaurantStore();

  return useQuery<Menu>(['menu'], () => getAllMenu(restaurant!.id), {
    onSuccess: (data) => {
      dispatch(loadMenu(data));
    }
  });
};
