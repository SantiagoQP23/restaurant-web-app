import { FC, useState } from 'react';

import { useController, UseControllerProps, useForm } from 'react-hook-form';

import {
  CardHeader,
  CardContent,
  Card,
  Grid,
  TextField,
  CardActions
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import { useFetchAndLoad, useAsync } from '../../../../../../hooks';

import { UpdateRuleWeekDto } from '../../FootfallSimulation/dto/update-rule-week.dto';
import { RuleWeek } from '../../../models/rule-week.model';
import { updateRulesWeek, getRulesWeek } from '../../../services/rules.service';

interface InputProps {
  props: UseControllerProps<RuleWeek[]>;
}

export const WeekRules = () => {
  const [weeks, setWeeks] = useState<RuleWeek[]>([]);
  const [weeksInit, setWeeksInit] = useState<RuleWeek[]>([]);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const { loading, callEndpoint } = useFetchAndLoad();

  const onSubmit = async () => {
    const weeksToUpdate: UpdateRuleWeekDto[] = weeks.map((week, index) => {
      return {
        id: week.id,
        value: week.value
      };
    });

    await callEndpoint(updateRulesWeek(weeksToUpdate))
      .then(() => {
        enqueueSnackbar('Reglas actualizadas', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Error al actualizar las reglas', { variant: 'error' });
      });
  };

  const verifyBtnDisabled = () => {
    const isDisabled = weeks.find(
      (week, index) => week.value !== weeksInit[index].value
    )
      ? true
      : false;
    console.log({ isDisabled });
    setBtnDisabled(isDisabled);
  };

  const getWeeksCall = async () => await callEndpoint(getRulesWeek());

  const loadWeeks = (data: RuleWeek[]) => {
    setWeeks(data);
    setWeeksInit(data);
  };

  useAsync(getWeeksCall, loadWeeks, () => {}, []);

  if (loading)
    return (
      <>
        <>Loading...</>
      </>
    );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Card>
          <CardHeader title='Reglas de semanas' />
          <CardContent>
            <Grid container spacing={1}>
              {weeks.map((week, index) => (
                <Grid item xs={2} key={index}>
                  <TextField
                    label={`Semana - ${week.week}`}
                    type='number'
                    fullWidth
                    required
                    value={week.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newWeeks = [...weeks];
                      newWeeks[index].value = Number(value);
                      setWeeks(newWeeks);
                      console.log('compoe');
                      verifyBtnDisabled();
                    }}
                    inputProps={{
                      step: 0.01
                    }}
                  />
                </Grid>
              ))}

              {/* <Grid item xs={12}>
                <TextField
                  label="Semana 1"
                  type="number"
                  fullWidth
                  required
                  {
                    ...register({ required: true })
                  }
                  



                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Semana 2"
                  type="number"
                  fullWidth
                  required
                />

              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Semana 3"
                  type="number"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Semana 4"
                  type="number"
                  fullWidth
                  required
                />

              </Grid>


              <Grid item xs={12}>

                <TextField
                  label="Semana 5"
                  type="number"
                  fullWidth
                  required
                />

              </Grid> */}
            </Grid>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={loading}
              // Verificar si el estado de los inputs es igual al estado inicial
              // disabled={weeks.every((week, index) => week.value === weeksInit[index].value)}
              disabled={btnDisabled}
            >
              Guardar
            </LoadingButton>
          </CardContent>
        </Card>
      </form>
    </>
  );
};
