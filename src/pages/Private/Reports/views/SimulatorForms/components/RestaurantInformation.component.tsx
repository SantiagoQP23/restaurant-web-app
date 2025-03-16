import { useState, FC } from 'react';

import {
  CardHeader,
  CardContent,
  Card,
  TextField,
  Grid,
  Typography,
  Box
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  formatDateToPicker,
  formatDate
} from '../../../../Common/helpers/format-date.helper';
import {
  useRestaurant,
  useUpdateRestaurant
} from '../../../../Restaurant/hooks/useRestaurant';
import { UpdateRestaurantDto } from '../../../dto/update-restaurant.dto';
import { useRestaurantStore } from '../../../../Common/store/restaurantStore';
import { Restaurant } from '../../../../Common/models/restaurant.model';

interface FormRestaurantProps {
  restaurant: Restaurant;
}

const FormRestaurant: FC<FormRestaurantProps> = ({ restaurant }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateRestaurantDto>({
    defaultValues: {
      capacity: restaurant.capacity,
      percentageAttendance: restaurant.percentageAttendance
    }
  });

  const [date, setDate] = useState<Date | null>(
    new Date(restaurant.simulationEndDate)
  );

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(restaurant.simulationStartDate)
  );

  const [endDate, setEndDate] = useState<Date | null>(
    new Date(restaurant.simulationEndDate)
  );

  const { mutateAsync, isLoading } = useUpdateRestaurant();

  const handleChangeStartDate = (date: Date | null) => {
    setStartDate(date);
  };

  const handleChangeEndDate = (date: Date | null) => {
    setEndDate(date);
  };

  async function onSubmit(updateRestaurantDto: UpdateRestaurantDto) {
    if (startDate === null || endDate === null) {
      enqueueSnackbar('Las fechas son requeridas', { variant: 'error' });
      return;
    }

    const data: UpdateRestaurantDto = {
      ...updateRestaurantDto,
      simulationStartDate: format(startDate, 'yyyy-MM-dd'),
      simulationEndDate: format(endDate, 'yyyy-MM-dd')
      // id: restaurant.id,
    };
    await mutateAsync(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  type="text"
                  fullWidth
                  required
                />

              </Grid> */}

        <Grid item xs={12}>
          <TextField
            label='Capacidad'
            type='number'
            fullWidth
            required
            {...register('capacity', {
              required: 'Este es un campo requerido',
              min: { value: 1, message: 'La capacidad debe ser mayor a 0' },
              valueAsNumber: true
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='Porcentaje de ocupación promedio'
            type='number'
            fullWidth
            required
            {...register('percentageAttendance', {
              required: 'Este es un campo requerido',
              min: { value: 1, message: 'El porcentaje debe ser mayor a 0' },
              max: {
                value: 100,
                message: 'El porcentaje debe ser menor a 100'
              },
              valueAsNumber: true
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <DesktopDatePicker
            label='Fecha de inicio de simulación'
            inputFormat='dd/MM/yyyy'
            renderInput={(params) => <TextField {...params} />}
            value={startDate}
            onChange={handleChangeStartDate}
          />
        </Grid>

        <Grid item xs={12}>
          <DesktopDatePicker
            label='Fecha de fin de simulación'
            inputFormat='dd/MM/yyyy'
            renderInput={(params) => <TextField {...params} />}
            value={endDate}
            onChange={handleChangeEndDate}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            loading={isLoading}
            type='submit'
            variant='contained'
            fullWidth
          >
            Actualizar
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

interface FormSimulationEndDateProps {
  restaurant: Restaurant;
}

export const FormSimulationEndDate: FC<FormSimulationEndDateProps> = ({
  restaurant
}) => {
  const [startDate, endDate] = useState<Date | null>(
    new Date(restaurant.simulationStartDate)
  );

  const [date, setDate] = useState<Date | null>(
    new Date(restaurant.simulationEndDate)
  );

  const { mutateAsync } = useUpdateRestaurant();

  const handleChange = async (newValue: Date | null) => {
    if (newValue === null) {
      return;
    }
    const dateStr = formatDate(newValue);

    await mutateAsync({ id: restaurant.id, simulationEndDate: dateStr });

    setDate(newValue);
  };

  return (
    <Card>
      <CardHeader title='Fecha de fin de simulación' />
      <CardContent></CardContent>
    </Card>
  );
};

export const RestaurantInformation = () => {
  const { restaurant } = useRestaurantStore((state) => state);

  // const { data, isLoading, isFetching, isFetched } = useRestaurant();

  // if (isLoading)
  //   return <Typography>Loading...</Typography>

  // if (!data && isFetched)
  //   return <Typography>No se encontró el restaurante</Typography>

  return (
    <>
      {restaurant && (
        <>
          <Card sx={{ mb: 1 }}>
            <CardHeader title='Información del restaurante' />
            <CardContent>
              <FormRestaurant restaurant={restaurant} />
            </CardContent>
          </Card>
          <Box mb={2}>
            <Typography variant='subtitle1'>Última actualización</Typography>
            <Typography variant='h6'>
              {format(
                new Date(restaurant.lastSimulationUpdate),
                'dd/MM/yyyy HH:mm',
                { locale: es }
              )}
            </Typography>
          </Box>
          {/* <FormSimulationEndDate restaurant={restaurant} /> */}
        </>
      )}
    </>
  );
};
