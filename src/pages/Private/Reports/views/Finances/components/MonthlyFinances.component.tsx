import { useEffect, useRef } from 'react';

import { Print } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Stack,
  Button,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
import { endOfYear, startOfWeek } from 'date-fns';
import { Bar } from 'react-chartjs-2';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import {
  FinanceResponse,
  getFinances
} from '../../../services/finances.service';
import { Period, GroupBy } from '../../../../Common/dto/period.model';
import { Chart as ChartJS } from 'chart.js';
import html2canvas from 'html2canvas';
import { generateFinancialsReportPdf } from '../../../helpers/pdf-financials-report';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { Label } from '../../../../../../components/ui';

export const MonthlyFinances = () => {
  const chartRef = useRef<ChartJS<'bar'>>(null);

  const filters = useDateFilter(Period.YEARLY);

  const { startDate, handleChangeStartDate, endDate } = filters;

  const { data, isPending, refetch } = useQuery<FinanceResponse[]>({
    queryKey: ['financials'],
    queryFn: () => {
      return getFinances({
        period: Period.YEARLY,
        startDate,
        endDate: endDate,
        groupBy: GroupBy.MONTH
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
    datasets: [
      {
        label: 'Ingresos',
        data: data?.map((finance) => finance.income.total),
        backgroundColor: 'rgba(75, 192, 192, 0.8)' // Color para los ingresos
      },
      {
        label: 'Gastos',
        data: data?.map((finance) => finance.expense.total),
        backgroundColor: 'rgba(255, 99, 132, 0.8)' // Color para los gastos
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
      { ...filters, period: Period.YEARLY },
      urlImage
    );

    pdf.open();
  };

  const balanceYear = data?.reduce((acc, month) => acc + month.balance, 0);

  const totalIncomes = data?.reduce(
    (acc, month) => acc + Number(month.income.total),
    0
  );

  const totalExpenses = data?.reduce(
    (acc, month) => acc + Number(month.expense.total),
    0
  );

  useEffect(() => {
    refetch();
  }, [startDate]);

  return (
    <>
      <Stack direction='row' spacing={2} my={2}>
        <DatePicker
          views={['year']}
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
          <Stack spacing={2}>
            <Card>
              <Box height={300} display='flex' justifyContent='center'>
                {data && (
                  <Bar
                    data={dataChart}
                    options={options}
                    ref={chartRef as any}
                  />
                )}
              </Box>
            </Card>

            <Card>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Mes</TableCell>
                      <TableCell>Ingresos</TableCell>
                      <TableCell>Gastos</TableCell>
                      <TableCell>Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((month) => (
                      <TableRow key={month.date}>
                        <TableCell>{month.date}</TableCell>
                        <TableCell>
                          <Label color='success'>
                            +{formatMoney(Number(month.income.total))}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Label color='error'>
                            -{formatMoney(Number(month.expense.total))}
                          </Label>
                        </TableCell>
                        <TableCell>
                          <Label
                            color={month.balance > 0 ? 'success' : 'error'}
                          >
                            {formatMoney(month.balance)}
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
                    balanceYear && balanceYear > 0
                      ? 'success.main'
                      : 'error.main'
                  }
                >
                  {formatMoney(balanceYear || 0)}
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
