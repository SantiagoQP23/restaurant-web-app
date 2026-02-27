import { Copyright } from '@mui/icons-material';
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { RegisterUserDto } from '../dto/register-user.dto';
import { useSignup } from '../hooks/useAuth';
import { LoadingButton } from '@mui/lab';

import { getEnvVariables } from '@/helpers';

const { VITE_APP_NAME } = getEnvVariables();

const initialForm: RegisterUserDto = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  samePassword: '',
  username: '',
  numPhone: ''
};

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<RegisterUserDto>({
    defaultValues: initialForm
  });

  const { mutateAsync, isPending } = useSignup();

  const handleRegister = (form: RegisterUserDto) => {
    console.log('Registering user:', form);
    mutateAsync(form).then(() => {
      console.log('User registered successfully');
      reset();
    });
  };

  return (
    <Container component='main' maxWidth='sm' sx={{ px: { xs: 4, sm: 0 } }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column'
          // alignItems: 'center'
        }}
      >
        <Typography component='h5' variant='h4' sx={{}}>
          Bienvenido a {VITE_APP_NAME}
        </Typography>
        <Typography component='h1' variant='h6' sx={{ my: 1 }}>
          Crea tu cuenta y empieza tu prueba gratuita de 15 días
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(handleRegister)}
          sx={{ mt: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id='firstName'
                autoComplete='given-name'
                required
                fullWidth
                label='Nombre'
                autoFocus
                {...register('firstName', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' }
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Apellido'
                autoComplete='family-name'
                {...register('lastName', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' }
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='email'
                required
                fullWidth
                label='Correo electrónico'
                autoComplete='email'
                type='email'
                {...register('email', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Email no válido'
                  },
                  minLength: { value: 2, message: 'Minimo 2 caracteres' }
                })}
                helperText={errors.email?.message}
                error={!!errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Nombre de usuario'
                fullWidth
                required
                {...register('username', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' }
                })}
                helperText={errors.username?.message}
                error={!!errors.username}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id='phone'
                fullWidth
                label='Número de teléfono'
                type='number'
                {...register('numPhone', {
                  minLength: { value: 10, message: 'Minimo 10 caracteres' },
                  maxLength: { value: 10, message: 'Maximo 10 caracteres' }
                })}
                error={!!errors.numPhone}
                helperText={errors.numPhone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Contraseña'
                type='password'
                id='password'
                autoComplete='new-password'
                {...register('password', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                    message:
                      'La contraseña debe tener al menos 8 caracteres e incluir mayúscula, minúscula, número y carácter especial'
                  }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Confirmar contraseña'
                type='password'
                id='password'
                autoComplete='new-password'
                {...register('samePassword', {
                  required: 'Por favor, repita su contraseña',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' },
                  validate: (value) =>
                    value === watch('password') ||
                    'Las contraseñas no coinciden'
                })}
                error={!!errors.samePassword}
                helperText={errors.samePassword?.message}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            loading={isPending}
          >
            Crear cuenta
          </LoadingButton>
          <Stack
            spacing={1}
            direction='row'
            alignItems='center'
            justifyContent='center'
            sx={{ my: 2 }}
          >
            <Typography>¿Ya tienes una cuenta?</Typography>
            <Link href='login' variant='body2'>
              Iniciar sesión
            </Link>
          </Stack>
        </Box>
      </Box>
      <Stack
        spacing={1}
        direction='row'
        alignItems='center'
        justifyContent='center'
        sx={{ my: 2, mb: 5 }}
      >
        <Typography
          sx={{ mt: 5, display: 'flex', alignItems: 'center' }}
          variant='body2'
          color='text.secondary'
          align='center'
        >
          <Copyright />
          Santiago Quirumbay
        </Typography>
      </Stack>
    </Container>
  );
};

export default Signup;
