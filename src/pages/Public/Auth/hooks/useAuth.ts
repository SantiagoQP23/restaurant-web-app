import { IFormLogin, LoginResponseDto } from '@/models';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';
import { onChecking, onLogin, onLogout } from '@/redux';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterUserDto } from '../dto/register-user.dto';
import { login, registerUser, renewToken } from '../services/auth.service';

export const useSignup = () => {
  const { setRestaurant } = useRestaurantStore((state) => state);
  const dispatch = useDispatch();
  return useMutation<LoginResponseDto, unknown, RegisterUserDto>(
    (data) => registerUser(data),
    {
      onSuccess: (data) => {
        setRestaurant(data.currentRestaurant);
        dispatch(onLogin(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', String(new Date().getTime()));
      },
      onError: () => {}
    }
  );
};

export const useLogin = () => {
  const { setRestaurant } = useRestaurantStore((state) => state);
  const dispatch = useDispatch();
  return useMutation<LoginResponseDto, unknown, IFormLogin>(
    (data) => login(data),
    {
      onSuccess: (data) => {
        setRestaurant(data.currentRestaurant);
        dispatch(onLogin(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', String(new Date().getTime()));
      },
      onError: () => {
        dispatch(onLogout('Credenciales incorrectas'));
      }
    }
  );
};

export const useRenewToken = () => {
  const dispatch = useDispatch();
  const { setRestaurant } = useRestaurantStore((state) => state);

  useEffect(() => {
    const renew = async () => {
      try {
        dispatch(onChecking());
        const data = await renewToken(); // assuming this is an async call

        setRestaurant(data.currentRestaurant);
        dispatch(onLogin(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', String(new Date().getTime()));
      } catch (error) {
        console.log('Error al renovar el token');
        dispatch(onLogout(''));
      }
    };

    renew();
  }, []);
};
