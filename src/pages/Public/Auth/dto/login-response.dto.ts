import { IUser } from '@/models';

export interface LoginResponseDto {
  token: string;
  user: IUser;
}
