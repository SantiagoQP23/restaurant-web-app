import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  loadOrders,
  selectOrders,
  setActiveOrder,
  setLastUpdatedOrders
} from '../../../../redux';
import { useQuery } from '@tanstack/react-query';
import {
  OrdersResponse,
  getActiveOrders,
  getOrder,
  getOrders
} from '../services/orders.service';
import { Order, OrderStatus } from '../../../../models';
import { usePaginationAsync } from '../../../../hooks/usePaginationAsync';
import { Period } from '../../Common/dto/period.model';
import { useFilterOrders } from './useFilterOrders';
import { useDateFilter } from '../../../../hooks/useDateFilter';

export const useOrders = () => {
  const filter = useFilterOrders();

  const ordersQuery = useQuery<OrdersResponse>(
    ['orders'],
    () =>
      getOrders({
        offset: filter.page,
        limit: filter.rowsPerPage,
        startDate: filter.startDate,
        endDate: filter.endDate,
        period: filter.period,
        status: filter.status || undefined,
        userId: filter.user?.id
      }),

    {
      onSuccess: () => {}
    }
  );

  useEffect(() => {
    ordersQuery.refetch();
    filter.resetPage();
  }, [
    filter.startDate,
    filter.endDate,
    filter.period,
    filter.table,
    filter.rowsPerPage,
    filter.user,
    filter.isPaid,
    filter.status,
    filter.client
  ]);

  useEffect(() => {
    ordersQuery.refetch();
  }, [filter.page]);

  return {
    ordersQuery,

    ...filter
  };
};

export const useActiveOrders = () => {
  const pagination = usePaginationAsync();

  const dateFilter = useDateFilter(Period.YEARLY);

  const dispatch = useDispatch();

  const activeOrdersQuery = useQuery<Order[]>(
    ['orders', 'actives'],
    () =>
      getActiveOrders({
        offset: pagination.page,
        limit: pagination.rowsPerPage,
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
        period: dateFilter.period
      }),
    {
      onSuccess: (data) => {
        // console.log(data)

        dispatch(loadOrders(data));

        dispatch(setLastUpdatedOrders(new Date().toISOString()));
      }
    }
  );

  useEffect(() => {
    activeOrdersQuery.refetch();
  }, [dateFilter.startDate, dateFilter.endDate, dateFilter.period]);

  return {
    activeOrdersQuery,
    ...pagination
  };
};

export const useOrder = (id: string) => {
  const dispatch = useDispatch();

  return useQuery<Order>(['order', id], () => getOrder(id), {
    enabled: !!id,
    onSuccess: (order) => {
      dispatch(setActiveOrder(order));
    }
  });
};

export const useOrderHelper = () => {
  const { orders } = useSelector(selectOrders);

  const dispatch = useDispatch();

  const sortOrdersByDeliveryTime = (orders: Order[]) => {
    const ordersSorted = orders.sort((a, b) => {
      const aDate = new Date(a.deliveryTime).getTime();
      const bDate = new Date(b.deliveryTime).getTime();

      return aDate - bDate;
    });

    console.log(ordersSorted);

    dispatch(loadOrders(ordersSorted));
  };

  const getFirstPendingOrder = (): Order => {
    const order = orders.find((order) => order.status === OrderStatus.PENDING);

    if (!order) {
      throw new Error('No hay ordenes pendientes');
    }

    return order;
  };

  return {
    getFirstPendingOrder,
    sortOrdersByDeliveryTime
  };
};
