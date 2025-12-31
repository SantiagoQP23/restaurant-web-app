import { IFormLogin, LoginResponseDto } from '@/models';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';
import { onChecking, onLogin, onLogout } from '@/redux';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterUserDto } from '../dto/register-user.dto';
import { login, registerUser, renewToken } from '../services/auth.service';

/**
 * Hook for user registration (signup)
 * @version 2.0 - Migrated to React Query v5
 */
export const useSignup = () => {
  const { setRestaurant } = useRestaurantStore((state) => state);
  const dispatch = useDispatch();
  return useMutation<
    LoginResponseDto,
    { data: { message: string } },
    RegisterUserDto
  >({
    mutationFn: (data: RegisterUserDto) => registerUser(data),
    onSuccess: (data: LoginResponseDto) => {
      setRestaurant(data.currentRestaurant);
      dispatch(onLogin(data.user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', String(new Date().getTime()));
    },
    onError: (error: { data: { message: string } }) => {
      console.log(error.data.message);
      enqueueSnackbar(error.data.message || 'Error al registrar el usuario', {
        variant: 'error'
      });
    }
  });
};

/**
 * Hook for user login
 * @version 2.0 - Migrated to React Query v5
 */
export const useLogin = () => {
  const { setRestaurant } = useRestaurantStore((state) => state);
  const dispatch = useDispatch();
  return useMutation<LoginResponseDto, unknown, IFormLogin>({
    mutationFn: (data: IFormLogin) => login(data),
    onSuccess: (data: LoginResponseDto) => {
      setRestaurant(data.currentRestaurant);

      const currentRole = data.user.restaurantRoles.find(
        (resRole) => resRole.restaurant.id === data.currentRestaurant?.id
      )!.role;

      dispatch(
        onLogin({
          ...data.user,
          role: currentRole
        })
      );
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', String(new Date().getTime()));
    },
    onError: () => {
      dispatch(onLogout('Credenciales incorrectas'));
    }
  });
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
        const currentRole = data.user.restaurantRoles.find(
          (resRole) => resRole.restaurant.id === data.currentRestaurant?.id
        )!.role;

        dispatch(
          onLogin({
            ...data.user,
            role: currentRole
          })
        );
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
