import { Copyright } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useForm } from 'react-hook-form';
import { RegisterUserDto } from '../dto/register-user.dto';
import { useSignup } from '../hooks/useAuth';
import { LoadingButton } from '@mui/lab';

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
    watch
  } = useForm<RegisterUserDto>({
    defaultValues: initialForm
  });

  const { mutate, isLoading } = useSignup();

  const handleRegister = (form: RegisterUserDto) => {
    console.log('Registering user:', form);
    mutate(form);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Registrarse
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
            <Grid item xs={12}>
              <TextField
                id='email'
                required
                fullWidth
                label='Phone Number'
                type='number'
                {...register('numPhone', {
                  required: 'Este campo es requerido',
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
            loading={isLoading}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Signup;
