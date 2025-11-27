import { loadAbort } from '../../../../helpers/load-abort-axios.helper';
import restauranteApi from '../../../../api/restauranteApi';
import { Order } from '../../../../models/orders.model';
import {
  SubjectDescriptionDetail,
  SubjectDispatchDetail,
  SubjectModalDeleteOrder,
  SubjectModalPayOrder,
  SubjectEditOrderDetail
} from '../helpers/subject-orders.helper';
import { DateFiltePaginationDto } from '../../Common/dto';
import { FilterOrdersDto } from '../dto/filter-orders.dto';
import { SubjectGenerator } from '../../Common/helpers/subject-generator.helper';

interface ModalOrder {
  value: boolean;
  order: Order | null;
}

export const statusModalDescriptionDetail = new SubjectDescriptionDetail();
export const statusModalDispatchDetail = new SubjectDispatchDetail();
export const statusModalDeleteOrder = new SubjectModalDeleteOrder();
export const statusModalDiscountOrder = new SubjectModalPayOrder();
export const statusModalPayOrder = new SubjectModalPayOrder();
export const statusModalAddOrder = new SubjectModalPayOrder();

export const statusModalEditOrderDetail = new SubjectEditOrderDetail();
export const statusModalDeleteOrderDetail = new SubjectEditOrderDetail();

export const statusModalStartOrder = new SubjectGenerator<ModalOrder>();

export interface OrdersResponse {
  orders: Order[];
  count: number;
}

export const getOrders = async (filterDto: FilterOrdersDto) => {
  const { limit = 10, offset = 0, ...restFilter } = filterDto;

  const { data } = await restauranteApi.get<OrdersResponse>(`orders`, {
    params: {
      ...restFilter,
      offset: limit * offset,
      limit
    }
  });

  return data;
};

export const getActiveOrders = async (filterDto: DateFiltePaginationDto) => {
  const { period, startDate, endDate, limit = 10, offset = 0 } = filterDto;

  const { data } = await restauranteApi.get<Order[]>(`orders/actives`, {
    params: {
      limit: 50,
      offset: 0,
      startDate: new Date('01-01-2025'),
      period: 'yearly'
    }
  });

  return data;
};

export const getOrdersToday = () => {
  const controller = loadAbort();

  return {
    call: restauranteApi.get<Order[]>(
      `orders`,

      { signal: controller.signal }
    ),
    controller
  };
};

export interface FindOrderByDate {
  startDate?: string;
  endDate?: string;
}

export const getOrdersByDate = (find?: FindOrderByDate) => {
  const controller = loadAbort();

  let call;

  if (find) {
    call = restauranteApi.get<Order[]>(
      `orders/${find.startDate ? `?startDate=${find.startDate}` : ''}`,
      { signal: controller.signal }
    );
  } else {
    call = restauranteApi.get<Order[]>(`orders`, {
      signal: controller.signal
    });
  }

  return {
    call,
    controller
  };
};

export const getOrder = async (orderId: string): Promise<Order> => {
  const { data } = await restauranteApi.get<Order>(`orders/${orderId}`);

  return data;
};

// export const getOrder = (orderId: string) => {

//   const controller = loadAbort();

//   return {
//     call: restauranteApi.get<IOrder>(`orders/${orderId}`,

//       { signal: controller.signal }),
//     controller

//   }

// }
