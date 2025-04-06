import { restauranteApi } from '../../../../api';
import { LoginResponseDto } from '../dto/login-response.dto';
import { RegisterUserDto } from '../dto/register-user.dto';

export const registerUser = async ({
  samePassword,
  ...data
}: RegisterUserDto) => {
  const response = await restauranteApi.post<LoginResponseDto>(
    '/auth/signup',
    data
  );

  return response.data;
};
