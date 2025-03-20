import { IUser } from './auth.model';
import { BillDetail } from './bill-detail.model';
import { IClient } from './client.model';
import { PaymentMethod } from './orders.model';

/**
 * Bill Model
 * @version v1.0 22-12-2023
 */
export interface Bill {
  id: number;
  num: number;
  comments: string;

  paymentMethod: PaymentMethod;

  receivedAmount: number;

  change: number;

  discount: number;

  total: number;

  isPaid: boolean;

  client: IClient;

  createdBy: IUser;

  owner: IUser;

  createdAt: Date;
  updatedAt: Date;

  isActive: boolean;

  details: BillDetail[];
}
