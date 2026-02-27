import {
  Container,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useCreateRestaurant } from '../../hooks/useRestaurant';
import { CreateRestaurantDto } from '../../dto/create-restaurant.dto';
import { useAppDispatch } from '@/hooks';
import { startLogout } from '@/redux';
import { ExitToAppOutlined } from '@mui/icons-material';
import { useState } from 'react';

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
  const dispatch = useAppDispatch();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({ open: false, severity: 'success', message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateRestaurantDto>({
    defaultValues
  });

  const onSubmit = (data: CreateRestaurantDto) => {
    createRestaurantMutation.mutate(data, {
      onSuccess: () => {
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Restaurante creado exitosamente'
        });
      },
      onError: () => {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Error al crear el restaurante. Intente de nuevo.'
        });
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <Container maxWidth='md'>
      <Box mb={4}>
        <Typography variant='h4' gutterBottom sx={{ mt: 4 }}>
          Bienvenido a Teikio
        </Typography>
        <Typography variant='h6' gutterBottom>
          Elige cómo quieres empezar
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
          Crear mi restaurante
        </Typography>
        <Typography variant='body1' gutterBottom>
          Quiero gestionar mi restaurante
        </Typography>
      </Box>

      <Card sx={{ mt: 2 }}>
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
                  disabled={createRestaurantMutation.isPending}
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
                  disabled={createRestaurantMutation.isPending}
                  {...register('identification', {
                    minLength: { value: 5, message: 'Mínimo 5 caracteres' }
                  })}
                  helperText={errors.identification?.message}
                  error={!!errors.identification}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Teléfono de contacto'
                  type='tel'
                  fullWidth
                  required
                  disabled={createRestaurantMutation.isPending}
                  {...register('phone', {
                    required: 'Este es un campo requerido',
                    minLength: { value: 7, message: 'Mínimo 7 dígitos' }
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
                  disabled={createRestaurantMutation.isPending}
                  {...register('email', {
                    required: 'Este es un campo requerido',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Correo electrónico no válido'
                    }
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
                  disabled={createRestaurantMutation.isPending}
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
                  disabled={createRestaurantMutation.isPending}
                  inputProps={{ min: 1 }}
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
              loading={createRestaurantMutation.isPending}
            >
              Crear Restaurante
            </LoadingButton>
          </CardActions>
        </form>
      </Card>

      <Divider sx={{ mt: 4 }} />

      <Box
        alignItems='center'
        justifyContent='space-between'
        display='flex'
        mt={2}
      >
        <Box>
          <Typography variant='body1' gutterBottom>
            Alguien más me invitará a su restaurante
          </Typography>
        </Box>
        <Button type='button' onClick={handleLogout} variant='text'>
          <ExitToAppOutlined sx={{ mr: 1 }} />
          Cerrar sesión
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant='filled'
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
