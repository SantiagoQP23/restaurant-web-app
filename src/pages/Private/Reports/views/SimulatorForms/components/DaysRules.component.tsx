import {
  CardHeader,
  CardContent,
  Card,
  Typography,
  TextField,
  FormControl,
  Grid,
  CircularProgress,
  Box
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { UpdateRuleDayDto } from '../../FootfallSimulation/dto/update-rule-day.dto';
import { useAsync } from '../../../../../../hooks/useAsync';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { DoneOutline, DoneOutlined } from '@mui/icons-material';
import { RuleDay } from '../../../models/rule-day.model';
import {
  updateRuleDay,
  updateRulesDay,
  getRulesDay
} from '../../../services/rules.service';

enum DayOrder {
  'Sunday' = 0,
  'Monday' = 1,
  'Tuesday' = 2,
  'Wednesday' = 3,
  'Thursday' = 4,
  'Friday' = 5,
  'Saturday' = 6
}

enum DayNameSpanish {
  'Sunday' = 'Domingo',
  'Monday' = 'Lunes',
  'Tuesday' = 'Martes',
  'Wednesday' = 'Miércoles',
  'Thursday' = 'Jueves',
  'Friday' = 'Viernes',
  'Saturday' = 'Sábado'
}

const Day = ({
  dayToUpdate,
  label
}: {
  dayToUpdate: RuleDay;
  label: string;
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const { loading, callEndpoint } = useFetchAndLoad();

  const [day, setDay] = useState<RuleDay>(dayToUpdate);
  const [value, setValue] = useState(dayToUpdate.value);

  const onSubmit = async () => {
    await callEndpoint(
      updateRuleDay({
        id: day.id,
        value
      })
    )
      .then((resp) => {
        enqueueSnackbar('Regla actualizada', { variant: 'success' });
        console.log(resp.data);
        setDay(resp.data);
        setValue(resp.data.value);
      })
      .catch(() => {
        enqueueSnackbar('Error al actualizar la regla', { variant: 'error' });
      });
  };

  return (
    <>
      <Card>
        <CardHeader title={label} />

        {/* <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>{label}</Typography> */}

        <CardContent>
          <Box display='flex'>
            <TextField
              type='number'
              fullWidth
              required
              value={value}
              onChange={(e) => {
                setValue(Number(e.target.value));
              }}
              inputProps={{
                step: 0.05
              }}
              size='small'
            />
            {value !== day.value && (
              <LoadingButton loading={loading} onClick={onSubmit}>
                <DoneOutlined />
              </LoadingButton>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export const DaysRules = () => {
  const [days, setDays] = useState<RuleDay[]>([]);
  const [daysInit, setDaysInit] = useState<RuleDay[]>([]);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const { loading, callEndpoint } = useFetchAndLoad();

  const onSubmit = async () => {
    const daysToUpdate: UpdateRuleDayDto[] = days.map((day, index) => {
      return {
        id: day.id,
        value: day.value
      };
    });

    await callEndpoint(updateRulesDay(daysToUpdate))
      .then(() => {
        enqueueSnackbar('Reglas actualizadas', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Error al actualizar las reglas', { variant: 'error' });
      });
  };

  const verifyBtnDisabled = () => {
    const isDisabled = days.find(
      (day, index) => day.value !== daysInit[index].value
    )
      ? true
      : false;
    console.log({ isDisabled });
    setBtnDisabled(isDisabled);
  };

  // Ordenar los días de la semana por nombre
  // const orderDays = (days: RuleDay[]) => {

  //   const daysOrdered = days.sort((a, b) => DayOrder[`${a.day}`] - DayOrder[b.day]);

  //   return daysOrdered;

  // }

  const getDaysCall = async () => await callEndpoint(getRulesDay());

  const loadDays = (data: RuleDay[]) => {
    const days = data;
    setDays(days);
    setDaysInit(days);
  };

  useAsync(getDaysCall, loadDays, () => {}, []);

  if (days.length === 0) return <></>;

  return (
    <>
      <Typography variant='h4' my={2}>
        Regla del día
      </Typography>

      {/* <Card>
        <CardHeader title="Reglas del día" />
        <CardContent> */}
      {loading ? (
        <CircularProgress />
      ) : (
        <form>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Day
                label='Lunes'
                dayToUpdate={days.find((day) => day.day === 'Monday')!}
              />
            </Grid>
            <Grid item xs={3}>
              <Day
                label='Martes'
                dayToUpdate={days.find((day) => day.day === 'Tuesday')!}
              />
            </Grid>
            <Grid item xs={3}>
              <Day
                label='Miércoles'
                dayToUpdate={days.find((day) => day.day === 'Wednesday')!}
              />
            </Grid>
            <Grid item xs={3}>
              <Day
                label='Jueves'
                dayToUpdate={days.find((day) => day.day === 'Thursday')!}
              />
            </Grid>
            <Grid item xs={3}>
              <Day
                label='Viernes'
                dayToUpdate={days.find((day) => day.day === 'Friday')!}
              />
            </Grid>
            <Grid item xs={3}>
              <Day
                label='Sábado'
                dayToUpdate={days.find((day) => day.day === 'Saturday')!}
              />
            </Grid>
            <Grid item xs={3}>
              <Day
                label='Domingo'
                dayToUpdate={days.find((day) => day.day === 'Sunday')!}
              />
            </Grid>

            {/* {
                      days.map((day, index) => (


                        <Grid item xs={2}>
                          <TextField

                            label={DayNameSpanish[`${day.day}` as keyof typeof DayNameSpanish]}
                            type="number"
                            fullWidth
                            required
                            value={day.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              const newDays = [...days];
                              newDays[index].value = Number(value);
                              setDays(newDays);
                              verifyBtnDisabled();
                            }}
                            inputProps={{
                              step: 0.05,
                            }}

                          />



                        </Grid>
                      )

                      )
                    } */}

            {/* 
                    <Grid item xs={12}>

                      <LoadingButton
                        type='submit'
                        variant='contained'
                        onClick={onSubmit}
                        disabled={btnDisabled}
                        loading={loading}
                      >
                        Guardar
                      </LoadingButton>
                    </Grid> */}
          </Grid>
        </form>
      )}

      {/* 
        </CardContent>
      </Card> */}
    </>
  );
};
