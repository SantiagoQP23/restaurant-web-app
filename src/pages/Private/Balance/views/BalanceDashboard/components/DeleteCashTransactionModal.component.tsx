import NiceModal, { muiDialogV5 } from '@ebay/nice-modal-react';
import React from 'react';
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
import { CashTransaction } from '../../../models/cash-transaction.model';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useDeleteCashTransaction } from '../../../hooks/useCashTransactions';

interface Props {
  transaction: CashTransaction;
}

export const DeleteCashTransactionModal = NiceModal.create<Props>(
  ({ transaction }) => {
    const modal = NiceModal.useModal();
    const closeModal = () => modal.hide();

    const { mutate, isPending } = useDeleteCashTransaction(transaction);

    const submitDeleteTransaction = () => {
      mutate();
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
                {`¿Está seguro de eliminar la transacción ${transaction.description}?`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {transaction.performedBy.person.firstName}{' '}
                {transaction.performedBy.person.lastName}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {formatMoney(transaction.amount)}
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
            loading={isPending}
          >
            Eliminar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    );
  }
);
