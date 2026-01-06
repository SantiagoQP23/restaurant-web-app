import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
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
import { IUser } from '../../../../../models/auth.model';
import { useRemoveUserFromRestaurant } from '../../hooks/useUsers';

interface Props {
  user: IUser;
}

export const RemoveUserFromRestaurant = NiceModal.create<Props>(({ user }) => {
  const modal = useModal();
  const removeUserMutation = useRemoveUserFromRestaurant();

  const closeModal = () => {
    modal.hide();
  };

  const handleRemoveUser = async () => {
    removeUserMutation.mutate(user.id, {
      onSuccess: () => {
        closeModal();
      }
    });
  };

  return (
    <Dialog {...muiDialogV5(modal)} maxWidth='sm'>
      <DialogTitle id='alert-dialog-title' color='white'>
        Remover usuario del restaurante
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`¿Está seguro de remover al usuario ${user.person.firstName} ${user.person.lastName} del restaurante?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <LoadingButton
          loading={removeUserMutation.isPending}
          variant='contained'
          color='error'
          onClick={handleRemoveUser}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});
