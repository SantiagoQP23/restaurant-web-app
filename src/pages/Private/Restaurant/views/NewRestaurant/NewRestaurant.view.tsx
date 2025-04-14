import {
  Container,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { TitlePage } from '@/pages/Private/components';
import { useCreateRestaurant } from '../../hooks/useRestaurant';
import { UpdateRestaurantDto } from '@/pages/Private/Reports/dto/update-restaurant.dto';
import { CreateRestaurantDto } from '../../dto/create-restaurant.dto';

const defaultValues: CreateRestaurantDto = {
  name: '',
  address: '',
  capacity: 0,
  identification: '',
  phone: '',
  email: ''
};

export const NewRestaurant = () => {
  const createRestaurantMutation = useCreateRestaurant();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateRestaurantDto>({
    defaultValues
  });

  const onSubmit = (data: UpdateRestaurantDto) => {
    console.log(data);
    createRestaurantMutation.mutate(data);

    // updateRestaurantMutation.mutate(data);
  };
  return (
    <Container maxWidth='md'>
      <TitlePage title='Nuevo Restaurante' />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title='Información' />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Nombre'
                  type='text'
                  fullWidth
                  required
                  {...register('name', {
                    required: 'Este es un campo requerido'
                  })}
                  helperText={errors.name?.message}
                  error={!!errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='RUC / NIT / CIF'
                  type='text'
                  fullWidth
                  required
                  {...register('identification', {
                    required: 'Este es un campo requerido'
                  })}
                  helperText={errors.identification?.message}
                  error={!!errors.identification}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Teléfono de contacto'
                  type='number'
                  fullWidth
                  required
                  {...register('phone', {
                    required: 'Este es un campo requerido'
                  })}
                  helperText={errors.phone?.message}
                  error={!!errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Correo electrónico'
                  type='email'
                  fullWidth
                  required
                  {...register('email', {
                    required: 'Este es un campo requerido'
                  })}
                  helperText={errors.email?.message}
                  error={!!errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Dirección fiscal y/o sucursal'
                  type='text'
                  fullWidth
                  required
                  {...register('address', {
                    required: 'Este es un campo requerido'
                  })}
                  helperText={errors.address?.message}
                  error={!!errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Capacidad'
                  type='number'
                  fullWidth
                  required
                  {...register('capacity', {
                    required: 'Este es un campo requerido',
                    min: {
                      value: 1,
                      message: 'La capacidad debe ser mayor a 0'
                    },
                    valueAsNumber: true
                  })}
                  helperText={errors.capacity?.message}
                  error={!!errors.capacity}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ justifyContent: 'right' }}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={createRestaurantMutation.isLoading}
            >
              Crear Restaurante
            </LoadingButton>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};
