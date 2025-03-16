import { AppThunk } from '../../store';
// import { fetchConToken } from "../helpers/fetch";
import { onChecking, onLogin, onLogout, clearErrorMessage } from '.';

import { restauranteApi } from '../../../api';
import { IFormLogin } from '../../../models';

export const startLogin =
  ({ username, password }: IFormLogin): AppThunk =>
  async (dispatch) => {
    dispatch(onChecking());

    try {
      const { data } = await restauranteApi.post('/auth/login', {
        username,
        password
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', String(new Date().getTime()));

      dispatch(onLogin(data.user));
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

  if (!token) return dispatch(onLogout(''));

  try {
    const { data } = await restauranteApi.get('auth/auth-renew');
    localStorage.setItem('token', data.token);
    localStorage.setItem('token-init-date', String(new Date().getTime()));

    dispatch(onLogin(data.user));
  } catch (error) {
    localStorage.clear();
    dispatch(onLogout(''));
  }
};
