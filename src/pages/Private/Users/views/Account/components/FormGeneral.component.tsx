import { LoadingButton } from '@mui/lab';
import {
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';

import { UpdateUserDto } from '../../../dto';
import { Controller, useForm } from 'react-hook-form';
import { TypeIdentification } from '../../../../../../models/common.model';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin, selectAuth, updateUser } from '../../../../../../redux';
import { useUpdateUser } from '../../../hooks/useUsers';

export const FormGeneral = () => {
  const { user } = useSelector(selectAuth);

  const { mutateAsync, isPending } = useUpdateUser().updateUserMutation;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<UpdateUserDto>({
    defaultValues: {
      typeIdentification: TypeIdentification.CEDULA,
      numberIdentification: String(user!.person.identification?.num),
      firstName: user?.person.firstName,
      lastName: user?.person.lastName,
      numPhone: user?.person.numPhone,
      email: user?.person.email,
      username: user?.username,
      id: user?.id
    }
  });

  const onSubmit = (data: UpdateUserDto) => {
    delete data.numberIdentification;
    mutateAsync({
      ...data,
      typeIdentification: undefined
    }).then((data) => {
      console.log(data);
      dispatch(updateUser(data));
      dispatch(onLogin(data));
    });
  };

  const lengthIdentification =
    watch('typeIdentification') === TypeIdentification.CEDULA ? 10 : 13;

  return (
    <>
      <Container maxWidth='md'>
        <Card>
          <CardContent>
            <FormControl component='form' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Nombres'
                    fullWidth
                    {...register('firstName', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Minimo 2 caracteres' }
                    })}
                    helperText={
                      <Typography color='red'>
                        {errors.firstName?.message}{' '}
                      </Typography>
                    }
                    onKeyDown={(e) => {
                      const allowedCharsRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ ]*$/;
                      if (!allowedCharsRegex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Apellidos'
                    fullWidth
                    {...register('lastName', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                      // validar que solo entre texto
                    })}
                    helperText={
                      <Typography color='red'>
                        {errors.lastName?.message}{' '}
                      </Typography>
                    }
                    onKeyDown={(e) => {
                      const allowedCharsRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ ]*$/;
                      if (!allowedCharsRegex.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={6}> */}
                {/*   <FormControl fullWidth> */}
                {/*     <Controller */}
                {/*       name='typeIdentification' */}
                {/*       control={control} */}
                {/*       render={({ field: { onChange, onBlur, value } }) => ( */}
                {/*         <> */}
                {/*           <InputLabel id='select-seccion'> */}
                {/*             Tipo de identificación */}
                {/*           </InputLabel> */}
                {/*           <Select */}
                {/*             labelId='select-seccion' */}
                {/*             label='Tipo de identificación' */}
                {/*             fullWidth */}
                {/*             margin='dense' */}
                {/*             value={value} */}
                {/*             onChange={onChange} */}
                {/*             onBlur={onBlur} */}
                {/*           > */}
                {/*             <MenuItem value={TypeIdentification.CEDULA}> */}
                {/*               Cédula */}
                {/*             </MenuItem> */}
                {/*             <MenuItem value={TypeIdentification.RUC}> */}
                {/*               RUC */}
                {/*             </MenuItem> */}
                {/*           </Select> */}
                {/*         </> */}
                {/*       )} */}
                {/*     /> */}
                {/*   </FormControl> */}
                {/* </Grid> */}
                {/**/}
                {/* <Grid item xs={12} sm={6}> */}
                {/*   <TextField */}
                {/*     label='Número de identificación' */}
                {/*     fullWidth */}
                {/*     type='number' */}
                {/*     {...register('numberIdentification', { */}
                {/*       required: 'Este campo es requerido', */}
                {/**/}
                {/*       minLength: { */}
                {/*         value: lengthIdentification, */}
                {/*         message: `Minimo ${lengthIdentification} caracteres` */}
                {/*       }, */}
                {/*       maxLength: { */}
                {/*         value: lengthIdentification, */}
                {/*         message: `Máximo ${lengthIdentification} caracteres` */}
                {/*       } */}
                {/*     })} */}
                {/*     helperText={ */}
                {/*       <Typography color='red'> */}
                {/*         {errors.numberIdentification?.message}{' '} */}
                {/*       </Typography> */}
                {/*     } */}
                {/*   /> */}
                {/* </Grid> */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Nombre de usuario'
                    fullWidth
                    {...register('username', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Minimo 2 caracteres' }
                    })}
                    helperText={
                      <Typography color='red'>
                        {errors.username?.message}{' '}
                      </Typography>
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Email'
                    fullWidth
                    {...register('email', {
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email no válido'
                      },
                      minLength: { value: 2, message: 'Minimo 2 caracteres' }
                    })}
                    helperText={
                      <Typography color='red'>
                        {errors.email?.message}{' '}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Número de teléfono'
                    fullWidth
                    type='number'
                    {...register('numPhone', {
                      minLength: { value: 10, message: 'Minimo 10 caracteres' },
                      maxLength: { value: 10, message: 'Máximo 10 caracteres' }
                    })}
                    helperText={
                      <Typography color='red'>
                        {errors.numPhone?.message}{' '}
                      </Typography>
                    }
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <LoadingButton
                    variant='contained'
                    type='submit'
                    loading={isPending}
                  >
                    Actualizar
                  </LoadingButton>
                </Grid>
              </Grid>
            </FormControl>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
