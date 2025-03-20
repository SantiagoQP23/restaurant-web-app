import React, { FC, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText
} from '@mui/material/';

import { IOrderDetail } from '../../../../../models/orders.model';
import { SocketContext } from '../../../../../context';
import { OrderContext } from '../../context/Order.context';
import { statusModalDescriptionDetail } from '../../services/orders.service';
import {
  selectOrders,
  setActiveOrder
} from '../../../../../redux/slices/orders/orders.slice';
import { EventsEmitSocket } from '../../interfaces/events-sockets.interface';
import { useSnackbar } from 'notistack';
import { SocketResponseOrder } from '../../interfaces/responses-sockets.interface';
import { UpdateOrderDetailDto } from '../../dto/update-order-detail.dto';

interface Props {}

export const ModalUpdateDetail: FC<Props> = ({}) => {
  const { idPedido } = useParams();

  const subscription$ = statusModalDescriptionDetail.getSubject();

  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState<IOrderDetail>();

  const [description, setDescription] = useState(detail?.description || '');

  const [price, setPrice] = useState(detail?.price || 0);

  const {} = useContext(OrderContext);

  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);

  const { activeOrder } = useSelector(selectOrders);

  const { enqueueSnackbar } = useSnackbar();

  const updateDescriptionDetail = () => {
    const data: UpdateOrderDetailDto = {
      orderId: activeOrder!.id,
      id: detail!.id,
      description,
      price
    };

    console.log(data);

    socket?.emit(
      EventsEmitSocket.updateOrderDetail,
      data,
      ({ ok, order, msg }: SocketResponseOrder) => {
        if (ok) {
          dispatch(setActiveOrder(order!));
        } else {
          enqueueSnackbar(msg, { variant: 'error' });
        }
      }
    );

    setOpen(false);
  };

  useEffect(() => {
    subscription$.subscribe((data) => {
      setDetail(data.detalle);
      setOpen(!!data.value);
    });
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setDescription('');
        }}
      >
        <DialogTitle>Detalle del pedido</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {detail?.quantity} - {detail?.product.name}
          </DialogContentText>

          <FormControl fullWidth>
            <FormHelperText>
              Ingrese aquí los pedidos especiales del cliente
            </FormHelperText>
            <TextField
              id='descripcion-pedido'
              label='Detalle del pedido'
              margin='dense'
              multiline
              rows={4}
              defaultValue={detail?.description}
              sx={{ width: 300 }}
              onBlur={(e) => {
                console.log(e.target.value);
                setDescription(e.target.value);
              }}
            />

            <TextField
              id='preci'
              label='Precio'
              margin='dense'
              type='number'
              defaultValue={detail?.price}
              sx={{ width: 300 }}
              onBlur={(e) => {
                console.log(e.target.value);
                setPrice(Number(e.target.value));
              }}
              inputProps={{
                min: 0,
                max: detail?.product.price,
                step: 0.25
              }}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setDescription('');
            }}
          >
            Cancelar
          </Button>
          <Button onClick={updateDescriptionDetail}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
