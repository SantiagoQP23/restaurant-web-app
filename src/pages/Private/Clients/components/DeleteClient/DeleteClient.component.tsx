import { FC, useState, useEffect } from 'react';

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
import { useDispatch } from 'react-redux';
import { deleteClient } from '../../../../../redux/slices/clients/clients.slice';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import {
  statusModalDeleteClient,
  deleteClient as deleteClientS
} from '../../services/clients.service';
import { IClient } from '../../../../../models/client.model';
import { useSnackbar } from 'notistack';

export const DeleteClient: FC = () => {
  const [client, setClient] = useState<IClient>();

  const subscription$ = statusModalDeleteClient.getSubject();

  const [open, setOpen] = useState<boolean>(false);

  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const closeModal = () => {
    setOpen(false);
  };

  const submitDeleteClient = async () => {
    await callEndpoint(deleteClientS(client!.id))
      .then(() => {
        enqueueSnackbar('Cliente eliminado', { variant: 'success' });
        dispatch(deleteClient(client!.id));
        closeModal();
      })
      .catch(() => {
        enqueueSnackbar('Error al eliminar cliente', { variant: 'error' });
      });
  };

  useEffect(() => {
    subscription$.subscribe((data) => {
      console.log(data);
      setClient(data.client);
      setOpen(!!data.value);
    });
  }, []);

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle id='alert-dialog-title' color='white'>
        Eliminar cliente
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`¿Esta seguro de eliminar al cliente ${client?.person.lastName}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <LoadingButton
          loading={loading}
          variant='contained'
          color='error'
          onClick={submitDeleteClient}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
