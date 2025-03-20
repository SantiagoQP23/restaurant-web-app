import { DatePicker } from '@mui/x-date-pickers';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import { GroupBy, Period } from '../../../../Common/dto/period.model';
import { PeopleOutline, PersonOutline, Print } from '@mui/icons-material';
import {
  TextField,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Box
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material/';
import { useSimulatedFootfall } from '../../../hooks/useFootfall';
import { parseISO } from 'date-fns';
import { useRef } from 'react';
import { Chart as ChartJS } from 'chart.js';
import { generateFootfallSimulationReport } from '../../../helpers/pdf-footfall-simulation-report.helper';
import html2canvas from 'html2canvas';

export const MonthlyFootfall = () => {
  const chartRef = useRef<ChartJS>(null);

  const filters = useSimulatedFootfall(Period.YEARLY, GroupBy.MONTH);

  const { startDate, handleChangeStartDate, simulatedFootfallQuery } = filters;

  const dataChart = {
    labels: simulatedFootfallQuery.data?.footfall.map(
      (footfall) => footfall.date
    ),
    datasets: [
      {
        label: 'Afluencia',
        data: simulatedFootfallQuery.data?.footfall.map(
          (footfall) => footfall.quantity
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.8)' // Color para los ingresos
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
    let urlImage = '';

    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current.canvas);

      urlImage = canvas.toDataURL('image/png');
    }

    if (!simulatedFootfallQuery.data) return;

    const pdf = await generateFootfallSimulationReport(
      simulatedFootfallQuery.data,
      filters,
      urlImage
    );

    pdf.open();
  };

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
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader title='Asistencia por mes' />
            <CardContent>
              <Box>
                {simulatedFootfallQuery.data && (
                  <Line data={dataChart} options={options} ref={chartRef} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Resumen' />

            <List>
              <ListItem>
                <ListItemText primary='Afluencia Promedio' />
                <ListItemSecondaryAction>
                  <Chip
                    variant='outlined'
                    color='default'
                    label={
                      <>
                        <Typography
                          fontSize={12}
                          display='flex'
                          alignItems='center'
                        >
                          <PeopleOutline />
                          {simulatedFootfallQuery.data?.average} personas
                        </Typography>
                      </>
                    }
                    size='small'
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary='Afluencia Máxima' secondary='0' />
                <ListItemSecondaryAction>
                  <Chip
                    variant='outlined'
                    color='default'
                    label={
                      <>
                        <Typography
                          fontSize={12}
                          display='flex'
                          alignItems='center'
                        >
                          <PeopleOutline />
                          {simulatedFootfallQuery.data?.max}
                        </Typography>
                      </>
                    }
                    size='small'
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemText primary='Afluencia Mínima' secondary='0' />
                <ListItemSecondaryAction>
                  <Chip
                    variant='outlined'
                    color='default'
                    label={
                      <>
                        <Typography
                          fontSize={12}
                          display='flex'
                          alignItems='center'
                        >
                          <PeopleOutline />
                          {simulatedFootfallQuery.data?.min}
                        </Typography>
                      </>
                    }
                    size='small'
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title='Meses'
              titleTypographyProps={{ variant: 'h4' }}
            />

            <List>
              {simulatedFootfallQuery.data?.footfall.map((footfall) => (
                <>
                  <ListItem key={`${footfall.date}`}>
                    <ListItemText primary={`${footfall.date}`} />

                    <ListItemSecondaryAction>
                      <Chip
                        variant='outlined'
                        color='default'
                        label={
                          <>
                            <Typography display='flex' alignItems='center'>
                              {/* <PeopleOutline /> */}
                              {footfall.quantity} personas
                            </Typography>
                          </>
                        }
                        size='small'
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
