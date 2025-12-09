import { IUser, IProduct, ProductOption } from '.';
import { ITable } from './table.model';
// import { Invoice } from "../pages/Private/Orders/models/Invoice.model";
import { Bill } from './bill.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  // READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum OrderStatusPay {
  NO_PAY = 'NO_PAY',
  PAY = 'PAY',
  PARTIAL_PAY = 'PARTIAL_PAY'
}

export enum TypeOrder {
  TAKE_AWAY = 'TAKE_AWAY',
  IN_PLACE = 'IN_PLACE'
  //DELIVERY = 'ENTREGA DOMICILIO',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  TRANSFER = 'TRANSFER'
}

export enum OrderStatusSpanish {
  PENDING = 'PENDIENTE',
  IN_PROGRESS = 'PREPARANDO',
  READY = 'LISTO',
  DELIVERED = 'ENTREGADO',
  CANCELLED = 'CANCELADO'
}

/**
 * Order Model
 * @version v1.1 22-12-2023 Adds the field bills and remove invoices
 */
export interface Order {
  notes: string;
  deliveryTime: Date;
  createdAt: Date;
  details: IOrderDetail[];
  id: string;
  isPaid: boolean;
  num: number;
  people: number;
  status: OrderStatus;
  table?: ITable;
  total: number;
  type: TypeOrder;
  updatedAt: Date;
  user: IUser;
  isClosed: boolean;
  bills: Bill[];
}

/**
 * Order Detail Model
 * @author Steven Rosales
 * @version v1.1 22-12-2023 Adds type order
 */
export interface IOrderDetail {
  id: string;

  quantity: number;

  qtyDelivered: number;

  qtyPaid: number;

  amount: number;

  description: string;

  createdAt: string;

  updatedAt: string;

  product: IProduct;

  isActive: boolean;

  price: number;

  typeOrderDetail: TypeOrder;
  productOption?: ProductOption;
}

export interface ICreateOrderDetail {
  quantity: number;
  product: IProduct;
  description?: string;
  productOption?: ProductOption;
}
