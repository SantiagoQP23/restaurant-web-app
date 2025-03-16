import {
  DialogTitle,
  Dialog,
  DialogContent,
  Typography,
  IconButton
} from '@mui/material';
import { FormAddCashRegister } from '../../CashRegister/components/FormAddCashRegister.component';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { Close } from '@mui/icons-material';

export const AddCashRegisterModal = NiceModal.create(() => {
  const modal = useModal();
  const closeModal = () => modal.hide();

  const onSuccess = () => {
    closeModal();
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
      <DialogTitle
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h5'>Agregar caja</Typography>
        <IconButton onClick={closeModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormAddCashRegister onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
});
