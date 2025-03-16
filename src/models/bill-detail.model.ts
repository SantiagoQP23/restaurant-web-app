import { Bill } from './bill.model';
import { IOrderDetail } from './orders.model';

/**
 * BillDetail Model
 * @version v1.0 22-12-2023
 */
export interface BillDetail {
  id: number;
  quantity: number;
  price: number;
  total: number;
  bill: Bill;
  orderDetail: IOrderDetail;
  createdAt: Date;
  updatedAt: Date;
}
