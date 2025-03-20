import { IOrderDetail, IProduct } from '../../../../models';

export interface InvoiceDetail {
  id: string;

  title: string;

  product: IProduct;

  description: string;

  quantity: number;

  orderDetail: IOrderDetail;

  price: number;

  amount: number;

  createdAt: Date;

  updatedAt: Date;
}
