import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import {
  changePassword,
  createUser,
  getUser,
  getUsers,
  resetPasswordUser,
  updateUser
} from '../services/users.service';

import { IUser } from '../../../../models';

import { CreateUserDto, ResetPasswordUserDto, UpdateUserDto } from '../dto';
import { useDispatch } from 'react-redux';
import { loadUsers } from '../../../../redux';
import { usePaginationAsync } from '../../../../hooks/usePaginationAsync';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { useSnackbar } from 'notistack';
import { useSearch } from '../../../../hooks/useSearch';

export const useUsers = () => {
  const dispatch = useDispatch();

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginationAsync();

  const { search, setSearch, handleChangeSearch } = useSearch();

  const usersQuery = useQuery<{ users: IUser[]; count: number }>(
    ['users'],
    () =>
      getUsers({
        offset: page,
        limit: rowsPerPage,
        search
      }),
    {
      onSuccess: (data) => {
        dispatch(loadUsers(data.users));
      }
    }
  );

  return {
    usersQuery,
    page,
    search,

    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeSearch
  };
};

export const useUser = (term: string, enabled = true) => {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery(['user', term], () => getUser(term), {
    enabled,
    retry: false
  });
};

export const useCreateUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IUser, unknown, CreateUserDto>(createUser, {
    onSuccess: (data) => {
      enqueueSnackbar('Usuario creado correctamente', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('No se pudo crear el usuario', { variant: 'error' });
    }
  });
};

export const useUpdateUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IUser, unknown, UpdateUserDto>(
    (data) => updateUser(data.id, data),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Usuario actualizado correctamente', {
          variant: 'success'
        });
      },
      onError: (error) => {
        enqueueSnackbar('No se pudo actualizar el usuario', {
          variant: 'error'
        });
      }
    }
  );
};

export const useChangePasswordUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<void, unknown, ChangePasswordDto>(
    (data) => changePassword(data),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Contraseña actualizada correctamente', {
          variant: 'success'
        });
      },
      onError: (error) => {
        enqueueSnackbar('No se pudo actualizar la contraseña', {
          variant: 'error'
        });
      }
    }
  );
};

export const useResetPasswordUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IUser, unknown, ResetPasswordUserDto>(
    (data) => resetPasswordUser(data),
    {
      onSuccess: (data) => {
        enqueueSnackbar(
          'La contraseña fue cambiada al número de identificación',
          { variant: 'success' }
        );
      },
      onError: (error) => {
        enqueueSnackbar('No se pudo reiniciar la contraseña', {
          variant: 'error'
        });
      }
    }
  );
};

export const useDeleteUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  return {};
};
