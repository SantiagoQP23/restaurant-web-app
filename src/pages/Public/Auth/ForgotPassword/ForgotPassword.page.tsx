import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Card
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FC, useEffect, useState } from 'react';
import { useFetchAndLoad, useModal } from '../../../../hooks';
import { sendRequestResetPassword } from '../services/reset-password.service';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { PublicRoutes } from '../../../../models';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  status?: boolean;
  msg?: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const Modal: FC<ModalProps> = ({ open, handleClose, status, msg }) => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle id='alert-dialog-title' color='white'>
          {status ? 'Solicitud exitosa' : 'Email incorrecto'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
    </>
  );
};

const ForgotPassword = () => {
  const [emailValid, setEmailValid] = useState<boolean>(true);

  const { isOpen, handleClose, handleOpen } = useModal();

  const { loading, callEndpoint } = useFetchAndLoad();

  const [checkedEmail, setCheckedEmail] = useState(false);
  const [statusResponse, setStatusResponse] = useState<{
    message?: string;
    status: boolean;
  }>({ status: false });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email'));

    const validEmail = isValidEmail(email);
    setEmailValid(validEmail);

    if (validEmail) {
      onSubmit(email);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email));

    return validEmail;
  };

  const onSubmit = async (email: string) => {
    await callEndpoint(sendRequestResetPassword(email))
      .then((resp) => {
        setStatusResponse({
          message: 'Se ha enviado un link a su email',
          status: true
        });
        handleOpen();
        //enqueueSnackbar('Por favor, revise su email');
      })
      .catch((err) => {
        setStatusResponse({
          message: 'No se encontro un usuario con el email ' + email,
          status: false
        });
        handleOpen();
        //enqueueSnackbar('Por favor, revise su email', {variant: 'error'});
      });
  };

  //useEffect con timeout para resetear el estado de checkedEmail
  useEffect(() => {
    if (checkedEmail) {
      const timer = setTimeout(() => {
        setCheckedEmail(false);
        setStatusResponse({ status: false });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [checkedEmail]);

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
            Olvidé mi contraseña
          </Typography>

          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant='body1'>
                  Ingrese el email de su cuenta
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='email'
                  id='email'
                  required
                  fullWidth
                  label='Email'
                  autoFocus
                  error={!emailValid}
                  helperText={!emailValid ? 'Email no válido' : ''}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body1'>
                  Recibirá un correo con un link
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  variant='contained'
                  fullWidth
                  type='submit'
                  loading={loading}
                >
                  Enviar
                </LoadingButton>
                <Link href={'/' + PublicRoutes.LOGIN} variant='body2'>
                  Ir a login
                </Link>
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
export default ForgotPassword;
