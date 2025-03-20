import { FC, useEffect, useState, useContext } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';

import {
  AddCircleOutline,
  CheckOutlined,
  RemoveCircleOutline
} from '@mui/icons-material';

import { IOrderDetail } from '../../../../../../models';
import { useCounter } from '../../../hooks';
import { statusModalDispatchDetail } from '../../../services/orders.service';
import { SocketContext } from '../../../../../../context/SocketContext';
import { useSnackbar } from 'notistack';
import { EventsEmitSocket } from '../../../interfaces/events-sockets.interface';

import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { UpdateOrderDetailDto } from '../../../dto/update-order-detail.dto';

interface Props {}

export const DespachoDetalle: FC<Props> = () => {
  const subscription$ = statusModalDispatchDetail.getSubject();

  const [detail, setDetail] = useState<IOrderDetail>();

  const {
    state: counter,
    increment,
    decrement,
    setCounter
  } = useCounter(0, 1, detail?.quantity);

  const [open, setOpen] = useState(false);

  const [orderId, setorderId] = useState('');

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const updateDetail = () => {
    console.log('Despachando detalle');

    dispatchDetail(counter);

    setOpen(false);
  };

  const dispatchDetail = (quantity: number) => {
    const data: UpdateOrderDetailDto = {
      orderId,
      id: detail!.id,
      qtyDelivered: quantity
    };

    socket?.emit(
      EventsEmitSocket.updateOrderDetail,
      data,
      ({ ok, msg }: SocketResponseOrder) => {
        if (!ok) {
          enqueueSnackbar(msg, { variant: 'error' });
        }
      }
    );

    setOpen(false);
  };

  useEffect(() => {
    subscription$.subscribe((data) => {
      setDetail(data.detalle);
      setOpen(data.value);
      setorderId(data.orderId);
      setCounter(data.detalle.qtyDelivered);
    });
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Despachar {detail?.product.name}</DialogTitle>
        <DialogContent>
          <Typography>Cantidad: {detail?.quantity}</Typography>

          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography>Cantidad entregada: </Typography>
            </Box>

            <Box alignContent='right'>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <IconButton onClick={decrement}>
                  <RemoveCircleOutline />
                </IconButton>

                <Typography sx={{ width: 40, textAlign: 'center' }}>
                  {counter}
                </Typography>
                <IconButton onClick={increment}>
                  <AddCircleOutline />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant='outlined'
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            variant='contained'
            onClick={updateDetail}
            disabled={false}
          >
            Actualizar
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              dispatchDetail(detail!.quantity!);
              setOpen(false);
            }}
          >
            <CheckOutlined />
          </Button>
          {/* <Button type='submit' variant='contained' onClick={despacharDetalle} disabled={counter > detalle.cantidad || counter <= detalle.cantEntregada}>Despachar</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};
