import { useMutation } from '@tanstack/react-query';
import { LoginResponseDto } from '../dto/login-response.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { registerUser } from '../services/auth.service';

export const useSignup = () => {
  return useMutation<LoginResponseDto, unknown, RegisterUserDto>(
    (data) => registerUser(data),
    {
      onSuccess: (data) => {},
      onError: () => {}
    }
  );
};
