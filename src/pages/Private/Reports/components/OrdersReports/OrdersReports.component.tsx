import { useState } from 'react';

import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { getOrdersEachDate } from '../../services/dashboard.service';
import { DateOrders } from '../../models/date-orders.interface';
import { useAsync } from '../../../../../hooks/useAsync';
import { ArrowBack } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Box,
  Button,
  Typography,
  Stack,
  CardContent,
  Card,
  CardHeader
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { OrdersByDate } from './OrdersByDate.component';

export const OrdersReports = () => {
  const navigate = useNavigate();

  const { loading, callEndpoint } = useFetchAndLoad();

  const [datesOrders, setDatesOrders] = useState<DateOrders[]>([]);

  // const getDatesOrdersCall = async () => await callEndpoint(getOrdersEachDate())

  const loadDatesOrdersState = (data: DateOrders[]) => {
    setDatesOrders(data);
  };

  // useAsync(getDatesOrdersCall, loadDatesOrdersState, () => { }, []);

  const data = {
    labels: datesOrders.map((date) =>
      format(new Date(date.date), 'dd/MM/yyyy')
    ),
    datasets: [
      {
        data: datesOrders.map((date) => date.count),
        label: 'Pedidos',
        borderColor: '#3e95cd',
        fill: false,
        backgroundColor: '#3e95cd'
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Pedidos por día'
      }
    }
  };

  return (
    <>
      <Grid
        container
        display='flex'
        justifyContent='space-between'
        mb={2}
        alignItems='center'
      >
        <Box sx={{ display: 'flex' }}>
          <Button
            onClick={() => {
              navigate('/reports');
            }}
          >
            <ArrowBack />
          </Button>
          <Typography variant='h3'>Pedidos</Typography>
        </Box>

        <Box>
          {/* <Stack direction="row" spacing={2}>

           
            <LoadingButton variant="contained" loading={loading} >
              Actualizar Predicción
            </LoadingButton>

            

          </Stack> */}
        </Box>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <OrdersByDate />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={'Cantidad de Pedidos por día'} />
            <CardContent>
              <Bar data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
