import { Navigate, useNavigate, useParams } from 'react-router-dom';
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
import {
  useResetPasswordUser,
  useUpdateUser,
  useUser
} from '../../hooks/useUsers';
import { IUser } from '../../../../../models';
import { Label } from '../../../../../components/ui';
import { TitlePage } from '../../../components/TitlePage.component';
import { useRestaurantStore } from '@/pages/Private/Common/store/restaurantStore';

export const EditUser = () => {
  const navigate = useNavigate();

  const params = useParams();

  if (!params.id) {
    return <Navigate to='/users' />;
  }
  // This update activeProduct in redux
  const { isPending, data: userToUpdate, refetch } = useUser(params.id);
  const { restaurant } = useRestaurantStore((state) => state);

  if (!userToUpdate) navigate('/users');

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const resetPasswordMutation = useResetPasswordUser();

  const { updateUserMutation, updateUserRole } = useUpdateUser();

  // const { id, person, restaurantRoles, isActive, ...restUser } = userToUpdate!;
  //
  // const { id: idI, ...identification } = person.identification;
  //
  // const { id: idP, ...restPerson } = person;
  //
  // const { name } = role;

  const currentRole = userToUpdate?.restaurantRoles.find(
    (restaurantRole) => restaurantRole.restaurant.id === restaurant!.id
  );

  const user: CreateUser = {
    lastName: userToUpdate?.person.lastName || '',
    firstName: userToUpdate?.person.firstName || '',
    email: userToUpdate?.person.email || '',
    numPhone: userToUpdate?.person.numPhone || '',
    identification: {
      type: userToUpdate!.person.identification!.type!,
      num: userToUpdate!.person.identification!.num || ''
    },
    username: userToUpdate?.username || '',
    role: {
      name: currentRole?.role.name || ''
    }
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
      .mutateAsync({ id: userToUpdate!.id, ...userUpdated })
      .then((data: IUser) => {
        dispatch(updateUser(data));
        refetch();

        // enqueueSnackbar('Usuario actualizado', { variant: 'success' });
      })
      .catch((err: any) => {
        // console.log(err);
        // enqueueSnackbar('Error al actualizar usuario', { variant: 'error' });
      });
  }

  const submitChangeStatus = () => {
    updateUserMutation
      .mutateAsync({ id: userToUpdate!.id, isActive: !userToUpdate!.isActive })
      .then((data: IUser) => {
        dispatch(updateUser(data));
        refetch();
      })
      .catch((err: any) => {
        console.log(err);
        enqueueSnackbar('Error al actualizar usuario', { variant: 'error' });
      });
  };

  async function onReset() {
    const data: ResetPasswordUserDto = {
      userId: userToUpdate!.id
    };

    resetPasswordMutation
      .mutateAsync(data)
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error al resetear contraseña', { variant: 'error' });
      });
  }
  //
  if (!userToUpdate) return <Navigate to='/users' replace />;

  return (
    <>
      <TitlePage title='Editar usuario' />

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              action={
                <>
                  <Label color={userToUpdate!.isActive ? 'success' : 'error'}>
                    {userToUpdate!.isActive ? 'Activo' : 'Inactivo'}
                  </Label>
                </>
              }
            />

            <CardContent>
              <Typography variant='h4' align='center' mt={5}>
                {userToUpdate.person.firstName +
                  ' ' +
                  userToUpdate.person.lastName}
              </Typography>

              <Typography variant='subtitle2' align='center' mb={3}>
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
                    checked={!userToUpdate!.isActive}
                    color='success'
                    onChange={() => submitChangeStatus()}
                  />
                </Box>

                <LoadingButton
                  variant='text'
                  onClick={onReset}
                  loading={resetPasswordMutation.isPending}
                >
                  Restablecer contraseña
                </LoadingButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: { xs: 2, md: 4 } }}>
            <FormUser
              onSubmit={onSubmit}
              user={user}
              loading={updateUserMutation.isPending}
              isNew={false}
            />

            {/* <FormClient onSubmit={onSubmit} client={client} loading={loading} msg={'Editar'} /> */}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
