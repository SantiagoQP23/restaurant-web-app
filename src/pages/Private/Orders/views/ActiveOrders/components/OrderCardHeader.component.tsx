import { FC } from 'react';
import {
  CardHeader,
  Stack,
  Chip,
  Typography,
  Box,
  alpha,
  useTheme,
  IconButton
} from '@mui/material';
import {
  PeopleOutlined,
  TimerOutlined,
  OpenInNewOutlined
} from '@mui/icons-material';
import { formatDistance, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Order, OrderStatus, TypeOrder } from '../../../../../../models';
import {
  ORDER_TYPE_LABELS,
  ORDER_STATUS_CONFIG
} from '../../../constants/order.constants';
import { LabelStatusOrder } from '../../../components/LabelStatusOrder.component';
import { useTimeUrgency } from '../../../hooks/useTimeUrgency';
import { useNavigate } from 'react-router-dom';

interface Props {
  order: Order;
  index: number;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
}

/**
 * Enhanced order card header with status, urgency, and order info
 * @version 1.1 03-02-2026 Adds navigate-to-order-view button
 */
export const OrderCardHeader: FC<Props> = ({ order, index, color }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const adjustedDeliveryTime = new Date(order.deliveryTime);
  const timeUrgency = useTimeUrgency(adjustedDeliveryTime);

  return (
    <CardHeader
      sx={{
        pb: 1.5
      }}
      title={
        <Stack spacing={1} direction='column' my={0.5}>
          {/* Position Badge and Status */}
          <Stack
            direction='row'
            spacing={2}
            justifyContent='space-between'
            alignItems='center'
          >
            {/* <Typography variant='h5'>{index + 1}</Typography> */}
            <Chip label={index + 1} size='small' variant='outlined' />

            {/* <LabelStatusOrder status={order.status} /> */}

            {/* Urgency Time Badge */}
            {order.status !== OrderStatus.DELIVERED && (
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
            )}
            <Box></Box>

            {/* <IconButton */}
            {/*   size='small' */}
            {/*   onClick={() => navigate(`/orders/list/edit/${order.id}`)} */}
            {/*   sx={{ color: 'text.secondary', p: 0.5 }} */}
            {/* > */}
            {/*   <OpenInNewOutlined fontSize='small' /> */}
            {/* </IconButton> */}
          </Stack>

          {/* Order Title */}
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography variant='h5' fontWeight={500}>
                {order.type === TypeOrder.IN_PLACE
                  ? `${ORDER_TYPE_LABELS[TypeOrder.IN_PLACE]} ${order.table?.name}`
                  : ORDER_TYPE_LABELS[TypeOrder.TAKE_AWAY]}
              </Typography>

              {/* Order Number */}
              <Stack direction='row' spacing={2} alignItems='center' mt={0.5}>
                <Typography variant='body2' color='text.secondary'>
                  Pedido N° {order.num}
                </Typography>

                <Box display='flex' alignItems='center' gap={0.5}>
                  <PeopleOutlined
                    sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
                  />
                  <Typography variant='body2'>{order.people}</Typography>
                </Box>
              </Stack>
            </Box>

            <Stack alignItems='end' spacing={0.5}>
              <LabelStatusOrder status={order.status} />
              <Typography variant='body2' color='text.secondary'>
                {format(new Date(order.createdAt), 'HH:mm')}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      }
    />
  );
};
