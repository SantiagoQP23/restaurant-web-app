import { DateFiltePaginationDto } from '../../../Common/dto';
import { PaymentMethod } from '../../../../../models/orders.model';

export interface FilterInvoicesDto extends DateFiltePaginationDto {
  userId?: string;

  clientId?: string;

  isActive?: boolean;

  paymentMethod?: PaymentMethod;

  transactionNumber?: string;

  notaDeVenta?: string;

  cashRegisterId?: string;
}
