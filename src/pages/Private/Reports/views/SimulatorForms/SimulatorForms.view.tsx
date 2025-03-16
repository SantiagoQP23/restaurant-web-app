import { useState } from 'react';

import { ArrowBack, Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Box,
  Stack,
  Button,
  Typography,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  TextField,
  CardActions,
  Tab,
  Tabs
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks/useFetchAndLoad';
import { useSnackbar } from 'notistack';
import {
  DaysRules,
  Holidays,
  HolidaysRules,
  ModalDeleteHoliday,
  ModalHoliday,
  RestaurantInformation,
  WeatherRules,
  WeekRules
} from './components';

import {
  SimulationProvider,
  SimulationContext
} from '../../context/SimulationContext';
import { useContext } from 'react';
import { useSeed } from '../../hooks/useSeed';
import { useSimulation } from '../../hooks/useSimulation';
import { TitlePage } from '../../../components/TitlePage.component';
import { Label } from '../../../../../components/ui';
import { MonthRules } from './components/MonthRules.component';

enum ViewRule {
  DAYS = 'DAYS',
  WEATHER = 'WEATHER',
  WEEK = 'WEEK',
  HOLIDAYS = 'HOLIDAYS',
  MONTH = 'MONTH'
}

//TODO Voy a asumir que la aplicación ya ejecutó el seed

export const SimulatorForms = () => {
  const simulationQuery = useSimulation();

  const [tabView, setTabView] = useState<ViewRule>(ViewRule.DAYS);

  const navigate = useNavigate();

  const { loadHolidays } = useContext(SimulationContext);

  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const seedQuery = useSeed();

  const executeSeed = async () => {
    await seedQuery.refetch().then(() => {
      navigate('/reports/simulator');
    });
  };

  // const submitUpdateSimulation = async () => {
  //   await callEndpoint(updateSimulationAffluence())
  //     .then(async () => {
  //       enqueueSnackbar('Simulación actualizada', { variant: 'success' });

  //     })
  //     .catch(() => {
  //       enqueueSnackbar('Error al actualizar la simulación', { variant: 'error' });

  //     })

  // }

  // const getHolidaysCall = async () => await callEndpoint(getHolidays());

  // const loadHolidaysState = (data: Holiday[]) => { loadHolidays(data) };

  // useAsync(getHolidaysCall, loadHolidaysState, () => { }, []);

  return (
    <>
      <TitlePage
        title='Simulador de afluencia'
        action={
          <LoadingButton
            loading={loading}
            variant='contained'
            onClick={executeSeed}
          >
            Actualizar simulación
          </LoadingButton>
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <RestaurantInformation />
        </Grid>

        <Grid item xs={12} md={9} spacing={1}>
          <Tabs
            value={tabView}
            onChange={(e, value) => setTabView(value)}
            sx={{
              mb: 2
            }}
          >
            <Tab label='Días' value={ViewRule.DAYS} />
            <Tab label='Semana' value={ViewRule.WEEK} />

            <Tab label='Mes' value={ViewRule.MONTH} />

            <Tab label='Clima' value={ViewRule.WEATHER} />

            <Tab label='Feriados' value={ViewRule.HOLIDAYS} />
          </Tabs>

          {tabView === ViewRule.DAYS && <DaysRules />}

          {tabView === ViewRule.WEATHER && <WeatherRules />}

          {tabView === ViewRule.WEEK && <WeekRules />}

          {tabView === ViewRule.HOLIDAYS && (
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12} md={6}>
                <HolidaysRules />
              </Grid>
              <Grid item xs={12} md={6}>
                <Holidays />
              </Grid>
            </Grid>
          )}

          {tabView === ViewRule.MONTH && <MonthRules />}

          {/* <Grid container spacing={1}>

            <Grid item xs={12}  >
              <DaysRules />
            </Grid>
            <Grid item xs={12} >
              <WeatherRules />
            </Grid>
            <Grid item xs={12}  >
              <WeekRules />

            </Grid>

            <Grid item xs={12}  >

              <Typography variant="h4" my={2}>Reglas del mes</Typography>

              <Grid container spacing={1}>


                <Grid item xs={12} md={4} xl={3}>

                  <Card>
                    <CardHeader

                      action={
                        <>
                          <Label color="info"> 1 </Label>
                        </>
                      }

                      title='Enero'
                      titleTypographyProps={{ variant: 'h4' }}


                    // subheader="2.2"
                    />

                    <CardContent>
                      <TextField
                        type="number"
                        fullWidth

                        inputProps={{
                          step: 0.1,
                        }}
                        label="Valor"
                      />
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'right' }}>
                      <Button
                        variant="outlined"
                        size="small"
                      >
                        Actualizar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>

      <ModalHoliday />
      <ModalDeleteHoliday />
    </>
  );
};
