import { ITable } from '../../../../models/table.model';
import { deleteTable as deleteTableS } from '../services/tables.service';
import { useDispatch } from 'react-redux';
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
import { useFetchAndLoad } from '../../../../hooks/useFetchAndLoad';
import { useSnackbar } from 'notistack';
import { updateTable } from '../../../../redux';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';

export interface ModalDeleteTableProps {
  table: ITable;
}

export const ModalDeleteTable = NiceModal.create<ModalDeleteTableProps>(
  ({ table }) => {
    const modal = useModal();

    const { loading, callEndpoint } = useFetchAndLoad();

    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const closeModal = () => {
      modal.hide();
    };

    const submitDeleteTable = async () => {
      await callEndpoint(deleteTableS(table!.id))
        .then(() => {
          enqueueSnackbar('Mesa eliminada', { variant: 'success' });
          dispatch(
            updateTable({
              ...table!,
              isActive: false
            })
          );
          closeModal();
        })
        .catch(() => {
          enqueueSnackbar('Error al eliminar mesa', { variant: 'error' });
        });
    };

    return (
      <Dialog {...muiDialogV5(modal)}>
        <DialogTitle id='alert-dialog-title'>Eliminar mesa</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`¿Esta seguro de eliminar la mesa ${table?.name}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button onClick={closeModal} color='inherit'>
            Cancelar
          </Button>
          <LoadingButton
            loading={loading}
            variant='contained'
            color='error'
            onClick={submitDeleteTable}
          >
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }
);
