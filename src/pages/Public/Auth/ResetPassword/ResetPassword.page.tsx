import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFetchAndLoad } from '../../../../hooks';
import { resetPassword } from '../services/reset-password.service';
import { PublicRoutes } from '../../../../models';
import { LoadingButton } from '@mui/lab';
import { useModal } from '../../../../hooks/useModal';
import { useSnackbar } from 'notistack';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  status?: boolean;
  msg?: string;
}

const Modal: FC<ModalProps> = ({ open, handleClose, status, msg }) => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle id='alert-dialog-title' color='white'>
          {status ? 'Solicitud exitosa' : 'Token no válido'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {status && (
            <Button>
              <Link href={'/' + PublicRoutes.LOGIN} variant='body2'>
                Ir a Login
              </Link>
            </Button>
          )}
          <LoadingButton
            loading={false}
            variant='contained'
            color={status ? 'success' : 'error'}
            onClick={handleClose}
          >
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
      X
    </>
  );
};

const ResetPassword = () => {
  const { token } = useParams();

  const { isOpen, handleClose, handleOpen } = useModal();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { enqueueSnackbar } = useSnackbar();

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [checkedPassword, setCheckedPassword] = useState(false);

  const [statusResponse, setStatusResponse] = useState<{
    message?: string;
    status: boolean;
  }>({ status: false });

  const passwordMessage =
    'The password must have a Uppercase, lowercase letter and a number';

  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [samePassword, setSamePassword] = useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get('password'));

    setPasswordValid(isValidPassword(password));
    validSamePassword(password, String(data.get('password2')));

    // TODO: Send data to backend
    if (samePassword && passwordValid && token) {
      onSubmit(token, password);
    }
  };

  const isValidPassword = (password: string) => {
    const validPassword =
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password);

    return validPassword;
  };

  const validSamePassword = (password1: string, password2: string) => {
    setSamePassword(password1 === password2);
  };

  const onSubmit = async (token: string, password: string) => {
    await callEndpoint(resetPassword(token, password))
      .then((resp) => {
        enqueueSnackbar('La contraseña ha sido cambiada correctamente', {
          variant: 'success'
        });
        navigate('/' + PublicRoutes.LOGIN);
      })
      .catch((err) => {
        enqueueSnackbar('Error al cambiar la contraseña', { variant: 'error' });
      });
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
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
            Cambiar contraseña
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {statusResponse.message && (
              <Chip
                label={statusResponse.message}
                color={statusResponse.status ? 'success' : 'error'}
                sx={{ display: checkedPassword ? 'flex' : 'none' }}
              />
            )}

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='subtitle2' color='initial'>
                  Ingrese su nueva contraseña
                </Typography>
                <TextField
                  id='password'
                  name='password'
                  margin='normal'
                  type='password'
                  fullWidth
                  required
                  error={!passwordValid}
                  helperText={!passwordValid ? passwordMessage : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2' color='initial'>
                  Repita su nueva contraseña
                </Typography>

                <TextField
                  id='password2'
                  name='password2'
                  margin='normal'
                  type='password'
                  fullWidth
                  required
                />
              </Grid>

              <Typography variant='body1' color='error'>
                {samePassword ? '' : 'Las contraseñas no coinciden'}
              </Typography>

              <Grid item xs={12}>
                <LoadingButton
                  variant='contained'
                  fullWidth
                  type='submit'
                  loading={loading}
                >
                  Enviar
                </LoadingButton>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Link href={'/' + PublicRoutes.LOGIN} variant='body2'>
                    Ir a login
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Modal
        open={isOpen}
        handleClose={handleClose}
        msg={statusResponse.message}
        status={statusResponse.status}
      />
    </>
  );
};

export default ResetPassword;
