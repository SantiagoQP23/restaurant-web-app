import { Typography, Grid } from '@mui/material';
import { TypeOrder } from '../../../../../../models';
import { OrderCard } from './OrderCard.component';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';

export const OrderList = () => {
  const { orders } = useSelector(selectOrders);

  return (
    <>
      {orders.length >= 1 ? (
        <>
          <Grid container my={2} spacing={1}>
            {orders.map((order) => (
              <Grid key={order.id} item xs={12} md={6} lg={4}>
                <OrderCard order={order} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant='h4'>No hay pedidos </Typography>
      )}
    </>
  );
};
