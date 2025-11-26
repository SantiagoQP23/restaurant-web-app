import { CreateBillDto } from './create-bill-dto';

/**
 * @version 1.1 03-01-2024 Adds cashRegisterId and accountId
 */
export interface BillPaymentDto extends Partial<CreateBillDto> {
  id: number;
  isPaid?: boolean;
  cashRegisterId?: number;
  accountId?: number;
}
