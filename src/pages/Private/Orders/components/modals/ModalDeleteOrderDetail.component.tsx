import { useState, useEffect } from 'react';

import { IOrderDetail } from '../../../../../models';

import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box
} from '@mui/material';

import { DeleteOrderDetailDto } from '../../dto/delete-order-detail.dto';
import { statusModalDeleteOrderDetail } from '../../services/orders.service';
import { useDeleteOrderDetail } from '../../hooks/';
import { LoadingButton } from '@mui/lab';

/**
 * Component that shows a modal to delete an order detail
 * @version 1.1 28/12/2023 Adds useDeleteOrderDetail hook
 */
export const ModalDeleteOrderDetail = () => {
  const [detail, setDetail] = useState<IOrderDetail>();

  const [orderId, setOrderId] = useState<string>();

  const [open, setOpen] = useState(false);

  const subscription$ = statusModalDeleteOrderDetail.getSubject();

  const closeModal = () => {
    setOpen(false);
  };

  const {
    mutate: deleteOrderDetail,
    isLoading,
    isOnline
  } = useDeleteOrderDetail();

  const deleteDetail = () => {
    const data: DeleteOrderDetailDto = {
      detailId: detail!.id,
      orderId: orderId!
    };

    deleteOrderDetail(data);
    closeModal();
  };

  useEffect(() => {
    const subscription = subscription$.subscribe((data) => {
      setDetail(data.detalle);
      setOrderId(data.orderId);
      setOpen(data.value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>
        <Typography variant='h4' my={1}>
          ¿Está seguro de eliminar el producto del pedido?
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} direction='row' justifyContent='center'>
          <Box>
            <Typography variant='caption'>Cantidad</Typography>
            <Typography variant='h5'>{detail?.quantity}</Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Producto</Typography>
            <Typography variant='h5'>{detail?.product.name}</Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button color='inherit' onClick={closeModal}>
          Cancelar
        </Button>

        <LoadingButton
          variant='contained'
          color='error'
          onClick={deleteDetail}
          loading={isLoading}
          disabled={!isOnline}
        >
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
