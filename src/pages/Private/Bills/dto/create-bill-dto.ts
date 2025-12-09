import { PaymentMethod } from '../../Orders/models/Invoice.model';
import { CreateBillDetailDto } from './';

export interface CreateBillDto {
  orderId: string;
  clientId?: string;
  details: CreateBillDetailDto[];
  paymentMethod?: string;
  receivedAmount?: number;
  discount?: number;
}
