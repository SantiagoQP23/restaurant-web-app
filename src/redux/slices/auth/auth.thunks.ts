import { AppThunk } from '../../store';
// import { fetchConToken } from "../helpers/fetch";
import { onChecking, onLogin, onLogout, clearErrorMessage } from '.';

import { restauranteApi } from '../../../api';
import { IFormLogin } from '../../../models';
import { LoginResponse } from '@/models/dto/auth.dto';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';

export const startLogin =
  ({ username, password }: IFormLogin): AppThunk =>
  async (dispatch) => {
    dispatch(onChecking());

    const { setRestaurant } = useRestaurantStore((state) => state);
    try {
      const { data } = await restauranteApi.post<LoginResponse>('/auth/login', {
        username,
        password
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', String(new Date().getTime()));
      setRestaurant(data.currentRestaurant);

      const currentRole = data.user.restaurantRoles.find(
        (resRole) => resRole.restaurant.id === data.currentRestaurant?.id
      )!.role;

      console.log({ currentRole });

      dispatch(
        onLogin({
          ...data.user,
          role: currentRole
        })
      );
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
    }
  };

export const startLogout =
  (msg: string = ''): AppThunk =>
  (dispatch) => {
    dispatch(onLogout(msg));
    //dispatch(onLogoutChat());
    localStorage.clear();
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 3000);
  };

export const checkAuthToken = (): AppThunk => async (dispatch, getState) => {
  const token = localStorage.getItem('token');
  // const { setRestaurant } = useRestaurantStore((state) => state);

  if (!token) return dispatch(onLogout(''));

  try {
    const { data } = await restauranteApi.get<LoginResponse>('auth/auth-renew');
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', String(new Date().getTime()));
    // setRestaurant(data.currentRestaurant);

    const currentRole = data.user.restaurantRoles.find(
      (resRole) => resRole.restaurant.id === data.currentRestaurant?.id
    )!.role;

    console.log({ currentRole });

    dispatch(
      onLogin({
        ...data.user,
        role: currentRole
      })
    );
  } catch (error) {
    localStorage.clear();
    dispatch(onLogout(''));
  }
};
