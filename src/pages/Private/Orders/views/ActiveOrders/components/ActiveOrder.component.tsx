import { FC, useCallback, useMemo } from 'react';

import { Card, Divider, Stack, alpha, useTheme } from '@mui/material';
import { addMinutes } from 'date-fns';

import { UpdateOrderDto } from '../../../dto/update-order.dto';
import {
  OrderDetailStatus,
  OrderStatus
} from '../../../../../../models/orders.model';

import { Order } from '../../../../../../models';
import { statusModalStartOrder } from '../../../services/orders.service';
import { BtnAddProduct } from './BtnAddProduct.component';
import { useQueryClient } from '@tanstack/react-query';
import {
  useUpdateMultipleOrderDetailsStatus,
  useUpdateOrder
} from '../../../hooks';
import { useOrderHelper } from '../../../hooks/useOrders';
import { ProductionArea } from '../../../../Common/models/production-area.model';
import { useProductionAreasStore } from '../../../../Common/store/production-areas-store';
import { ProductionAreaOrder } from './ProductionAreaOrder.component';
import { queryKeys } from '@/api/query-keys';
import { OrderCardHeader } from './OrderCardHeader.component';
import { OrderMetadata } from './OrderMetadata.component';
import { OrderActions } from './OrderActions.component';
import { useTimeUrgency } from '../../../hooks/useTimeUrgency';
import { useOrdersStore } from '@/pages/Private/Common/store/useOrdersStore';
import NiceModal from '@ebay/nice-modal-react';
import { ModalStartOrder } from './ModalStartOrder.component';

interface Props {
  order: Order;
  setStatusFilter?: (status: OrderStatus) => void;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
  index: number;
  productionArea?: ProductionArea;
  detailStatusSection?: OrderDetailStatus;
  onClick?: () => void;
}

/**
 * Component to render active order
 * @author Santiago Quirumbay
 * @version 1.1 16/12/2023 Adds productionArea field.
 * @version 1.2 28/12/2023 Updates useUpdateOrder hook.
 * @version 1.3 2025-01-01 Migrated to React Query v5
 * @version 1.4 2026-01-03 Enhanced UI with better visual hierarchy and subcomponents
 */
export const ActiveOrder: FC<Props> = ({
  order,
  setStatusFilter,
  color,
  index,
  onClick,
  productionArea,
  detailStatusSection
}) => {
  const theme = useTheme();
  const { getFirstPendingOrder } = useOrderHelper();
  const { productionAreas } = useProductionAreasStore();
  const queryClient = useQueryClient();
  const { mutate: updateOrder } = useUpdateOrder();
  const { mutate: updateMultipleOrderDetailsStatus } =
    useUpdateMultipleOrderDetailsStatus();
  const setActiveOrder = useOrdersStore((state) => state.setActiveOrder);
  const activeOrder = useOrdersStore((state) => state.activeOrder);
  // const adjustedDeliveryTime = addMinutes(new Date(order.deliveryTime), 30);
  const timeUrgency = useTimeUrgency(new Date(order.deliveryTime));

  const areasToRender = useMemo(() => {
    if (productionArea) {
      return [productionArea];
    }

    return productionAreas;
  }, [productionArea, productionAreas]);

  const detailsToRender = useMemo(() => {
    if (!detailStatusSection) {
      return order.details;
    }

    return order.details.filter(
      (detail) => detail.status === detailStatusSection
    );
  }, [detailStatusSection, order.details]);

  // Prefetch order details for quick access
  useMemo(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.orders.detail(order.id),
      queryFn: () => order
    });
  }, [order, queryClient]);

  const handleStartOrder = useCallback(
    (order: Order) => {
      const firstOrder = getFirstPendingOrder();

      if (firstOrder.id === order.id) {
        changeStatusOrder(OrderStatus.IN_PROGRESS);
      } else {
        NiceModal.show(ModalStartOrder, {
          onStartOrder: () => changeStatusOrder(OrderStatus.IN_PROGRESS)
        });
      }
    },
    [getFirstPendingOrder]
  );

  const changeStatusOrder = useCallback(
    (status: OrderStatus) => {
      const detailsInCurrentArea = order.details.filter((detail) => {
        if (!productionArea) {
          return true;
        }

        return detail.product.productionArea.id === productionArea.id;
      });

      const detailsStatusByOrderStatus: Record<OrderStatus, OrderDetailStatus> =
        {
          [OrderStatus.PENDING]: OrderDetailStatus.PENDING,
          [OrderStatus.IN_PROGRESS]: OrderDetailStatus.IN_PROGRESS,
          [OrderStatus.READY]: OrderDetailStatus.READY,
          [OrderStatus.DELIVERED]: OrderDetailStatus.READY,
          [OrderStatus.CANCELLED]: OrderDetailStatus.PENDING
        };

      if (detailsInCurrentArea.length > 0) {
        updateMultipleOrderDetailsStatus({
          orderDetails: detailsInCurrentArea.map((detail) => detail.id),
          status: detailsStatusByOrderStatus[status]
        });
      }

      const data: UpdateOrderDto = {
        id: order.id,
        status
      };

      updateOrder(data);
    },
    [
      order.details,
      order.id,
      productionArea,
      updateMultipleOrderDetailsStatus,
      updateOrder
    ]
  );

  return (
    <Card
      sx={{
        borderTop: `5px solid ${theme.palette[color].main}`,
        boxShadow: 'none',
        border: 1,
        borderColor: 'divider',
        // boxShadow:
        //   '0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* onClick={() => */}
      {/*   order.id === activeOrder?.id */}
      {/*     ? setActiveOrder(null) */}
      {/*     : setActiveOrder(order) */}
      {/* } */}
      {/* Enhanced Header */}
      <OrderCardHeader order={order} index={index} color={color} />

      {/* Enhanced Metadata */}
      <OrderMetadata order={order} color={color} />

      {/* Products by Production Area */}
      <Stack spacing={1.5} sx={{ px: 2, py: 1 }}>
        <Stack spacing={1.5} direction='column'>
          {areasToRender.map((area) => (
            <ProductionAreaOrder
              key={area.id}
              details={detailsToRender}
              productionArea={area}
              orderId={order.id}
              order={order}
              detailStatusFilter={detailStatusSection}
            />
          ))}
        </Stack>

        {/* Add Product Button */}
        {/* <BtnAddProduct order={order} /> */}
      </Stack>

      {/* Divider before actions */}
      {/* {order.status !== OrderStatus.DELIVERED && <Divider sx={{ mt: 0.5 }} />} */}

      {/* Enhanced Actions */}
      <OrderActions
        order={order}
        onStartOrder={handleStartOrder}
        onChangeStatus={changeStatusOrder}
        setStatusFilter={setStatusFilter}
        detailStatusSection={detailStatusSection}
      />
    </Card>
  );
};
