import { OrderDetailStatus } from '@/models';

export interface UpdateMultipleOrderDetailsStatusDto {
  orderDetails: string[];
  status: OrderDetailStatus;
}
