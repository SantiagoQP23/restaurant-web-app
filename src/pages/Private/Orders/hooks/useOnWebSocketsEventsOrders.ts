import { Order } from '../../../../models';
import { SocketEvent } from '../../../../models/socket-event.dto';
import {
  updateOrder,
  setActiveOrder,
  setLastUpdatedOrders,
  sortOrdersByDeliveryTime,
  selectOrders,
  addOrder,
  deleteOrder
} from '../../../../redux';
import { EventsOnSocket } from '../interfaces/events-sockets.interface';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useOnWebSocketsEvent } from '../../../../hooks';

/**
 * Custom hook to listen to the event of updating an order with websockets
 * @version 1.0 28-12-2023
 */
export const useOnOrderUpdated = () => {
  const dispatch = useDispatch();
  const { activeOrder } = useSelector(selectOrders);

  useOnWebSocketsEvent<Order>(
    EventsOnSocket.updateOrder,
    ({ data: order }: SocketEvent<Order>) => {
      dispatch(updateOrder(order!));

      if (activeOrder?.id === order?.id) {
        dispatch(setActiveOrder(order!));
      }

      dispatch(setLastUpdatedOrders(new Date().toISOString()));

      dispatch(sortOrdersByDeliveryTime());
    }
  );
};

/**
 * Custom hook to listen to the event of creating an order with websockets
 * @version 1.0 28-12-2023
 */
export const useOnOrderCreated = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useOnWebSocketsEvent(
    EventsOnSocket.newOrder,
    ({ data, msg }: SocketEvent<Order>) => {
      enqueueSnackbar(msg, { variant: 'info' });
      dispatch(addOrder(data));

      dispatch(setLastUpdatedOrders(new Date().toISOString()));

      dispatch(sortOrdersByDeliveryTime());
    }
  );
};

/**
 * Custom hook to listen to the event of deleting an order with websockets
 * @version 1.0 28-12-2023
 */
export const useOnOrderDeleted = () => {
  const dispatch = useDispatch();

  useOnWebSocketsEvent(
    EventsOnSocket.deleteOrder,
    ({ data }: SocketEvent<Order>) => {
      dispatch(deleteOrder(data!.id));
      dispatch(setLastUpdatedOrders(new Date().toISOString()));
    }
  );
};
