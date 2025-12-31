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
import { queryKeys } from '@/api/query-keys';

/**
 * Hook to fetch orders with filtering and pagination
 * @version 2.0 - Migrated to React Query v5
 */
export const useOrders = () => {
  const filter = useFilterOrders();

  const ordersQuery = useQuery<OrdersResponse>({
    queryKey: queryKeys.orders.lists(),
    queryFn: () =>
      getOrders({
        offset: filter.page,
        limit: filter.rowsPerPage,
        startDate: filter.startDate,
        endDate: filter.endDate,
        period: filter.period,
        status: filter.status || undefined,
        userId: filter.user?.id
      })
  });

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

/**
 * Hook to fetch active orders
 * @version 2.0 - Migrated to React Query v5
 */
export const useActiveOrders = () => {
  const pagination = usePaginationAsync();

  const dateFilter = useDateFilter(Period.YEARLY);

  const dispatch = useDispatch();

  const activeOrdersQuery = useQuery<Order[]>({
    queryKey: queryKeys.orders.actives(),
    queryFn: () =>
      getActiveOrders({
        offset: pagination.page,
        limit: pagination.rowsPerPage,
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
        period: dateFilter.period
      })
  });

  // Handle Redux integration - dispatch on successful data fetch
  useEffect(() => {
    if (activeOrdersQuery.isSuccess && activeOrdersQuery.data) {
      dispatch(loadOrders(activeOrdersQuery.data));
      dispatch(setLastUpdatedOrders(new Date().toISOString()));
    }
  }, [activeOrdersQuery.data, activeOrdersQuery.isSuccess, dispatch]);

  useEffect(() => {
    activeOrdersQuery.refetch();
  }, [dateFilter.startDate, dateFilter.endDate, dateFilter.period]);

  return {
    activeOrdersQuery,
    ...pagination
  };
};

/**
 * Hook to fetch a single order by ID
 * @version 2.0 - Migrated to React Query v5
 */
export const useOrder = (id: string) => {
  const dispatch = useDispatch();

  const orderQuery = useQuery<Order>({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => getOrder(id),
    enabled: !!id
  });

  // Handle Redux integration - dispatch on successful data fetch
  useEffect(() => {
    if (orderQuery.isSuccess && orderQuery.data) {
      dispatch(setActiveOrder(orderQuery.data));
    }
  }, [orderQuery.data, orderQuery.isSuccess, dispatch]);

  return orderQuery;
};

/**
 * Helper functions for working with orders
 */
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
