import { PendingOutlined, Restaurant, CheckCircle } from '@mui/icons-material';
import { OrderStatus, TypeOrder } from '../../../../models/orders.model';

/**
 * Order type labels for display
 */
export const ORDER_TYPE_LABELS = {
  [TypeOrder.IN_PLACE]: 'Mesa',
  [TypeOrder.TAKE_AWAY]: 'Para llevar'
} as const;

/**
 * Status configuration for visual styling
 */
export const ORDER_STATUS_CONFIG = {
  [OrderStatus.PENDING]: {
    color: 'warning' as const,
    icon: PendingOutlined,
    label: 'Pendiente'
  },
  [OrderStatus.IN_PROGRESS]: {
    color: 'info' as const,
    icon: Restaurant,
    label: 'En preparación'
  },
  [OrderStatus.DELIVERED]: {
    color: 'success' as const,
    icon: CheckCircle,
    label: 'Entregado'
  },
  [OrderStatus.CANCELLED]: {
    color: 'error' as const,
    icon: CheckCircle,
    label: 'Cancelado'
  }
} as const;

/**
 * Time urgency thresholds (in minutes)
 */
export const TIME_URGENCY = {
  OVERDUE: 0,
  URGENT: 5,
  WARNING: 30
} as const;

/**
 * Animation durations (in ms)
 */
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
} as const;
