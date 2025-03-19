import { FC } from 'react';
import { ICreateClient } from '../../../../models/client.model';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import {
  Grid,
  Select,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel
} from '@mui/material';
import { TypeIdentification } from '../../../../models/common.model';

interface Props {
  client: ICreateClient;
  onSubmit: (form: ICreateClient) => void;
  loading: boolean;
  msg?: string;
}

export const FormClient: FC<Props> = ({ client, onSubmit, loading, msg }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<ICreateClient>({
    defaultValues: client
  });

  const identification = useWatch({ control, name: 'identification' });

  const lenghtIdentification =
    identification.type === TypeIdentification.CEDULA ? 10 : 13;

  return (
    <>
      <FormControl component='form' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nombres'
              fullWidth
              {...register('firstName', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Minimo 2 caracteres' },
                validate: (value: any) => {
                  if (!isNaN(value)) {
                    return 'No se permiten números en este campo';
                  }
                }
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
                minLength: { value: 2, message: 'Minimo 2 caracteres' },

                validate: (value: any) => {
                  if (!isNaN(Number(value)))
                    return 'No se permiten números en este campo';
                  return true;
                }
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
            <Controller
              name='identification.type'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <FormControl fullWidth>
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
                      error={!!errors.identification?.type}
                    >
                      <MenuItem value={TypeIdentification.CEDULA}>
                        Cédula
                      </MenuItem>
                      <MenuItem value={TypeIdentification.RUC}>RUC</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Número de identificación'
              fullWidth
              type='number'
              {...register('identification.num', {
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

          <Grid item xs={12}>
            <TextField
              label='Dirección'
              rows={3}
              fullWidth
              multiline
              {...register('address', {
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              helperText={
                <Typography color='red'>{errors.address?.message} </Typography>
              }
            />
          </Grid>

          <Grid item xs={12} display='flex' justifyContent='right'>
            <LoadingButton variant='contained' type='submit' loading={loading}>
              {msg || 'Guardar'}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};
