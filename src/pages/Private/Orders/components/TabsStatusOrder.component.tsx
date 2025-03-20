import { FC } from 'react';

import { Order, OrderStatus } from '../../../../models';
import {
  PendingOutlined,
  Restaurant,
  DoneAllOutlined
} from '@mui/icons-material';
import { Tabs, Tab, Typography, Chip } from '@mui/material';

interface Props {
  statusOrderFilter: OrderStatus | null;
  setStatusOrderFilter: (status: OrderStatus | null) => void;
  orders: Order[];
}

export const TabsStatusOrder: FC<Props> = ({
  statusOrderFilter,
  setStatusOrderFilter,
  orders
}) => {
  return (
    <>
      <Tabs
        value={statusOrderFilter}
        variant='scrollable'
        indicatorColor='primary'
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: !statusOrderFilter
              ? 'primary.main'
              : statusOrderFilter === OrderStatus.PENDING
                ? 'warning.main'
                : statusOrderFilter === OrderStatus.IN_PROGRESS
                  ? 'info.main'
                  : 'success.main',
            // borderRadius}: '10px 10px 0 0',
            borderColor: 'transparent',
            borderBottom: 'transparent'
          }
        }}
      >
        <Tab
          label={
            <>
              <Typography variant='h5' component='span'>
                Pendientes
              </Typography>
              <Chip
                label={
                  orders.filter((order) => order.status === OrderStatus.PENDING)
                    .length
                }
                color='warning'
                size='small'
                sx={{ ml: 1 }}
              />
            </>
          }
          value={OrderStatus.PENDING}
          onClick={() => setStatusOrderFilter(OrderStatus.PENDING)}
          icon={<PendingOutlined />}
          iconPosition='start'
        />

        <Tab
          label={
            <>
              <Typography variant='h5' component='span'>
                En preparación
              </Typography>
              <Chip
                label={
                  orders.filter(
                    (order) => order.status === OrderStatus.IN_PROGRESS
                  ).length
                }
                color='info'
                size='small'
                sx={{ ml: 1 }}
              />
            </>
          }
          value={OrderStatus.IN_PROGRESS}
          onClick={() => setStatusOrderFilter(OrderStatus.IN_PROGRESS)}
          icon={<Restaurant />}
          iconPosition='start'
        />

        <Tab
          label={
            <>
              <Typography variant='h5' component='span'>
                Entregados
              </Typography>
              <Chip
                label={
                  orders.filter(
                    (order) => order.status === OrderStatus.DELIVERED
                  ).length
                }
                color='success'
                size='small'
                sx={{ ml: 1 }}
              />
            </>
          }
          value={OrderStatus.DELIVERED}
          onClick={() => setStatusOrderFilter(OrderStatus.DELIVERED)}
          icon={<DoneAllOutlined />}
          iconPosition='start'
        />
      </Tabs>
    </>
  );
};
