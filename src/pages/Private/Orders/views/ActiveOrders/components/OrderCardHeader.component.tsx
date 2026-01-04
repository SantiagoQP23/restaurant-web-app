import { FC } from 'react';
import {
  CardHeader,
  Stack,
  Chip,
  Typography,
  Box,
  alpha,
  useTheme
} from '@mui/material';
import { TimerOutlined } from '@mui/icons-material';
import { formatDistance, addMinutes } from 'date-fns';
import { es } from 'date-fns/locale';
import { Order, OrderStatus, TypeOrder } from '../../../../../../models';
import {
  ORDER_TYPE_LABELS,
  ORDER_STATUS_CONFIG
} from '../../../constants/order.constants';
import { LabelStatusOrder } from '../../../components/LabelStatusOrder.component';
import { useTimeUrgency } from '../../../hooks/useTimeUrgency';

interface Props {
  order: Order;
  index: number;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
}

/**
 * Enhanced order card header with status, urgency, and order info
 */
export const OrderCardHeader: FC<Props> = ({ order, index, color }) => {
  const theme = useTheme();
  const adjustedDeliveryTime = addMinutes(new Date(order.deliveryTime), 30);
  const timeUrgency = useTimeUrgency(adjustedDeliveryTime);

  return (
    <CardHeader
      sx={{
        pb: 1.5
      }}
      title={
        <Stack spacing={1} direction='column' my={0.5} alignItems='center'>
          {/* Position Badge and Status */}
          <Stack direction='row' spacing={1} alignItems='center'>
            <Chip
              label={index + 1}
              color={color}
              size='small'
              variant='outlined'
              sx={{
                fontWeight: 'bold',
                fontSize: '0.875rem',
                minWidth: 36,
                height: 28
              }}
            />
            <LabelStatusOrder status={order.status} />

            {/* Urgency Time Badge */}
            <Chip
              icon={<TimerOutlined />}
              label={formatDistance(adjustedDeliveryTime, new Date(), {
                addSuffix: true,
                includeSeconds: false,
                locale: es
              })}
              color={timeUrgency.color}
              size='small'
              sx={{
                fontWeight: 600
              }}
            />
          </Stack>

          {/* Order Title */}
          <Typography
            variant='h3'
            fontWeight={500}
            sx={{
              fontSize: '1.75rem'
            }}
          >
            {order.type === TypeOrder.IN_PLACE
              ? `${ORDER_TYPE_LABELS[TypeOrder.IN_PLACE]} ${order.table?.name}`
              : ORDER_TYPE_LABELS[TypeOrder.TAKE_AWAY]}
          </Typography>

          {/* Order Number */}
          <Typography variant='body2' fontWeight={500} color='text.secondary'>
            Pedido N° {order.num}
          </Typography>
        </Stack>
      }
    />
  );
};
