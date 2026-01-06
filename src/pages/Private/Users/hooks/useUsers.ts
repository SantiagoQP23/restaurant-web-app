import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  changePassword,
  createUser,
  getUser,
  getUsers,
  getUsersSuggestions,
  resetPasswordUser,
  updateUser,
  updateUserRole,
  removeUserFromRestaurant
} from '../services/users.service';

import { IUser } from '../../../../models';

import { CreateUserDto, ResetPasswordUserDto, UpdateUserDto } from '../dto';
import { useDispatch } from 'react-redux';
import { loadUsers } from '../../../../redux';
import { usePaginationAsync } from '../../../../hooks/usePaginationAsync';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { useSnackbar } from 'notistack';
import { useSearch } from '../../../../hooks/useSearch';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { queryKeys } from '@/api/query-keys';

/**
 * Hook to fetch and manage users list with pagination and search
 * @version 2.0 - Migrated to React Query v5
 */
export const useUsers = () => {
  const dispatch = useDispatch();

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginationAsync();

  const { search, setSearch, debouncedSearch, handleChangeSearch } =
    useSearch();

  const usersQuery = useQuery<{ users: IUser[]; count: number }>({
    queryKey: queryKeys.users.list({
      offset: page,
      limit: rowsPerPage,
      search
    }),
    queryFn: () =>
      getUsers({
        offset: page,
        limit: rowsPerPage,
        search
      })
  });

  // Handle Redux integration - dispatch on successful data fetch
  useEffect(() => {
    if (usersQuery.isSuccess && usersQuery.data) {
      dispatch(loadUsers(usersQuery.data.users));
    }
  }, [usersQuery.data, usersQuery.isSuccess, dispatch]);

  return {
    usersQuery,
    page,
    search,
    debouncedSearch,

    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeSearch
  };
};

/**
 * Hook to fetch user suggestions for autocomplete
 * @version 2.0 - Migrated to React Query v5
 */
export const useUsersSuggestions = () => {
  const { search, debouncedSearch, handleChangeSearch } = useSearch(1000);

  const usersQuery = useQuery<{ users: IUser[] }>({
    queryKey: queryKeys.users.suggestions(debouncedSearch),
    queryFn: () =>
      debouncedSearch ? getUsersSuggestions(debouncedSearch) : { users: [] }
  });

  return {
    usersQuery,
    search,
    debouncedSearch,
    handleChangeSearch
  };
};

/**
 * Hook to fetch a single user by ID
 * @version 2.0 - Migrated to React Query v5
 */
export const useUser = (term: string, enabled = true) => {
  const { enqueueSnackbar } = useSnackbar();

  return useQuery({
    queryKey: queryKeys.users.detail(term),
    queryFn: () => getUser(term),
    enabled,
    retry: false
  });
};

/**
 * Hook to create a new user
 * Returns mutation object - use mutation.mutate(data, { onSuccess, onError }) in components
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IUser, unknown, CreateUserDto>({
    mutationFn: (data: CreateUserDto) => createUser(data),
    onSuccess: (data: IUser) => {
      enqueueSnackbar('Usuario creado correctamente', { variant: 'success' });
    },
    onError: (error: unknown) => {
      enqueueSnackbar('No se pudo crear el usuario', { variant: 'error' });
    }
  });
};

/**
 * Hook to update user information and roles
 * Returns object with two mutations: updateUserMutation and updateUserRole
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation<IUser, unknown, UpdateUserDto>({
    mutationFn: (data: UpdateUserDto) => updateUser(data.id, data),
    onSuccess: (data: IUser) => {
      enqueueSnackbar('Usuario actualizado correctamente', {
        variant: 'success'
      });
    },
    onError: (error: unknown) => {
      enqueueSnackbar('No se pudo actualizar el usuario', {
        variant: 'error'
      });
    }
  });

  const updateUserRoleMutation = useMutation<IUser, unknown, UpdateUserRoleDto>(
    {
      mutationFn: (data: UpdateUserRoleDto) => updateUserRole(data),
      onSuccess: (data: IUser) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.users.detail(data.id)
        });
        queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        enqueueSnackbar('Usuario actualizado correctamente', {
          variant: 'success'
        });
      },
      onError: (error: unknown) => {
        enqueueSnackbar('No se pudo actualizar el usuario', {
          variant: 'error'
        });
      }
    }
  );

  return {
    updateUserMutation,
    updateUserRole: updateUserRoleMutation
  };
};

/**
 * Hook to change user password
 * @version 2.0 - Migrated to React Query v5
 */
export const useChangePasswordUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<void, unknown, ChangePasswordDto>({
    mutationFn: (data: ChangePasswordDto) => changePassword(data),
    onSuccess: (data: void) => {
      enqueueSnackbar('Contraseña actualizada correctamente', {
        variant: 'success'
      });
    },
    onError: (error: unknown) => {
      enqueueSnackbar('No se pudo actualizar la contraseña', {
        variant: 'error'
      });
    }
  });
};

/**
 * Hook to reset user password to default
 * @version 2.0 - Migrated to React Query v5
 */
export const useResetPasswordUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<IUser, unknown, ResetPasswordUserDto>({
    mutationFn: (data: ResetPasswordUserDto) => resetPasswordUser(data),
    onSuccess: (data: IUser) => {
      enqueueSnackbar(
        'La contraseña fue cambiada al número de identificación',
        { variant: 'success' }
      );
    },
    onError: (error: unknown) => {
      enqueueSnackbar('No se pudo reiniciar la contraseña', {
        variant: 'error'
      });
    }
  });
};

export const useDeleteUser = () => {
  const { enqueueSnackbar } = useSnackbar();

  return {};
};

/**
 * Hook to remove user from restaurant
 * @version 2.0 - React Query
 */
export const useRemoveUserFromRestaurant = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: (userId: string) => removeUserFromRestaurant(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      enqueueSnackbar('Usuario removido del restaurante', {
        variant: 'success'
      });
    },
    onError: (error: unknown) => {
      enqueueSnackbar('Error al remover usuario del restaurante', {
        variant: 'error'
      });
    }
  });
};
