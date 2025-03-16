import { Navigate, useNavigate } from 'react-router-dom';
import {
  selectUsers,
  updateUser
} from '../../../../../redux/slices/users/users.slice';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Switch,
  Box,
  CardHeader
} from '@mui/material';
import { CreateUser } from '../../models/create-user.model';
import { FormUser } from '../FormUser.component';
import { useSnackbar } from 'notistack';
import { ResetPasswordUserDto } from '../../dto/update-user.dto';
import { LoadingButton } from '@mui/lab';
import { useResetPasswordUser, useUpdateUser } from '../../hooks/useUsers';
import { IUser } from '../../../../../models';
import { Label } from '../../../../../components/ui';
import { TitlePage } from '../../../components/TitlePage.component';

export const EditUser = () => {
  const navigate = useNavigate();

  const { activeUser } = useSelector(selectUsers);

  if (!activeUser) navigate('/users');

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const resetPasswordMutation = useResetPasswordUser();

  const updateUserMutation = useUpdateUser();

  const { id, person, role, isActive, ...restUser } = activeUser!;

  const { id: idI, ...identification } = person.identification;

  const { id: idP, ...restPerson } = person;

  const { name } = role;

  const user: CreateUser = {
    ...restPerson,
    ...restUser,
    role: { name },
    identification
  };

  async function onSubmit(form: CreateUser) {
    console.log(form);
    const { identification, role, ...dataUser } = form;

    if (form.numPhone === '') {
      delete dataUser.numPhone;
    }

    const userUpdated = {
      ...dataUser,
      typeIdentification: identification.type,
      numberIdentification: identification.num,
      rol: form.role.name
    };

    updateUserMutation
      .mutateAsync({ id: activeUser!.id, ...userUpdated })
      .then((data) => {
        dispatch(updateUser(data));

        // enqueueSnackbar('Usuario actualizado', { variant: 'success' });
      })
      .catch((err) => {
        // console.log(err);
        // enqueueSnackbar('Error al actualizar usuario', { variant: 'error' });
      });
  }

  const submitChangeStatus = () => {
    updateUserMutation
      .mutateAsync({ id: activeUser!.id, isActive: !activeUser!.isActive })
      .then((data) => {
        dispatch(updateUser(data));

        enqueueSnackbar('Usuario actualizado', { variant: 'success' });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error al actualizar usuario', { variant: 'error' });
      });
  };

  async function onReset() {
    const data: ResetPasswordUserDto = {
      userId: activeUser!.id
    };

    resetPasswordMutation
      .mutateAsync(data)
      .then((resp) => {
        enqueueSnackbar('Contraseña reseteada', { variant: 'success' });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error al resetear contraseña', { variant: 'error' });
      });
  }

  if (!activeUser) return <Navigate to='/users' replace />;

  return (
    <>
      <TitlePage title='Editar usuario' />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              action={
                <>
                  <Label color={activeUser!.isActive ? 'success' : 'error'}>
                    {activeUser!.isActive ? 'Activo' : 'Inactivo'}
                  </Label>
                </>
              }
            />

            <CardContent>
              <Typography variant='h4' align='center' mt={5}>
                {user.firstName + ' ' + user.lastName}
              </Typography>

              <Typography variant='subtitle2' align='center' mb={5}>
                {user.role.name}
              </Typography>

              <Stack spacing={2}>
                <Box display='flex' justifyContent='space-between'>
                  <Box>
                    <Typography variant='h5'>Baneado</Typography>
                    <Typography variant='subtitle2'>
                      Deshabilitar cuenta
                    </Typography>
                  </Box>

                  <Switch
                    checked={!activeUser!.isActive}
                    color='success'
                    onChange={() => submitChangeStatus()}
                  />
                </Box>

                <LoadingButton
                  variant='text'
                  onClick={onReset}
                  loading={resetPasswordMutation.isLoading}
                >
                  Restablecer contraseña
                </LoadingButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <FormUser
                onSubmit={onSubmit}
                user={user}
                loading={updateUserMutation.isLoading}
                isNew={false}
              />

              {/* <FormClient onSubmit={onSubmit} client={client} loading={loading} msg={'Editar'} /> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
