import NiceModal, { muiDialogV5 } from '@ebay/nice-modal-react';
import React from 'react';
import { Transaction } from '../../../models/transaction.model';
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

interface Props {
  transaction: Transaction;
}

export const DeleteTransactionModal = NiceModal.create<Props>(
  ({ transaction }) => {
    const modal = NiceModal.useModal();
    const closeModal = () => modal.hide();

    //const { mutate, isPending, isOnline } = useDeleteTransaction();

    const submitDeleteTransaction = () => {
      //mutate(order!.id);
      closeModal();
    };

    return (
      <Dialog {...muiDialogV5(modal)}>
        <DialogTitle>
          <Typography variant='h4' my={1}>
            Eliminar transacción
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={1} direction='column' justifyContent='center'>
            <Box>
              <Typography variant='body1' color='text.primary'>
                {`¿Está seguro de eliminar la transacción ${transaction.title}?`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {transaction.title} {transaction.amount}
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
            onClick={submitDeleteTransaction}
            // loading={isPending}
            // disabled={!isOnline}
          >
            Eliminar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }
);
