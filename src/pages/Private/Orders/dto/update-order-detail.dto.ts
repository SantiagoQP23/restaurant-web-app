import { TypeOrder } from '@/models';

/**
 * Update Order Detail DTO
 * @author Steven Rosales
 * @version 1.0 17/03/2025 Adds type order
 */
export interface UpdateOrderDetailDto {
  id: string;
  quantity?: number;
  qtyDelivered?: number;
  description?: string;
  orderId: string;
  price?: number;
  productOptionId?: number;
  typeOrderDetail?: TypeOrder;
}
