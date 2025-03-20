import { useEffect, useState } from 'react';
import { statusModalStartOrder } from '../../../services/orders.service';
import { Order, OrderStatus } from '../../../../../../models';
import { useModal } from '../../../../../../hooks';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { Button } from '@mui/material/';
import { useUpdateOrder } from '../../../hooks';
import { UpdateOrderDto } from '../../../dto';
import { LoadingButton } from '@mui/lab';

/**
 * Component that shows a modal to start an order if there are pending orders
 * @version 1.1 28/12/2023 Updates useUpdateOrder hook.
 */
export const ModalStartOrder = () => {
  const [order, setOrder] = useState<Order | null>(null);

  const { isOpen, handleClose, setOpen } = useModal();

  const suspcription$ = statusModalStartOrder.getSubject();

  const { mutate: updateOrder, isLoading } = useUpdateOrder();

  const handleStartOrder = () => {
    const data: UpdateOrderDto = {
      id: order!.id,
      status: OrderStatus.IN_PROGRESS
    };

    updateOrder(data);

    handleClose();
  };

  useEffect(() => {
    const subscription = suspcription$.subscribe((data) => {
      console.log(data);
      setOrder(data.order);
      setOpen(data.value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle variant='h4' textAlign='center' color='warning.main'>
        Advertencia
      </DialogTitle>

      <DialogContent>
        <Typography color='warning.main' variant='h5' textAlign='center'>
          Hay pedidos pendientes que deben ser entregados antes que este pedido.
        </Typography>

        <Typography variant='h6' textAlign='center' mt={2}>
          ¿Desea iniciar el pedido?
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button color='inherit' onClick={handleClose}>
          Cancelar
        </Button>

        <LoadingButton
          variant='contained'
          color='secondary'
          onClick={handleStartOrder}
          loading={isLoading}
        >
          Iniciar pedido
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
