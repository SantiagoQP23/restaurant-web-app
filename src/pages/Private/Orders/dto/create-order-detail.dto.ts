/**
 * Data transfer object for creating an order detail
 * 
 * @author Santiago Quirumbay
 * @version 1.1 01-03-2025 Add qtyDelivered
 */
export interface CreateOrderDetailDto {
  quantity: number;
  description?: string;
  price: number;
  productId: string;
  orderId: string;
  qtyDelivered: number;
  productOptionId?: number;
}
