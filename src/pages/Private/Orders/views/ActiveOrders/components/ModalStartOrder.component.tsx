import { Order, OrderStatus } from '../../../../../../models';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { Button } from '@mui/material/';
import { useUpdateOrder } from '../../../hooks';
import { LoadingButton } from '@mui/lab';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';

interface Props {
  onStartOrder: () => void;
}
/**
 * Component that shows a modal to start an order if there are pending orders
 * @version 1.1 28/12/2023 Updates useUpdateOrder hook.
 */
export const ModalStartOrder = NiceModal.create<Props>(({ onStartOrder }) => {
  const modal = useModal();

  const { mutate: updateOrder, isLoading } = useUpdateOrder();

  const handleStartOrder = () => {
    // const data: UpdateOrderDto = {
    //   id: order!.id
    // };
    //
    // updateOrder(data);
    //
    //
    onStartOrder();
    modal.hide();
  };

  return (
    <Dialog {...muiDialogV5(modal)} maxWidth='xs'>
      <DialogTitle variant='h6'>¿Desea iniciar el pedido?</DialogTitle>

      <DialogContent>
        <Typography variant='body1' color='textSecondary'>
          Hay pedidos pendientes que deben ser entregados antes que este pedido.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button color='inherit' onClick={() => modal.hide()}>
          Cancelar
        </Button>

        <LoadingButton
          variant='contained'
          color='primary'
          onClick={handleStartOrder}
          loading={isLoading}
        >
          Iniciar pedido
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});
