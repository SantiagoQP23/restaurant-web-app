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
  deleteUser as deleteUserS
} from '../../services/users.service';
import { useSnackbar } from 'notistack';

export const DeleteUser: FC = () => {
  const { loading, callEndpoint } = useFetchAndLoad();

  const [user, setUser] = useState<IUser>();

  const [open, setOpen] = useState<boolean>(false);
  const subscription$ = statusModalDeleteUser.getSubject();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const submitDeleteUser = async () => {
    await callEndpoint(deleteUserS(user!.id))
      .then(() => {
        enqueueSnackbar('Usuario eliminado', { variant: 'success' });

        dispatch(deleteUser(user!.id));

        closeModal();
      })
      .catch(() => {
        enqueueSnackbar('Error al eliminar usuario', { variant: 'error' });
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
        Eliminar usuario
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`¿Esta seguro de eliminar el usuario ${user?.person.firstName}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <LoadingButton
          loading={loading}
          variant='contained'
          color='error'
          onClick={submitDeleteUser}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
