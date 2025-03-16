import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import { Card, Typography, Box, IconButton, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FC, useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SocketContext } from '../../../../../../context';
import { IProduct } from '../../../../../../models';
import { selectOrders } from '../../../../../../redux';
import { useCounter } from '../../../hooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ProductStatus } from '../../../../../../models/menu.model';
import { sharingInformationService } from '../../../services/sharing-information.service';

interface PropsProduct {
  product: IProduct;
  //newDetail: (detail: ICreateOrderDetail) => void;
}

export const ProductAddToOrder: FC<PropsProduct> = ({ product }) => {
  const { state: counter, increment, decrement } = useCounter(1);

  const { activeOrder } = useSelector(selectOrders);

  const [subtotal, setSubtotal] = useState(counter * product.price);

  useEffect(() => {
    setSubtotal(counter * product.price);
  }, [counter]);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);

  // const updateOrderDetail = (detail: IOrderDetail) => {
  //   const data: UpdateOrderDetailDto = {
  //     orderId: activeOrder!.id,
  //     id: detail.id,
  //     quantity: detail.quantity + counter
  //   }

  //   socket?.emit(EventsEmitSocket.updateOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

  //     if (ok) {
  //       dispatch(setActiveOrder(order!))

  //     } else {
  //       enqueueSnackbar(msg, { variant: 'error' });
  //     }

  //   });

  // }

  // const createOrderDetail = () => {
  //   const data: CreateOrderDetailDto = {

  //     orderId: activeOrder!.id,
  //     productId: product.id,
  //     quantity: counter
  //   }

  //   console.log(data);

  //   socket?.emit(EventsEmitSocket.addOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

  //     if (ok) {
  //       dispatch(setActiveOrder(order!))

  //     } else {
  //       enqueueSnackbar(msg, { variant: 'error' });
  //     }

  //   });
  // }

  const createNewDetail = () => {
    sharingInformationService.setSubject(true, {
      product,
      quantity: counter
    });

    // const detail = activeOrder!.details.find(det => det.product.id === product.id);

    // if (detail) {
    //   updateOrderDetail(detail);

    // } else {
    //   createOrderDetail();
    // }
  };

  return (
    <>
      <Card
        sx={{
          p: 1
        }}
      >
        <Typography variant='h4'>{product.name}</Typography>

        <Typography variant='body1'>$ {product.price}</Typography>

        <Box display='flex' justifyContent='space-between' alignItems='center'>
          {product.status === ProductStatus.AVAILABLE ? (
            <Box display='flex' alignItems='center'>
              <IconButton size='small' onClick={decrement}>
                <RemoveCircleOutline />
              </IconButton>

              <Typography sx={{ width: 40, textAlign: 'center' }}>
                {counter}
              </Typography>
              <IconButton size='small' onClick={increment}>
                <AddCircleOutline />
              </IconButton>

              {!activeOrder?.details.find(
                (det) => det.product.id === product.id
              ) ? (
                <Button
                  disabled={counter <= 0}
                  color='primary'
                  onClick={() => {
                    createNewDetail();
                    /* newDetail({product, quantity: counter}) */
                  }}
                  size='small'
                >
                  <ShoppingCartIcon />
                </Button>
              ) : (
                <Button disabled>Añadido</Button>
              )}
            </Box>
          ) : (
            <Typography variant='h6' color='info' align='center'>
              Producto no disponible
            </Typography>
          )}
        </Box>
      </Card>
    </>
  );
};
