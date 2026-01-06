import { useForm } from 'react-hook-form';

import {
  Grid,
  Box,
  TextField,
  Typography,
  Link,
  Paper,
  Avatar,
  Chip,
  Stack
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../../../hooks';

import { IFormLogin, PublicRoutes } from '../../../../models';
import { onChecking, selectAuth, startLogin } from '../../../../redux';
import { useLogin } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { getEnvVariables } from '@/helpers';

const { VITE_APP_NAME } = getEnvVariables();

const initialForm: IFormLogin = {
  username: '',
  password: ''
};

export const LoginPage = () => {
  // const navigate = useNavigate();
  const loginMutation = useLogin();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormLogin>({
    defaultValues: initialForm
  });

  const { error, status } = useAppSelector(selectAuth);

  const handleLogin = (form: IFormLogin) => {
    dispatch(onChecking());
    // dispatch(startLogin(form));
    loginMutation.mutate(form);
    // if (status === 'authenticated') navigate('/', { replace: true });
  };

  return (
    <>
      <Box>
        <Grid container component='main' sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1670819917685-f1040e76b9b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3MzQwNTQxMA&ixlib=rb-4.0.3&q=80&w=1080)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: { xs: 4, sm: 15 },
                display: 'flex',
                flexDirection: 'column'
                // alignItems: 'center'
              }}
            >
              <Typography component='h5' variant='h4' sx={{ my: 2 }}>
                {VITE_APP_NAME}
              </Typography>
              <Typography
                component='h4'
                fontWeight={500}
                variant='h3'
                sx={{ my: 2 }}
              >
                Ingrese a su cuenta
              </Typography>
              <Chip
                label={error}
                color='error'
                sx={{ display: !!error ? 'flex' : 'none' }}
              />
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit(handleLogin)}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Nombre de usuario'
                  error={!!errors.username}
                  {...register('username', {
                    required: 'Por favor, ingrese su nombre de usuario',
                    minLength: { value: 2, message: 'Nombre no valido' }
                  })}
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  label='Contraseña'
                  type='password'
                  error={!!errors.password}
                  {...register('password', {
                    required: 'Por favor, ingrese su contraseña',
                    minLength: { value: 2, message: 'Contraseña no valida' }
                  })}
                />
                <Link href={'/' + PublicRoutes.FORGOT_PASSWORD} variant='body2'>
                  Olvidé mi contraseña
                </Link>

                <LoadingButton
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  loading={status === 'checking'}
                >
                  Iniciar sesión
                </LoadingButton>
                <Stack
                  spacing={1}
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  sx={{ my: 2 }}
                >
                  <Typography>No tienes una cuenta?</Typography>
                  <Link href='/auth/register' variant='body2'>
                    Regístrate
                  </Link>
                </Stack>
                <Stack
                  spacing={1}
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  sx={{ my: 2 }}
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
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
