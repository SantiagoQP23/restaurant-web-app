import { Timeline } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider
} from '@mui/material';
import { Line } from 'react-chartjs-2';

import { NavLink as RouterLink } from 'react-router-dom';
// TODO: Missing hook - needs to be created
// import { useForecastFootfall } from '../../../hooks/useFootfall';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const PredictionAffluenceSummary = () => {
  // TODO: Uncomment when useFootfall hook is created
  // const { isPending, data } = useForecastFootfall();
  const isPending = false;
  const data: any[] = [];

  const dataChart = {
    labels: data
      ?.slice(0, 7)
      .map((day) => format(new Date(day.date), 'eeee', { locale: es })),
    datasets: [
      {
        label: 'Afluencia',
        data: data?.slice(0, 7).map((day) => Number(day.quantity)),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      // x: {
      //   display: false,
      // }
      // ,

      y: {
        display: false,
        beginAtZero: true
      }
    }
  };

  return (
    <Card>
      <CardHeader
        // avatar={<Timeline color='success' sx={{ fontSize: 40 }} />}
        title={<Typography variant='h4'>Predicción de afluencia</Typography>}
        subheader='Asistencia de clientes en la semana'
        action={
          <Button
            disableRipple
            to='prediction'
            component={RouterLink}
            variant='outlined'
            color='success'
            size='small'
          >
            Ver más
          </Button>
        }
      />

      <CardContent>
        <Line data={dataChart} options={options} />
      </CardContent>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={1}>
        {data?.slice(0, 7).map((day) => (
          <Grid item xs={3}>
            <Typography variant='h4' align='center'>
              {day.quantity}
            </Typography>
            <Typography variant='h6' align='center'>
              {format(new Date(day.date), 'EEEE', { locale: es })}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <CardActions
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      ></CardActions>
    </Card>
  );
};
