import { TitlePage } from '../components';
import {
  Container,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useRestaurantStore } from '../Common/store/restaurantStore';
import { useForm } from 'react-hook-form';
import { UpdateRestaurantDto } from '../Reports/dto/update-restaurant.dto';
import { useUpdateRestaurant } from './hooks/useRestaurant';
import { LoadingButton } from '@mui/lab';
import { FormRestaurantLogo } from './components/FormRestaurantLogo.component';
import { ProductionAreasList } from './components/ProductionAreasList.component';

const Restaurant = () => {
  const { restaurant } = useRestaurantStore((state) => state);

  const updateRestaurantMutation = useUpdateRestaurant();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateRestaurantDto>({
    defaultValues: {
      name: restaurant?.name,
      capacity: restaurant?.capacity,
      address: restaurant?.address,
      identification: restaurant?.identification,
      phone: restaurant?.phone,
      email: restaurant?.email
    }
  });

  const onSubmit = (data: UpdateRestaurantDto) => {
    console.log(data);

    updateRestaurantMutation.mutate(data);
  };

  return (
    <>
      <Container maxWidth='lg'>
        {/* <TitlePage title='Configuración del restaurante' /> */}
        <Typography variant='h3' gutterBottom sx={{ mb: 3, mt: 3 }}>
          Configuración del restaurante
        </Typography>

        {restaurant ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormRestaurantLogo restaurant={restaurant} />
            </Grid>
            <Grid item xs={12} md={8}>
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
                          type='text'
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

                  <CardActions>
                    <LoadingButton
                      type='submit'
                      variant='contained'
                      loading={updateRestaurantMutation.isPending}
                    >
                      Guardar
                    </LoadingButton>
                  </CardActions>
                </form>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography variant='h5' gutterBottom>
              No se ha configurado un restaurante
            </Typography>
          </>
        )}

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <ProductionAreasList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Restaurant;
