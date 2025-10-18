import { FC } from 'react';
import { CreateUser } from '../models/create-user.model';
import { useWatch, useForm, Controller } from 'react-hook-form';
import { TypeIdentification } from '../../../../models/common.model';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel
} from '@mui/material';
import { ValidRoles } from '../../Common/models/valid-roles.model';

interface Props {
  user: CreateUser;
  onSubmit: (form: CreateUser) => void;
  loading: boolean;
  isNew: boolean;
  onReset?: () => void;
}

export const FormUser: FC<Props> = ({
  user,
  onSubmit,
  loading,
  isNew,
  onReset
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<CreateUser>({
    defaultValues: user
  });

  const identification = useWatch({ control, name: 'identification' });

  const lenghtIdentification =
    identification.type === TypeIdentification.CEDULA ? 10 : 13;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              })}
              helperText={
                <Typography color='red'>{errors.lastName?.message} </Typography>
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
            <FormControl fullWidth>
              <Controller
                name='identification.type'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <InputLabel id='select-seccion'>
                      Tipo de identificación
                    </InputLabel>
                    <Select
                      labelId='select-seccion'
                      label='Tipo de identificación'
                      fullWidth
                      margin='dense'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      <MenuItem value={TypeIdentification.CEDULA}>
                        Cédula
                      </MenuItem>
                      <MenuItem value={TypeIdentification.RUC}>RUC</MenuItem>
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Número de identificación'
              fullWidth
              type='number'
              {...register('identification.num', {
                required: 'Este campo es requerido',

                minLength: {
                  value: lenghtIdentification,
                  message: `Minimo ${lenghtIdentification} caracteres`
                },
                maxLength: {
                  value: lenghtIdentification,
                  message: `Máximo ${lenghtIdentification} caracteres`
                }
              })}
              helperText={
                <Typography color='red'>
                  {errors.identification?.num?.message}{' '}
                </Typography>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name='role.name'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <InputLabel id='select-identification'>Rol</InputLabel>
                    <Select
                      labelId='select-identification'
                      label='Rol'
                      fullWidth
                      margin='dense'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors.role?.name?.message}
                    >
                      <MenuItem value={ValidRoles.admin}>
                        Administrador
                      </MenuItem>
                      <MenuItem value={ValidRoles.mesero}>Mesero</MenuItem>
                      <MenuItem value={ValidRoles.despachador}>
                        Despachador
                      </MenuItem>
                    </Select>
                  </>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Nombre de usuario'
              fullWidth
              {...register('username', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              helperText={
                <Typography color='red'>{errors.username?.message} </Typography>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Email'
              fullWidth
              {...register('email', {
                required: 'Este campo es requerido',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email no válido'
                },
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              helperText={
                <Typography color='red'>{errors.email?.message} </Typography>
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
                <Typography color='red'>{errors.numPhone?.message} </Typography>
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
            <LoadingButton variant='contained' type='submit' loading={loading}>
              {isNew ? 'Crear' : 'Actualizar'}
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
