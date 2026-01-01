import { TypeIdentification } from '../../../../../models/common.model';
import { CreateUser } from '../../models/create-user.model';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '../../../../../hooks';
import { ArrowBack } from '@mui/icons-material';
import {
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Box,
  Stack
} from '@mui/material';
import { FormUser } from '../FormUser.component';
import { createUser } from '../../services/users.service';
import { addUser } from '../../../../../redux';
import { TitlePage } from '../../../components/TitlePage.component';
import { useCreateUser } from '../../hooks/useUsers';

const initialUser: CreateUser = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  role: {
    name: 'mesero'
  },
  numPhone: '',
  identification: {
    type: TypeIdentification.CEDULA,
    num: ''
  }
};

export const AddUser = () => {
  const user = initialUser;

  // const { loading, callEndpoint } = useFetchAndLoad();

  const { isPending, mutateAsync } = useCreateUser();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  async function onSubmit(form: CreateUser) {
    console.log(form);

    const { identification, role, ...dataUser } = form;

    if (form.numPhone === '') {
      delete dataUser.numPhone;
    }

    const newUser = {
      ...dataUser,
      typeIdentification: identification.type,
      numberIdentification: identification.num,
      rol: form.role.name,
      email: form.email!
    };

    mutateAsync(newUser);

    // await callEndpoint(createUser(newUser))
    //   .then((res) => {

    //     const { data } = res;
    //     dispatch(addUser(data.user))
    //     enqueueSnackbar('Usuario creado con exito', { variant: 'success' });
    //     navigate(-1);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     enqueueSnackbar('Error al crear usuario', { variant: 'error' });
    //   })
  }

  return (
    <>
      <TitlePage title='Agregar usuario' />

      <Box width={{ xs: '100%', md: '570px' }} mx='auto' mb={4} mt={4}>
        <Card sx={{ p: 3 }}>
          <Stack gap={1} mb={3}>
            <Typography variant='h4'>Informacion del usuario</Typography>
          </Stack>
          <FormUser
            user={user}
            onSubmit={onSubmit}
            loading={isPending}
            isNew={true}
          />
        </Card>
      </Box>
    </>
  );
};
