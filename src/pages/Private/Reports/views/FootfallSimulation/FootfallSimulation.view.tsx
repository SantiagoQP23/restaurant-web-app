import { Bar, Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Legend,
  Tooltip,
  BarElement
} from 'chart.js';
import {
  Card,
  Grid,
  MenuItem,
  Select,
  CardHeader,
  CardContent,
  Button,
  Box,
  Stack,
  CircularProgress,
  CardActions,
  Tab,
  Tabs
} from '@mui/material';
import { Typography, SelectChangeEvent } from '@mui/material/';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { useDispatch, useSelector } from 'react-redux';
import { executeSeed, getFootfall } from '../../services/footfall.service';
import { useState } from 'react';
import { IDay } from '../../models/day.interface';
import { useAsync } from '../../../../../hooks/useAsync';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AffluenceMonth } from './components/AffluenceMonth.component';
import { useEffect } from 'react';
import { Day } from '../../components/Day.component';
import { ArrowBack, DisplaySettings, Update } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PdfFootfallSimulation } from './pdf/PdfFootfallSimulation.component';
import { TitlePage } from '../../../components/TitlePage.component';
import { useQuery } from '@tanstack/react-query';
import { selectAuth } from '../../../../../redux';
import { useSeed } from '../../hooks/useSeed';
import { useSimulation } from '../../hooks/useSimulation';
import { useFootfall } from '../../hooks/useFootfall';
import { ChartSimulatedFootfall } from './components';
import { RestaurantInformation } from '../SimulatorForms/components';
import { MonthlyFootfall } from './components/MonthlyFootfall.component';
import { DailyFootfall } from './components/DailyFootfall.component';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  BarElement
);

export const months = [
  {
    value: 0,
    label: 'Enero'
  },
  {
    value: 1,
    label: 'Febrero'
  },
  {
    value: 2,
    label: 'Marzo'
  },
  {
    value: 3,
    label: 'Abril'
  },
  {
    value: 4,
    label: 'Mayo'
  },
  {
    value: 5,
    label: 'Junio'
  },
  {
    value: 6,
    label: 'Julio'
  },
  {
    value: 7,
    label: 'Agosto'
  },
  {
    value: 8,
    label: 'Septiembre'
  },
  {
    value: 9,
    label: 'Octubre'
  },
  {
    value: 10,
    label: 'Noviembre'
  },
  {
    value: 11,
    label: 'Diciembre'
  }
];

export const years = [
  {
    value: 2022,
    label: '2022'
  },
  {
    value: 2023,
    label: '2023'
  }
];

//TODO Voy a asumir que la aplicación ya ejecutó el seed

enum TabPanel {
  RESUMEN_ANUAL = 0,
  RESUMEN_MENSUAL = 1
}

export const FootFallSimulation = () => {
  const [tab, setTab] = useState(TabPanel.RESUMEN_ANUAL);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TabPanel) => {
    setTab(newValue);
  };

  const simulationQuery = useSimulation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const executeSimulation = () => {
    simulationQuery.refetch();
  };

  const executeSeed = () => {};

  return (
    <>
      <TitlePage
        title='Simulación de afluencia'
        action={
          <>
            <Stack direction='row' spacing={1}>
              <Button
                variant='outlined'
                onClick={() => navigate('simulator')}
                startIcon={<DisplaySettings />}
              >
                Reglas de simulación
              </Button>
              <LoadingButton
                variant='contained'
                startIcon={<Update />}
                onClick={() => executeSimulation()}
                loading={simulationQuery.isFetching}
              >
                Actualizar
              </LoadingButton>
            </Stack>
          </>
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <RestaurantInformation />
        </Grid>
        <Grid item xs={12} md={9}>
          {
            // !(restaurant?.lastSimulationUpdate)
            false ? (
              <>
                <Card>
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant='h4' align='center' my={5}>
                      No se ha realizado ninguna simulación
                    </Typography>

                    <Button variant='contained' onClick={() => executeSeed()}>
                      Iniciar simulación
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  sx={{
                    mb: 2
                  }}
                >
                  <Tab label='Resumen anual' value={TabPanel.RESUMEN_ANUAL} />
                  <Tab
                    label='Resumen mensual'
                    value={TabPanel.RESUMEN_MENSUAL}
                  />
                </Tabs>

                {tab === TabPanel.RESUMEN_ANUAL ? (
                  <MonthlyFootfall />
                ) : (
                  <DailyFootfall />
                )}
              </>
            )
          }
        </Grid>
      </Grid>

      {/* {
  footfalls?.length === 0 ?
    <>
      <Typography variant='h6' align='center' mt={2}>
        No hay datos de simulación
      </Typography>

    </>

    : (
      <>
        <ChartSimulatedFootfall footfalls={footfalls || []} />
      </>
    )

} */}

      {
        // days.length > 0 &&
        // <PDFDownloadLink
        //   document={<PdfFootfallSimulation days={days} />}
        //   fileName="simulacion-afluencia-completa.pdf"
        // >
        //   <Button variant='outlined' >
        //     Exportar a PDF
        //   </Button>
        // </PDFDownloadLink>
      }

      {/* <Card>

        <CardHeader
          title='Filtros'
        />

        <CardActions>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Select
                labelId="select-seccion"
                label="Tipo de identificación"
                fullWidth
                margin='dense'
                value={year}
                onChange={(e) => onChangeYear(e)}
                size="small"
              >

                {years.map(year => (
                  <MenuItem key={year.value} value={year.value}>
                    {year.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={3}>
              <Select
                labelId="select-seccion"
                label="Tipo de identificación"
                fullWidth
                margin='dense'
                value={month}
                onChange={(e) => onChangeMonth(e)}
                size="small"
              >

                {months.map(month => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>

            </Grid>
          </Grid>
        </CardActions>
      </Card> */}

      <Grid container spacing={2} mt={2}>
        {/* <Grid item xs={12} md={4}>
  <Day />

</Grid> */}

        {/* <Grid container item xs={12} md={12} spacing={1} sx={{ display: 'flex', alignContent: 'start' }}>


          <Grid container spacing={2}>
            <Grid item xs={12}>

              <Card>
                <CardHeader title={
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>
                        Afluencia del mes {months[month].label} {year}
                      </Typography>

                      <PDFDownloadLink
                        document={<PdfFootfallSimulation days={daysFiltered.filter(day => new Date(day.date).getMonth() === month)} month={months[month].label} />}
                        fileName={`simulacion-afluencia-${months[month].label}.pdf`}
                      >
                        <Button variant='outlined' >

                          Exportar a PDF
                        </Button>

                      </PDFDownloadLink>


                    </Box>

                  </>

                } />
                <CardContent>
                  {
                    days.length > 0
                      ? <Line data={dataMonth} ></Line>
                      : <CircularProgress />

                  }

                </CardContent>

              </Card>
            </Grid>


          </Grid>
        </Grid> */}

        {/* <Grid container item xs={12} spacing={1}
          sx={{
            display: 'flex',
            alignContent: 'start',
            alignItems: 'top',
            justifyItems: 'top',
          }}
        >
          {
            months.map(month => {
              const days = daysFiltered.filter(day => new Date(day.date).getMonth() === month.value)

              let count = 0;

              days.forEach(day => {
                count += day.affluences[0].affluence
              })

              if (count === 0) return null;

              return (
                <Grid key={month.value} item xs={12} md={2}>
                  <AffluenceMonth month={month.label} affluence={count} />

                </Grid>
              )


            }
            )}
        </Grid> */}
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};
