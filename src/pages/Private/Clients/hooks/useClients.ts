import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient, getClient, getClients, updateClient } from '../services';
import { IClient } from '../../../../models';
import { useSnackbar } from 'notistack';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { useEffect } from 'react';

import { usePaginationAsync } from '../../../../hooks/usePaginationAsync';
import { useSearch } from '../../../../hooks/useSearch';

/**
 * Hook to fetch clients with pagination and search
 * @version 2.0 - Migrated to React Query v5
 */
export const useClients = () => {
  const pagination = usePaginationAsync();

  const { search, handleChangeSearch } = useSearch();

  const clientsQuery = useQuery<{ clients: IClient[]; length: number }>({
    queryKey: [
      'clients',
      { limit: pagination.rowsPerPage, offset: pagination.page, search }
    ],
    queryFn: () =>
      getClients({
        limit: pagination.rowsPerPage,
        offset: pagination.page,
        search
      })
  });

  useEffect(() => {
    clientsQuery.refetch();
  }, [search, pagination.page, pagination.rowsPerPage]);

  return {
    clientsQuery,
    handleChangeSearch,
    search,

    ...pagination
  };
};

/**
 * Hook to fetch a single client by ID
 * @version 2.0 - Migrated to React Query v5
 */
export const useClient = (id: string, enabled = true) => {
  return useQuery<IClient>({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
    enabled,
    retry: false
  });
};

/**
 * Hook to create a new client
 * @version 2.0 - Migrated to React Query v5
 */
export const useCreateCliente = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<IClient, unknown, CreateClientDto>({
    mutationFn: (data: CreateClientDto) => createClient(data),
    onSuccess: () => {
      enqueueSnackbar('Cliente creado', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },

    onError: () => {
      enqueueSnackbar('Error al crear cliente', { variant: 'error' });
    }
  });
};

/**
 * Hook to update a client
 * @version 2.0 - Migrated to React Query v5
 */
export const useUpdateClient = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<IClient, unknown, UpdateClientDto>({
    mutationFn: (data: UpdateClientDto) => updateClient(data.id, data),
    onSuccess: (data: IClient) => {
      enqueueSnackbar('Cliente actualizado', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client', data.id] });
    },
    onError: () => {
      enqueueSnackbar('Error al actualizar cliente', { variant: 'error' });
    }
  });
};
