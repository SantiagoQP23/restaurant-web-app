import { Card, CardHeader, Box, Stack } from '@mui/material';
import { Order, OrderStatus } from '../../../../../../models';
import { FC } from 'react';
import { ActiveOrder } from './ActiveOrder.component';
import { Label } from '../../../../../../components/ui';

interface Props {
  orders: Order[];
  title: string;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
  status?: OrderStatus;
  alignment?: string;
}

export const CardActiveOrder: FC<Props> = ({
  orders,
  title,
  color,
  alignment = 'vertical'
}) => {
  return (
    <>
      <Card
        sx={{
          width: alignment === 'horizontal' ? 'auto' : '325px',

          border: 'none'
        }}
      >
        <CardHeader
          title={<>{title}</>}
          action={<Label color={color}>{orders.length}</Label>}
        />

        <Stack
          direction={alignment === 'horizontal' ? 'row' : 'column'}
          // direction='row'
          sx={{
            height: alignment === 'horizontal' ? 'auto' : '600px',
            width: alignment === 'horizontal' ? 'auto' : '100%',
            overflowX: 'auto'
          }}
          spacing={1}
          p={0.5}
        >
          {orders.length > 0 &&
            orders.map((order, index) => (
              <Box
                key={order.id}
                sx={{
                  minWidth: alignment === 'horizontal' ? '325px' : '100%'
                }}
              >
                <ActiveOrder
                  key={order.id}
                  order={order}
                  color={color}
                  index={index}
                />
              </Box>
            ))}
        </Stack>
      </Card>
    </>
  );
};
