import { IFormLogin, LoginResponseDto } from '@/models';
import { restauranteApi } from '../../../../api';
import { RegisterUserDto } from '../dto/register-user.dto';

export const registerUser = async ({
  samePassword,
  ...data
}: RegisterUserDto) => {
  if (data.numPhone === '') {
    delete data.numPhone;
  }
  const response = await restauranteApi.post<LoginResponseDto>(
    '/auth/register',
    data
  );

  return response.data;
};

export const login = async (loginData: IFormLogin) => {
  const response = await restauranteApi.post<LoginResponseDto>(
    '/auth/login',
    loginData
  );

  return response.data;
};

export const renewToken = async () => {
  const response =
    await restauranteApi.get<LoginResponseDto>('/auth/auth-renew');

  return response.data;
};
