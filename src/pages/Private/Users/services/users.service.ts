import { loadAbort } from '../../../../helpers/load-abort-axios.helper';
import { IUser } from '../../../../models/auth.model';
import restauranteApi from '../../../../api/restauranteApi';
import { UpdateUserDto, ResetPasswordUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { SubjectDeleteUser } from '../helpers/subjects-users.helper';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { FilterUsersDto } from '../dto/filterUsers.dto';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';

export const statusModalDeleteUser = new SubjectDeleteUser();

export const getUser = async (term: string): Promise<IUser> => {
  const resp = await restauranteApi.get<IUser>(`users/${term}`);

  return resp.data;
};

export const getUsersSuggestions = async (
  search: string
): Promise<{ users: IUser[] }> => {
  const resp = await restauranteApi.get<{ users: IUser[] }>(
    `users/suggestions`,
    {
      params: {
        search
      }
    }
  );

  return resp.data;
};

export const getUsers = async (
  pagination: FilterUsersDto
): Promise<{ users: IUser[]; count: number }> => {
  const { offset = 0, limit = 5, search } = pagination;

  const resp = await restauranteApi.get<{ users: IUser[]; count: number }>(
    `users/`,
    {
      params: {
        offset: offset * limit,
        limit,
        search
      }
    }
  );

  return resp.data;
};

export const updateUserRole = async (
  data: UpdateUserRoleDto
): Promise<IUser> => {
  const resp = await restauranteApi.patch<IUser>(`users/user-role`, data);

  return resp.data;
};

export const updateUser = async (
  id: string,
  data: UpdateUserDto
): Promise<IUser> => {
  const { id: userId, ...rest } = data;

  const resp = await restauranteApi.patch<IUser>(`users/${id}`, rest);

  return resp.data;
};

export const resetPasswordUser = async (
  data: ResetPasswordUserDto
): Promise<IUser> => {
  const resp = await restauranteApi.patch<IUser>(
    `auth/reset-password-user`,
    data
  );

  return resp.data;
};

export const createUser = async (data: CreateUserDto): Promise<IUser> => {
  const resp = await restauranteApi.post<IUser>(`users/`, data);

  return resp.data;
};

export const changePassword = async (
  data: ChangePasswordDto
): Promise<void> => {
  await restauranteApi.patch(`auth/change-password`, data);
};

export const deleteUser = (id: string) => {
  const controller = loadAbort();
  return {
    call: restauranteApi.delete<IUser>(`users/${id}`, {
      signal: controller.signal
    }),
    controller
  };
};

export const removeUserFromRestaurant = async (
  userId: string
): Promise<void> => {
  await restauranteApi.delete(`users/${userId}/restaurant`);
};
