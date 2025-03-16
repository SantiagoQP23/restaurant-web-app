import { useState } from 'react';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { Order } from '../../../../../models/orders.model';
import {
  getOrdersToday,
  getOrdersByDate
} from '../../../Orders/services/orders.service';
import { useAsync } from '../../../../../hooks/useAsync';
import {
  Card,
  Box,
  CardContent,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { OrderSummaryCard } from './OrderSummaryCard.component';
import { useSnackbar } from 'notistack';

const formatDate = (newValue: Date | string) => {
  const date = format(new Date(newValue), 'yyyy-MM-dd', { locale: es });

  return date;
};

export const OrdersByDate = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [date, setDate] = useState<Date | null>(new Date());

  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = async (newValue: Date | null) => {
    if (newValue === null) {
      return;
    }

    const dateStr = formatDate(newValue);

    await callEndpoint(getOrdersByDate({ startDate: dateStr }))
      .then((resp) => {
        console.log('resp', resp.data);
        setOrders(resp.data);
      })
      .catch((err) => {
        enqueueSnackbar('Error al obtener los pedidos', { variant: 'error' });
      });

    setDate(newValue);
  };

  const getOrdersCall = async () => await callEndpoint(getOrdersByDate());

  const loadOrdersState = (data: Order[]) => {
    setOrders(data);
  };

  useAsync(getOrdersCall, loadOrdersState, () => {}, []);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h4' align='center'>
            Pedidos por día
          </Typography>

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <DesktopDatePicker
              label='Fecha'
              inputFormat='yyyy-MM-dd'
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              maxDate={new Date()}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              my: 2
            }}
          >
            <Typography variant='h5' align='center'>
              Cantidad: {orders.length}
            </Typography>
            <Typography variant='h5' align='center'>
              Ingreso: ${' '}
              {orders.reduce((acc, order) => acc + Number(order.total), 0)}
            </Typography>
          </Box>

          <Grid container spacing={1}>
            {orders.length === 0 ? (
              <Grid>
                <Typography variant='h6' align='center'>
                  No hay pedidos para esta fecha
                </Typography>
              </Grid>
            ) : (
              orders.map((order) => (
                <Grid key={order.id} item xs={12}>
                  <OrderSummaryCard order={order} />
                </Grid>
              ))
            )}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
