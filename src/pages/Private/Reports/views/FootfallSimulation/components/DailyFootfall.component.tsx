import { Print, PeopleOutline } from '@mui/icons-material';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Typography,
  Stack
} from '@mui/material';
import { useDateFilter } from '../../../../../../hooks/useDateFilter';
import { GroupBy, Period } from '../../../../Common/dto/period.model';
import { DatePicker } from '@mui/x-date-pickers';
import { useSimulatedFootfall } from '../../../hooks/useFootfall';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRef } from 'react';
import { Chart as ChartJS } from 'chart.js';
import html2canvas from 'html2canvas';
import { generateFootfallSimulationReport } from '../../../helpers/pdf-footfall-simulation-report.helper';

export const DailyFootfall = () => {
  const chartRef = useRef<ChartJS>(null);

  const filters = useSimulatedFootfall(Period.MONTHLY, GroupBy.DAY);

  const { startDate, handleChangeStartDate, simulatedFootfallQuery } = filters;

  const dataChart = {
    labels: simulatedFootfallQuery.data?.footfall.map((footfall) =>
      format(new Date(footfall.date), 'eeee dd/MM', { locale: es })
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
          views={['month', 'year']}
          label='Mes'
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
            <CardHeader title='Asistencia por día' />
            <CardContent>
              <Line data={dataChart} options={options} ref={chartRef} />
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
            <CardHeader title='Días' titleTypographyProps={{ variant: 'h4' }} />

            <List>
              {simulatedFootfallQuery.data?.footfall.map((footfall) => (
                <>
                  <ListItem key={`${footfall.date}`}>
                    <ListItemText
                      primary={format(new Date(footfall.date), 'eeee dd/MM', {
                        locale: es
                      })}
                    />

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
