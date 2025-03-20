import { IClient, IUser } from '../../../../models';
import { InvoiceDetail } from './invoice-detail.model';

export enum PaymentMethod {
  CASH = 'CASH',
  // CARD = 'CARD',
  TRANSFER = 'TRANSFER'
}

export enum InvoiceStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  DRAFT = 'DRAFT' // Si está draft eliminar completamente la factura
}

export interface Invoice {
  id: string;

  transactionNumber: number;

  paymentMethod?: PaymentMethod;

  amount: number;

  amountPaid?: number;

  difference?: number;

  discount?: number;

  total?: number;

  client?: IClient;

  status: InvoiceStatus;

  createdAt: Date;

  updatedAt: Date;

  details: InvoiceDetail[];

  user: IUser;

  comments: string;

  notaDeVenta: string;

  isActive: boolean;
}
