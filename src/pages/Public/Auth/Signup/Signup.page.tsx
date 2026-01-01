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
        <Typography component='h5' variant='h4' sx={{ my: 2 }}>
          {VITE_APP_NAME}
        </Typography>
        <Typography component='h1' variant='h3' sx={{ my: 2 }}>
          Create your account
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(handleRegister)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id='firstName'
                autoComplete='given-name'
                required
                fullWidth
                label='First Name'
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
                label='Last Name'
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
                label='Email Address'
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
                id='email'
                fullWidth
                label='Phone Number'
                type='number'
                {...register('numPhone', {
                  minLength: { value: 10, message: 'Minimo 10 caracteres' }
                })}
                error={!!errors.numPhone}
                helperText={errors.numPhone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                {...register('password', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                    message:
                      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
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
            Create account
          </LoadingButton>
          <Stack
            spacing={1}
            direction='row'
            alignItems='center'
            justifyContent='center'
            sx={{ my: 2 }}
          >
            <Typography>Already have an account?</Typography>
            <Link href='login' variant='body2'>
              Sign in
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
