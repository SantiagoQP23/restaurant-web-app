import {
  CardHeader,
  CardContent,
  Card,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { UpdateRuleWeatherDto } from '../../FootfallSimulation/dto/update-rule-weather';
import { useFetchAndLoad } from '../../../../../../hooks/useFetchAndLoad';
import { useAsync } from '../../../../../../hooks/useAsync';
import { useSnackbar } from 'notistack';
import { RuleWeather } from '../../../models/rule-weather.model';
import {
  updateRulesWeather,
  getRulesWeather
} from '../../../services/rules.service';

enum WeatherSpanish {
  'precipitation > 5' = 'Lluvia > 5',
  'precipitation > 10' = 'Lluvia > 10',
  'temperature > 25' = 'Temperatura > 25',

  'temperature < 22' = 'Temperatura < 22',
  '22 < temperature < 25' = '22 < Temperatura < 25'
}

export const WeatherRules = () => {
  const [weatherRules, setWeatherRules] = useState<RuleWeather[]>([]);

  const [weatherRulesInit, setWeatherRulesInit] = useState<RuleWeather[]>([]);

  const [btnDisabled, setBtnDisabled] = useState(true);

  const { loading, callEndpoint } = useFetchAndLoad();

  const { enqueueSnackbar } = useSnackbar();

  const verifyBtnDisabled = () => {
    const isDisabled = weatherRules.find(
      (weatherRule, index) =>
        weatherRule.value !== weatherRulesInit[index].value
    )
      ? true
      : false;
    console.log({ isDisabled });
    setBtnDisabled(isDisabled);
  };

  const onSubmit = async () => {
    const weatherRulesToUpdate: UpdateRuleWeatherDto[] = weatherRules.map(
      (weatherRule, index) => {
        return {
          id: weatherRule.id,
          value: weatherRule.value
        };
      }
    );

    await callEndpoint(updateRulesWeather(weatherRulesToUpdate))
      .then(() => {
        enqueueSnackbar('Reglas actualizadas', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Error al actualizar las reglas', { variant: 'error' });
      });

    console.log({ weatherRulesToUpdate });
  };

  const getWeatherRulesCall = async () => await callEndpoint(getRulesWeather());

  const loadWeatherRules = (data: RuleWeather[]) => {
    setWeatherRules(data);
    setWeatherRulesInit(data);
  };

  useAsync(getWeatherRulesCall, loadWeatherRules, () => {}, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <>
      <Card>
        <CardHeader title='Reglas del clima' />
        <CardContent>
          <form>
            <Grid container spacing={1}>
              {weatherRules.map((weatherRule, index) => (
                <Grid item xs={2} key={index}>
                  <TextField
                    label={
                      WeatherSpanish[
                        `${weatherRule.rule}` as keyof typeof WeatherSpanish
                      ]
                    }
                    type='number'
                    fullWidth
                    required
                    variant='outlined'
                    value={weatherRule.value}
                    onChange={(e) => {
                      const newWeatherRules = [...weatherRules];
                      newWeatherRules[index].value = Number(e.target.value);
                      setWeatherRules(newWeatherRules);
                      verifyBtnDisabled();
                    }}
                    inputProps={{
                      step: 0.1
                    }}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <LoadingButton variant='contained' onClick={onSubmit}>
                  Guardar
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
