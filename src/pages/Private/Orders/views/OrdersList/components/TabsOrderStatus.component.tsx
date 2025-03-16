import { FC } from 'react';

import { Order, OrderStatus } from '../../../../../../models';
import { Tab, Tabs } from '@mui/material';

interface Props {
  orders: Order[];
  statusOrderFilter: OrderStatus | null;
  changeStatus: (value: OrderStatus | null) => void;
  isPaid: boolean | null;
  changeIsPaid: (value: boolean | null) => void;
}

export const TabsOrderStatus: FC<Props> = ({
  statusOrderFilter,
  changeStatus,
  changeIsPaid
}) => {
  return (
    <Tabs
      value={statusOrderFilter}
      onChange={(e, newValue: OrderStatus | null | 'paid') => {
        if (newValue === 'paid') {
          changeIsPaid(true);
          changeStatus(null);
          return;
        }

        changeStatus(newValue);
      }}
      variant='scrollable'
    >
      <Tab
        label='Todos'
        // icon={<Label color='info'>{orders.length}</Label>}
        iconPosition='end'
        value={null}
        // onClick={() => setView('list')}
      />
      <Tab
        label='Pendiente'
        value={OrderStatus.PENDING}
        // icon={<Label color='success'>{orders.filter(order => order.status === OrderStatus.PENDING).length}</Label>}
        iconPosition='end'
        // onClick={() => setView('list')}
      />
      <Tab
        label='En preparación'
        value={OrderStatus.IN_PROGRESS}
        // icon={<Label color='primary'>{orders.filter(order => order.status === OrderStatus.IN_PROGRESS).length}</Label>}
        iconPosition='end'
        // onClick={() => setView('list')}
      />
      <Tab
        label='Entregados'
        value={OrderStatus.DELIVERED}
        // icon={<Label color='warning'>{orders.filter(order => order.status === OrderStatus.DELIVERED && !order.isPaid).length}</Label>}
        iconPosition='end'
        // onClick={() => setView('list')}
      />

      <Tab
        label='Cancelados'
        value={OrderStatus.CANCELLED}
        // icon={<Label color='error'>{orders.filter(order => order.status === OrderStatus.CANCELLED).length}</Label>}
        iconPosition='end'
        // onClick={() => setView('list')}
      />
    </Tabs>
  );
};
