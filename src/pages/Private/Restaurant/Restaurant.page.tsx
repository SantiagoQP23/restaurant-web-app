import { TitlePage } from '../components';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  Stack,
  Chip
} from '@mui/material';
import { useRestaurantStore } from '../Common/store/restaurantStore';
import { useForm } from 'react-hook-form';
import { UpdateRestaurantDto } from '../Reports/dto/update-restaurant.dto';
import {
  useUpdateRestaurant,
  useRestaurantSubscription
} from './hooks/useRestaurant';
import { SubscriptionStatus } from '@/models/subscription.model';
import { LoadingButton } from '@mui/lab';
import { FormRestaurantLogo } from './components/FormRestaurantLogo.component';
import { ProductionAreasList } from './components/ProductionAreasList.component';
import { Label } from '@/components/ui';

const Restaurant = () => {
  const { restaurant } = useRestaurantStore((state) => state);

  const updateRestaurantMutation = useUpdateRestaurant();

  const subscriptionQuery = useRestaurantSubscription(restaurant?.id ?? '');
  const subscription = subscriptionQuery.data;

  const subscriptionStatusColor = (status?: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return 'success';
      case SubscriptionStatus.TRIAL:
        return 'info';
      case SubscriptionStatus.EXPIRED:
        return 'error';
      case SubscriptionStatus.CANCELLED:
        return 'error';
      default:
        return 'error';
    }
  };

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
        <TitlePage title='Mi restaurante' />
        {/* <Typography variant='h4' gutterBottom sx={{ mb: 3, mt: 3 }}> */}
        {/*   Mi restaurante */}
        {/* </Typography> */}

        {restaurant ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={2}>
                  <Typography variant='h5'>Información</Typography>
                  <Grid container spacing={3}>
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

                  <Box display='flex' justifyContent='flex-end'>
                    <LoadingButton
                      type='submit'
                      variant='contained'
                      loading={updateRestaurantMutation.isPending}
                    >
                      Guardar
                    </LoadingButton>
                  </Box>
                </Stack>
              </form>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack gap={2}>
                <Typography variant='h5'>Logo</Typography>
                <FormRestaurantLogo restaurant={restaurant} />
              </Stack>
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
          <Grid item xs={12}>
            <Typography variant='h5' gutterBottom>
              Suscripción
            </Typography>
          </Grid>
          {subscriptionQuery.isLoading ? (
            <Grid item xs={12}>
              <Typography variant='body2' color='text.secondary'>
                Cargando suscripción...
              </Typography>
            </Grid>
          ) : subscription ? (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card variant='outlined'>
                <CardHeader
                  title={subscription.plan.name.toUpperCase()}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  action={
                    <Label
                      color={subscriptionStatusColor(subscription.status)}
                      sx={{ mt: 0.5 }}
                    >
                      {subscription.status}
                    </Label>
                  }
                />
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant='caption' color='text.secondary'>
                        Precio
                      </Typography>
                      <Typography variant='h5' fontWeight={600}>
                        ${subscription.plan.price}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='caption' color='text.secondary'>
                        Fecha de inicio
                      </Typography>
                      <Typography variant='body2'>
                        {subscription.startDate}
                      </Typography>
                    </Box>
                    {subscription.endDate && (
                      <Box>
                        <Typography variant='caption' color='text.secondary'>
                          Fecha de vencimiento
                        </Typography>
                        <Typography variant='body2'>
                          {subscription.endDate}
                        </Typography>
                      </Box>
                    )}
                    {subscription.status === SubscriptionStatus.TRIAL && (
                      <Box>
                        <Typography variant='caption' color='text.secondary'>
                          Periodo de prueba hasta
                        </Typography>
                        <Typography variant='body2'>
                          {subscription.trialEndsAt}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography variant='body2' color='text.secondary'>
                No se encontró información de suscripción
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <ProductionAreasList />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Restaurant;
