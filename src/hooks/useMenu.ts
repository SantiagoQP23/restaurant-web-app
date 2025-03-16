import { useQuery } from '@tanstack/react-query';
import { getAllMenu } from '../services';
import { Menu } from '../models';
import { useDispatch } from 'react-redux';
import { loadMenu } from '../redux';

export const useMenu = () => {
  const dispatch = useDispatch();

  return useQuery<Menu>(['menu'], getAllMenu, {
    onSuccess: (data) => {
      dispatch(loadMenu(data));
    }
  });
};
