import { useSnackbar } from 'notistack';
import { useEmitWebSocketsEvent } from '../../../../hooks';
import { Order } from '../../../../models';
import { CreateOrderDto } from '../dto/create-order.dto';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { statusModalAddOrder } from '../services/orders.service';
import { UpdateOrderDto } from '../dto';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from '../../../../redux';

/**
 * Custom hook to create a new order with websockets
 * @version 1.0 28-12-2023
 */
export const useCreateOrder = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useEmitWebSocketsEvent<Order, CreateOrderDto>(
    EventsEmitSocket.createOrder,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'success' });
        statusModalAddOrder.setSubject(true, resp.data!);
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'error' });
      }
    }
  );
};

/**
 * Custom hook to update an order with websockets
 * @version 1.0 28-12-2023
 */
export const useUpdateOrder = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  return useEmitWebSocketsEvent<Order, UpdateOrderDto>(
    EventsEmitSocket.updateOrder,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'success' });
        dispatch(setActiveOrder(resp.data!));
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'error' });
      }
    }
  );
};

/**
 * Custom hook to delete an order with websockets
 * @version 1.0 28-12-2023
 */
export const useDeleteOrder = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useEmitWebSocketsEvent<Order, string>(EventsEmitSocket.deleteOrder, {
    onSuccess: (resp) => {
      enqueueSnackbar(resp.msg, { variant: 'success' });
    },
    onError: (resp) => {
      enqueueSnackbar(resp.msg, { variant: 'error' });
    }
  });
};
