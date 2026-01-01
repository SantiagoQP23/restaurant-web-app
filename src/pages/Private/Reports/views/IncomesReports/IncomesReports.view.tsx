import { useState, useEffect } from 'react';

import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import {
  getOrdersEachDate,
  getIncomes,
  getIncomesDate
} from '../../services/dashboard.service';
import { DateIncome } from '../../models/date-orders.interface';
import { useAsync } from '../../../../../hooks/useAsync';
import { ArrowBack, Download, PictureAsPdf } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Box,
  Button,
  Typography,
  Stack,
  CardContent,
  Card,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFIncomesReports } from './pdf/PDFIncomesReports.component';
import { CardIncomesByUser } from './components/CardIncomesByUser.component';
import { usePaginationAsync } from '../../../../../hooks/usePaginationAsync';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
import { Period } from '../../../Common/dto/period.model';
import { TitlePage } from '../../../components/TitlePage.component';
import { useDateFilter } from '../../../../../hooks/useDateFilter';

export const IncomesReports = () => {
  const {
    period,
    startDate,
    endDate,
    endDateChecked,
    handleChangeEndDate,
    handleChangeEndDateChecked,
    handleChangePeriod,
    handleChangeStartDate
  } = useDateFilter(Period.WEEKLY);

  const {
    page,
    nextPage,
    prevPage,
    rowsPerPage,

    handleChangePage,
    handleChangeRowsPerPage
  } = usePaginationAsync();

  // const { data, isFetching, refetch, isPending } = useQuery<DateIncome[]>(['incomes', { period, startDate, endDate, offset: page, limit: rowsPerPage }], () => {
  //   return getIncomesDate({ period, startDate, endDate: endDateChecked ? endDate : null, offset: page, limit: rowsPerPage })
  // })

  const navigate = useNavigate();

  // const dataChart = {
  //   labels: data?.map(date => format(new Date(date.date), 'dd/MM/yyyy')),
  //   datasets: [
  //     {
  //       data: data?.map(date => date.total),
  //       label: "Ingreso ($)",
  //       borderColor: "#3e95cd",
  //       fill: false,
  //       backgroundColor: "#3e95cd",

  //     },

  //   ]
  // }

  // const options = {
  //   plugins: {

  //     legend: {
  //       position: 'top' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: 'Pedidos por día'
  //     }
  //   }
  // };

  // useEffect(() => {
  //   refetch()
  // }, [period, startDate, endDate, endDateChecked, page, rowsPerPage])

  return (
    <>
      {/* <TitlePage

        title="Ingresos"
        action={
          <PDFDownloadLink
            document={<PDFIncomesReports dates={data || []} />}
            fileName="reporte-ingresos.pdf"
          >
            <Button variant="contained" >
              Descargar PDF
            </Button>

          </PDFDownloadLink>

        }
      />
       */}

      <Grid container spacing={1}>
        {/* <Grid item xs={12} md={6}>

          <CardIncomesByUser />
        </Grid>

        <Grid item xs={12} md={6}>

          <Card>
            <CardHeader
              title={'Ingresos por día'}
              action={
                <Stack>
                  <PDFDownloadLink
                    document={<PDFIncomesReports dates={data || []} />}
                    fileName="reporte-ingresos.pdf"
                  >

                    <IconButton>
                      <Download />
                    </IconButton>

                  </PDFDownloadLink>
                </Stack>
              }

            />


            <Stack
              direction={{ xs: 'column' }}
              spacing={2}

              p={2}

            >
              <FormControl>
                <InputLabel id="select-period-label">Periodo</InputLabel>
                <Select
                  labelId="select-period-label"

                  value={period}
                  onChange={handleChangePeriod}
                  fullWidth
                  label="Periodo"
                >
                  <MenuItem value='today'>Hoy</MenuItem>
                  <MenuItem value='week'>Esta semana</MenuItem>
                  <MenuItem value='month'>Este mes</MenuItem>
                  <MenuItem value='year'>Este Año</MenuItem>
                  <MenuItem value='custom'>Personalizado</MenuItem>


                </Select>
              </FormControl>

              {

                period === 'custom' && <>
                  <Stack direction='column'>

                    <DesktopDatePicker
                      label="Fecha de inicio"
                      inputFormat="yyyy-MM-dd"
                      value={startDate}
                      onChange={handleChangeStartDate}
                      renderInput={(params) => <TextField {...params} />}
                      disableFuture
                      maxDate={endDate ? endDate : undefined}

                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={endDateChecked}
                          onChange={handleChangeEndDateChecked}
                        />

                      }
                      label='Fecha de fin'
                    />

                    {



                      startDate && endDateChecked &&

                      <DesktopDatePicker
                        label="Fecha de fin"
                        inputFormat="yyyy-MM-dd"
                        value={endDate}
                        onChange={handleChangeEndDate}
                        renderInput={(params) => <TextField {...params} />}
                        minDate={startDate}
                        disableFuture

                      />
                    }


                  </Stack>

                </>
              }


            </Stack>

            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Fecha</Typography>
                <Typography variant="h5" >
                  Total
                </Typography>
              </Box>
              {

                isLoading || isFetching
                  ? <Typography variant='h6' align='center' my={2}>
                    <CircularProgress />
                  </Typography>
                  :
                  data &&
                    data.length === 0
                    ? <Typography variant='h6' align='center' my={2}>No hay datos</Typography>
                    :
                    data?.map(date => (
                      <Box key={date.date} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                        <Typography variant="h6">{format(new Date(date.date), 'EEEE dd MMMM yyyy', { locale: es })}</Typography>
                        <Typography variant="h5">$ {date.total}</Typography>
                      </Box>
                    ))
              }
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Total</Typography>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                  ${data?.reduce((acc, date) => acc + date.total, 0)}
                </Typography>
              </Box>
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={12} md={8}>

          <Card>
            <CardHeader title={'Ingresos por día'} />
            <CardContent>
              <Bar data={dataChart} options={options} />

            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </>
  );
};
