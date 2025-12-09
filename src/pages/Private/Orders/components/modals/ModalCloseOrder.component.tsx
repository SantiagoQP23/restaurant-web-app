import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box
} from '@mui/material';
import { Order, TypeOrder } from '../../../../../models/orders.model';
import { SocketResponse } from '../../interfaces/responses-sockets.interface';
import { useSnackbar } from 'notistack';
import { UpdateOrderDto } from '../../dto/update-order.dto';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../../../../redux';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useUpdateOrder } from '../../hooks/useEmitWebSocketsEventsOrders';

interface Props {
  order: Order;
}

/**
 * Modal to close order
 * @version 1.1 13/12/2023 Add NiceModal
 * @version 1.2 15/03/2025 Use useUpdateOrder hook
 */
export const ModalCloseOrder = NiceModal.create<Props>(({ order }) => {
  const modal = useModal();

  const { mutate: updateOrder, isLoading, isOnline } = useUpdateOrder();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const closeModal = () => {
    modal.hide();
  };

  const submitPayOrder = () => {
    console.log('pagar orden');

    const data: UpdateOrderDto = {
      id: order!.id,
      isClosed: true
    };

    updateOrder(data, {
      onSuccess: (response: SocketResponse) => {
        if (response.ok) {
          dispatch(deleteOrder(order!.id));

          closeModal();
        } else {
          enqueueSnackbar(response.msg, { variant: 'error' });
        }
      }
    });
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
      <DialogTitle id='alert-dialog-title' textAlign='center' variant='h5'>
        Cerrar pedido
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant='h6' textAlign='center'>
            {`${
              order?.type === TypeOrder.IN_PLACE
                ? `Mesa ${order?.table?.name || ''}`
                : 'Para llevar'
            }`}
          </Typography>

          <Box>
            <Typography variant='h6' textAlign='center'>
              ¿Desea cerrar el pedido?
            </Typography>

            <Typography color='secondary' fontSize={12} textAlign='center'>
              Luego de cerrar el pedido ya no podrá editarlo
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button onClick={closeModal}>Cancelar</Button>
        <LoadingButton
          variant='contained'
          color='primary'
          onClick={submitPayOrder}
          loading={isLoading}
          disabled={!isOnline}
        >
          Aceptar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});
