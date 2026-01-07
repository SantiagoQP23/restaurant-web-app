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
import { useOnWebSocketsEvent, useNotificationSound } from '../../../../hooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/api/query-keys';

/**
 * Custom hook to listen to the event of updating an order with websockets
 * @version 1.0 28-12-2023
 * @version 1.1 2026-01-05 Added React Query cache invalidation to sync with Redux
 */
export const useOnOrderUpdated = () => {
  const dispatch = useDispatch();
  const { activeOrder } = useSelector(selectOrders);
  const queryClient = useQueryClient();

  useOnWebSocketsEvent<Order>(
    EventsOnSocket.updateOrder,
    ({ data: order }: SocketEvent<Order>) => {
      console.log('Order updated via WebSocket:', order);

      // Update Redux store
      dispatch(updateOrder(order!));
      console.log({ activeOrder, order });

      if (activeOrder?.id === order?.id) {
        dispatch(setActiveOrder(order!));
      }

      dispatch(setLastUpdatedOrders(new Date().toISOString()));
      dispatch(sortOrdersByDeliveryTime());

      // Invalidate React Query cache to sync with Redux updates
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.detail(order!.id)
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.lists()
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.actives()
      });
    }
  );
};

/**
 * Custom hook to listen to the event of creating an order with websockets
 * @version 1.0 28-12-2023
 * @version 1.1 2026-01-05 Added React Query cache invalidation to sync with Redux
 * @version 1.2 2026-01-07 Added notification sound when new order is created
 */
export const useOnOrderCreated = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { play: playNotificationSound } = useNotificationSound(0.5);

  useOnWebSocketsEvent(
    EventsOnSocket.newOrder,
    ({ data, msg }: SocketEvent<Order>) => {
      // Play notification sound
      playNotificationSound();

      enqueueSnackbar(msg, { variant: 'info' });

      // Update Redux store
      dispatch(addOrder(data));
      dispatch(setLastUpdatedOrders(new Date().toISOString()));
      dispatch(sortOrdersByDeliveryTime());

      // Invalidate React Query cache to show new order in lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.lists()
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.actives()
      });
    }
  );
};

/**
 * Custom hook to listen to the event of deleting an order with websockets
 * @version 1.0 28-12-2023
 * @version 1.1 2026-01-05 Added React Query cache invalidation to sync with Redux
 */
export const useOnOrderDeleted = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useOnWebSocketsEvent(
    EventsOnSocket.deleteOrder,
    ({ data }: SocketEvent<Order>) => {
      // Update Redux store
      dispatch(deleteOrder(data!.id));
      dispatch(setLastUpdatedOrders(new Date().toISOString()));

      // Invalidate list queries and remove deleted order from cache
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.lists()
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.actives()
      });
      queryClient.removeQueries({
        queryKey: queryKeys.orders.detail(data!.id)
      });
    }
  );
};
