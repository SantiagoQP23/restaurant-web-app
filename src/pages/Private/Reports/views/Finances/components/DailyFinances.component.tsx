import { useEffect, useRef } from 'react';

import { Print } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Bar, Line } from 'react-chartjs-2';
import { Period, GroupBy } from '../../../../Common/dto/period.model';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import {
  FinanceResponse,
  getFinances
} from '../../../services/finances.service';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Label } from '../../../../../../components/ui';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { Chart as ChartJS } from 'chart.js';
import html2canvas from 'html2canvas';
import { generateFinancialsReportPdf } from '../../../helpers/pdf-financials-report';

export const DailyFinances = () => {
  const chartRef = useRef<ChartJS<'bar'>>(null);

  const filters = useDateFilter(Period.CUSTOM);

  const { startDate, handleChangeStartDate } = filters;

  const { data, isPending, refetch } = useQuery<FinanceResponse[]>({
    queryKey: ['financials'],
    queryFn: () => {
      return getFinances({
        period: Period.MONTHLY,
        startDate,
        // endDate: new Date(),
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
    labels: data && data?.map((finance) => finance.date),
    // labels: data && data?.map(finance => format(new Date(finance.date), 'eeee dd/MM/yyyy', { locale: es })),
    datasets: [
      {
        label: 'Ventas Diarias',
        data: data?.map((finance) => finance.income.total),
        // fill:false,
        backgroundColor: 'rgba(75, 192, 192, 0.8)'
        // tension: 0.4,
      },
      {
        label: 'Gastos Diarios',
        data: data?.map((finance) => finance.expense.total),
        backgroundColor: 'rgba(255, 99, 132, 0.8)'
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

  const handlePrint = async () => {
    if (!data) return;

    let urlImage = '';

    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current.canvas);

      urlImage = canvas.toDataURL('image/png');
    }

    const pdf = await generateFinancialsReportPdf(
      data,
      { ...filters, period: Period.MONTHLY },
      urlImage
    );

    pdf.open();
  };

  const balanceMonth = data?.reduce((acc, curr) => acc + curr.balance, 0);

  const totalIncomes = data?.reduce(
    (acc, curr) => acc + Number(curr.income.total),
    0
  );

  const totalExpenses = data?.reduce(
    (acc, curr) => acc + Number(curr.expense.total),
    0
  );

  useEffect(() => {
    refetch();
  }, [startDate]);

  return (
    <>
      <Stack direction='row' spacing={2} my={2}>
        <DatePicker
          views={['month', 'year']}
          label='Año'
          value={startDate}
          onChange={handleChangeStartDate}
          renderInput={(params) => <TextField {...params} />}
        />

        <Button variant='contained' startIcon={<Print />} onClick={handlePrint}>
          Imprimir
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Stack direction='column' spacing={2}>
            <Card>
              {data && (
                <Bar data={dataChart} options={options} ref={chartRef as any} />
              )}
            </Card>

            <Card>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Día</TableCell>
                      <TableCell>Ingresos</TableCell>
                      <TableCell>Gastos</TableCell>
                      <TableCell>Balance</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data?.map((day) => (
                      <TableRow key={day.date}>
                        {/* <TableCell>{format(new Date(day.date), 'eeee dd/MM/yyyy', { locale: es })}</TableCell> */}
                        <TableCell>{day.date}</TableCell>
                        <TableCell>
                          <Label color='success'>
                            +{formatMoney(Number(day.income.total))}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Label color='error'>
                            -{formatMoney(Number(day.expense.total))}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Label color={day.balance > 0 ? 'success' : 'error'}>
                            {formatMoney(day.balance)}
                          </Label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack direction='column' spacing={2}>
            <Card>
              <CardHeader title='Balance' />

              <CardContent
                sx={{
                  display: 'flex',
                  gap: 1,

                  alignItems: 'center'
                }}
              >
                <Typography
                  variant='h3'
                  color={
                    balanceMonth && balanceMonth > 0
                      ? 'success.main'
                      : 'error.main'
                  }
                >
                  {formatMoney(balanceMonth || 0)}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title='Ingresos' />

              <CardContent
                sx={{
                  display: 'flex',
                  gap: 1,

                  alignItems: 'center'
                }}
              >
                <Typography variant='h3' color='success.main'>
                  {formatMoney(Number(totalIncomes))}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title='Gastos' />

              <CardContent
                sx={{
                  display: 'flex',
                  gap: 1,

                  alignItems: 'center'
                }}
              >
                <Typography variant='h3' color='error.main'>
                  {formatMoney(Number(totalExpenses))}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
