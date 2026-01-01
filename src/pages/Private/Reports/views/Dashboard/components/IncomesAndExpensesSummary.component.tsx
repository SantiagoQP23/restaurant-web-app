import { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
  Box,
  Button
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { NavLink as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  FinanceResponse,
  getFinances
} from '../../../services/finances.service';
import { GroupBy, Period } from '../../../../Common/dto/period.model';
import { startOfWeek } from 'date-fns';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';

export const IncomesAndExpensesSummary = () => {
  const { data, isPending } = useQuery<FinanceResponse[]>({
    queryKey: ['financials'],
    queryFn: () => {
      return getFinances({
        period: Period.CUSTOM,
        startDate: startOfWeek(new Date()),
        endDate: new Date(),
        groupBy: GroupBy.DAY
      });
    }
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const dataChart = {
    labels: data?.map((finance) => finance.date),
    // labels: data?.map(finance => format(new Date(finance.date), 'eeee dd/MM/yyyy', { locale: es })),
    datasets: [
      {
        label: 'Ingresos',
        data: data?.map((finance) => finance.income.total),
        backgroundColor: 'rgba(75, 192, 192, 1)', // Color sólido
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4
      },
      {
        label: 'Gastos',
        data: data?.map((finance) => finance.expense.total),
        backgroundColor: 'rgba(255, 99, 132, 1)', // Color sólido
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        tension: 0.4
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const totalIncomes =
    data?.reduce((acc, day) => Number(day.income.total) + acc, 0) || 0;

  const totalExpenses =
    data?.reduce((acc, day) => Number(day.expense.total) + acc, 0) || 0;

  const balance = totalIncomes - totalExpenses;

  return (
    <Card>
      <CardHeader
        title='Finanzas'
        action={
          <Button
            variant='outlined'
            component={RouterLink}
            to='finances'
            size='small'
          >
            Ver todo
          </Button>
        }
      />
      <CardContent>
        <Box>{data && <Bar data={dataChart} options={options} />}</Box>

        <Stack
          mt={2}
          spacing={5}
          // divider={<Divider orientation='vertical'/>}
          direction='row'
          justifyContent='center'
          textAlign='center'
        >
          <Box>
            <Typography variant='caption'>Ventas</Typography>
            <Typography variant='h4' color='success.main'>
              {formatMoney(totalIncomes)}
            </Typography>
          </Box>

          <Box>
            <Typography variant='caption'>Gastos</Typography>
            <Typography variant='h4' color='error.main'>
              {formatMoney(totalExpenses)}
            </Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Balance</Typography>
            <Typography
              variant='h4'
              color={balance >= 0 ? 'success.main' : 'error.main'}
            >
              {formatMoney(balance)}
            </Typography>
          </Box>
        </Stack>

        {/* <Grid container spacing={1} mt={2}>
          <Grid item xs={6} >


            <Typography variant='h3' textAlign='center' color='success.main'>
              $ {data?.reduce((acc, day) => Number(day.income.total) + acc, 0)}
              </Typography>
            <Typography variant='subtitle2' textAlign='center'>Ingresos</Typography>

          </Grid>

          <Grid item xs={6} >

            <Typography variant='h3' textAlign='center' color='error.main'>
              $ {data?.reduce((acc, day) => Number(day.expense.total) + acc, 0)}
              </Typography>
            <Typography variant='subtitle2' textAlign='center'>Gastos</Typography>

          </Grid>

          <Grid item xs={12} >

            <Typography variant='subtitle1' textAlign='center'>Balance</Typography>

            <Typography variant='h3' textAlign='center' color={true ? 'success.main' : 'error.main'}> {formatMoney(data?.reduce((acc, day) => day.balance + acc, 0) || 0)}</Typography>



          </Grid>
        </Grid> */}
      </CardContent>
    </Card>
  );
};
