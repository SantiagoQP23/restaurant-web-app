import { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Divider,
  CardHeader,
  Box,
  FormGroup,
  FormControlLabel,
  Button
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { codes, IDay, WeatherbitCodes } from '../models/day.interface';
import { useFetchAndLoad } from '../../../../hooks/useFetchAndLoad';
import { getDay, getOneFootfall } from '../services/footfall.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useSnackbar } from 'notistack';
import { Checkbox } from '@mui/material/';
import { LoadingButton } from '@mui/lab';
import { UpdateDayDto } from '../dto/update-day.dto';
import Switch from '@mui/material/Switch';
import { useQuery } from '@tanstack/react-query';

const formatDate = (newValue: Date | string) => {
  const date = format(new Date(newValue), 'yyyy-MM-dd', { locale: es });

  return date;
};

export const Day = () => {
  const [day, setDay] = useState<IDay>();

  const [checked, setChecked] = useState(day?.holiday || false);
  const [value, setValue] = useState<Date | null>(new Date());

  const { data, isPending, isFetching } = useQuery<IDay>({
    queryKey: ['day', formatDate(value!)],
    queryFn: () => getDay(formatDate(value!))
  });

  const {} = useQuery({
    queryKey: ['footfall', formatDate(value!)],
    queryFn: () => getOneFootfall(formatDate(value!))
  });

  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();

  const handleHoliday = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleChange = (newValue: Date | null) => {
    if (newValue === null) {
      return;
    }
    const dateStr = formatDate(newValue);

    setValue(newValue);
  };

  const submitUpdateDay = async () => {
    const dateStr = formatDate(value!);

    const data: UpdateDayDto = {
      holiday: checked,
      date: dateStr,
      name: day!.name
    };
  };

  useEffect(() => {}, []);

  return (
    <>
      <Card>
        <CardHeader title='Información de un día' />
        <CardContent>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <DesktopDatePicker
              label='Fecha'
              inputFormat='yyyy-MM-dd'
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>

          {!day ? (
            <>
              <Grid item xs={12}>
                <Typography color='gray' align='center'>
                  {' '}
                  No se ha encontrado el día
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              <Typography variant='body2' align='center'>
                {day.name}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant='subtitle1' align='center'>
                {day.tempMax} °C
              </Typography>
              <Typography variant='h5' align='center'>
                {' '}
                {day.temp} °C
              </Typography>
              <Typography variant='subtitle1' align='center'>
                {day.tempMin} °C
              </Typography>
              <Typography variant='body2' align='center'>
                {codes[day.weatherCode].descriptionEs}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant='body1' align='center'>
                Asistencia
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
