import React from 'react';
import { Bill } from '../../../../models/bill.model';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Box,
  DialogActions,
  Button,
  Stack
} from '@mui/material';
import { format } from 'date-fns';
import { useDeleteBill } from '../hooks/useBills';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from '../../../../redux';

interface Props {
  bill: Bill;
}

export const DeleteBillModal = NiceModal.create<Props>(({ bill }) => {
  const { mutate: deleteBill, isLoading, isOnline } = useDeleteBill();
  const dispatch = useDispatch();

  const modal = useModal();
  const closeModal = () => modal.hide();
  const submitDeleteBill = () => {
    deleteBill({
      id: bill.id
    });
    dispatch(setActiveOrder(null));
    closeModal();
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
      <DialogTitle>
        <Typography variant='h4' my={1}>
          ¿Está seguro de eliminar la cuenta?
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack direction='column' spacing={1}>
          <Box>
            <Typography variant='subtitle1' color='textSecondary'>
              Creado por
            </Typography>

            <Typography variant='h6'>
              {bill.createdBy.person.firstName} {bill.createdBy.person.lastName}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle1' color='textSecondary'>
              Mesero
            </Typography>

            <Typography variant='h6'>
              {bill.owner.person.firstName} {bill.owner.person.lastName}
            </Typography>
          </Box>

          <Box>
            <Typography variant='subtitle1' color='textSecondary'>
              Fecha de creación
            </Typography>
            <Typography variant='h6'>
              {format(new Date(bill.createdAt), 'dd/MM/yyyy HH:mm')}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button onClick={closeModal} color='inherit'>
          Cancelar
        </Button>
        <LoadingButton
          variant='contained'
          color='error'
          onClick={submitDeleteBill}
          loading={isLoading}
          disabled={!isOnline}
        >
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});
