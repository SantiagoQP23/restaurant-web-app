import { useState, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { FC } from 'react';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import {
  deleteUser,
  selectUsers
} from '../../../../../redux/slices/users/users.slice';
import { useSelector, useDispatch } from 'react-redux';
import { IUser } from '../../../../../models/auth.model';
import {
  statusModalDeleteUser,
  removeUserFromRestaurant as removeUserFromRestaurantS
} from '../../services/users.service';
import { useSnackbar } from 'notistack';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/api/query-keys';

export const RemoveUserFromRestaurant: FC = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [user, setUser] = useState<IUser>();

  const [open, setOpen] = useState<boolean>(false);
  const subscription$ = statusModalDeleteUser.getSubject();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const restaurant = useRestaurantStore((state) => state.restaurant);

  const queryClient = useQueryClient();

  const submitRemoveUser = async () => {
    if (!restaurant) {
      enqueueSnackbar('No se encontró el restaurante', { variant: 'error' });
      return;
    }

    await callEndpoint(removeUserFromRestaurantS(user!.id))
      .then(() => {
        enqueueSnackbar('Usuario removido del restaurante', {
          variant: 'success'
        });

        dispatch(deleteUser(user!.id));

        // Invalidate and refetch users list
        queryClient.invalidateQueries({ queryKey: queryKeys.users.all });

        closeModal();
      })
      .catch(() => {
        enqueueSnackbar('Error al remover usuario del restaurante', {
          variant: 'error'
        });
      });
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    subscription$.subscribe((data) => {
      setUser(data.user);
      setOpen(!!data.value);
    });
  }, []);

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle id='alert-dialog-title' color='white'>
        Remover usuario del restaurante
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`¿Está seguro de remover al usuario ${user?.person.firstName} ${user?.person.lastName} del restaurante?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <LoadingButton
          loading={loading}
          variant='contained'
          color='error'
          onClick={submitRemoveUser}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
