import { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Box
} from '@mui/material';
import { Order, TypeOrder } from '../../../../../models/orders.model';
import { statusModalDeleteOrder } from '../../services/orders.service';
import { useNavigate } from 'react-router-dom';
import { useDeleteOrder } from '../../hooks';

/**
 * Component that shows a modal to delete an order
 * @version 1.1 28/12/2023 Adds useDeleteOrder hook
 */
export const ModalDeleteOrder: FC = () => {
  const [order, setOrder] = useState<Order>();

  const [open, setOpen] = useState<boolean>(false);

  const subscription$ = statusModalDeleteOrder.getSubject();

  const navigate = useNavigate();

  const { mutate, isLoading, isOnline } = useDeleteOrder();

  const closeModal = () => {
    setOpen(false);
  };

  const submitDeleteOrder = () => {
    mutate(order!.id, {
      onSuccess: () => {
        navigate('/orders');
      }
    });

    closeModal();
  };

  useEffect(() => {
    subscription$.subscribe((data) => {
      setOrder(data.order);
      setOpen(!!data.value);
    });
  }, []);

  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>
        <Typography variant='h4' my={1}>
          ¿Está seguro de eliminar la orden?
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={1} direction='column' justifyContent='center'>
          <Box>
            <Typography variant='body1' color='text.primary'>
              {' '}
              {order?.type === TypeOrder.IN_PLACE
                ? `Mesa ${order?.table?.name}`
                : 'Para llevar'}
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
          onClick={submitDeleteOrder}
          loading={isLoading}
          disabled={!isOnline}
        >
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
