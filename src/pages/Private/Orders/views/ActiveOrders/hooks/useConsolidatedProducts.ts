import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import {
  Order,
  OrderStatus,
  TypeOrder,
  IOrderDetail
} from '../../../../../../models';

/**
 * Interface for a product source (where the product came from)
 */
export interface ProductSource {
  orderId: string;
  orderNum: number;
  quantity: number;
  qtyDelivered: number;
  pending: number;
  tableName?: string;
  orderType: TypeOrder;
  description?: string;
  detailId: string;
}

/**
 * Interface for a consolidated product entry
 */
export interface ConsolidatedProduct {
  productId: string;
  productName: string;
  totalPending: number;
  totalQuantity: number;
  sources: ProductSource[];
}

/**
 * Custom hook to consolidate products across IN_PROGRESS orders
 * Groups products by product ID and description (if exists)
 * Only includes items that are not yet fully delivered
 *
 * @returns Array of consolidated products sorted by total pending quantity (desc)
 *
 * @author Santiago Quirumbay
 * @version 1.0 2026-01-03 Initial implementation
 */
export const useConsolidatedProducts = () => {
  const { orders } = useSelector(selectOrders);

  const consolidatedProducts = useMemo(() => {
    // Filter for IN_PROGRESS orders only
    const inProgressOrders = orders.filter(
      (order: Order) => order.status === OrderStatus.IN_PROGRESS
    );

    // Map to store consolidated products
    const productMap = new Map<string, ConsolidatedProduct>();

    // Iterate through all orders and their details
    inProgressOrders.forEach((order: Order) => {
      order.details.forEach((detail: IOrderDetail) => {
        // Only include items that haven't been fully delivered
        const pending = detail.quantity - detail.qtyDelivered;
        if (pending <= 0) return;

        // Create a unique key: productId + description
        // This groups products with different descriptions separately
        const key = `${detail.product.id}|${detail.description || ''}`;

        // Get or create consolidated product entry
        let consolidatedProduct = productMap.get(key);

        if (!consolidatedProduct) {
          consolidatedProduct = {
            productId: detail.product.id,
            productName: detail.product.name,
            totalPending: 0,
            totalQuantity: 0,
            sources: []
          };
          productMap.set(key, consolidatedProduct);
        }

        // Add this source to the consolidated product
        consolidatedProduct.totalPending += pending;
        consolidatedProduct.totalQuantity += detail.quantity;
        consolidatedProduct.sources.push({
          orderId: order.id,
          orderNum: order.num,
          quantity: detail.quantity,
          qtyDelivered: detail.qtyDelivered,
          pending,
          tableName: order.table?.name,
          orderType: order.type,
          description: detail.description,
          detailId: detail.id
        });
      });
    });

    // Convert map to array and sort by total pending (descending)
    return Array.from(productMap.values()).sort(
      (a, b) => b.totalPending - a.totalPending
    );
  }, [orders]);

  // Calculate total statistics
  const statistics = useMemo(() => {
    const totalProducts = consolidatedProducts.length;
    const totalPendingItems = consolidatedProducts.reduce(
      (sum, product) => sum + product.totalPending,
      0
    );
    const totalOrders = new Set(
      consolidatedProducts.flatMap((product) =>
        product.sources.map((source) => source.orderId)
      )
    ).size;

    return {
      totalProducts,
      totalPendingItems,
      totalOrders
    };
  }, [consolidatedProducts]);

  return {
    consolidatedProducts,
    statistics
  };
};
