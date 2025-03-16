import { PaymentMethod } from '../../models/Invoice.model';
import { CreateInvoiceDetailDto } from './create-invoice-detail.dto';

export interface CreateInvoiceDto {
  orderId: string;

  clientId: string;

  details: CreateInvoiceDetailDto[];

  paymentMethod: PaymentMethod;

  discount: number;

  amountPaid: number;

  cashRegisterId: string;
}
