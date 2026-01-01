import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { CreateSupplierDto } from '../../../models/dto/create-supplier.dto';
import { TypeIdentification } from '../../../../../../models/common.model';
import { LoadingButton } from '@mui/lab';
import { useCreateSupplier } from '../../../hooks/useSuppliers';

export const AddSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<CreateSupplierDto>();

  const { isPending, mutateAsync } = useCreateSupplier();

  const typeIdentification = useWatch({ control, name: 'typeIdentification' });

  const lenghtIdentification =
    typeIdentification === TypeIdentification.CEDULA ? 10 : 13;

  const onSubmit = async (data: CreateSupplierDto) => {
    if (!data.email) delete data.email;

    if (!data.numPhone) delete data.numPhone;

    if (!data.numberIdentification) delete data.numberIdentification;

    if (!data.typeIdentification) delete data.typeIdentification;

    await mutateAsync(data).then((data) => {
      console.log(data);
      reset();
    });
  };

  return (
    <>
      <Card>
        <CardHeader title='Agregar proveedor' />
        <CardContent>
          <FormControl component='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <Controller
                  name='typeIdentification'
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
                          error={!!errors.typeIdentification}
                        >
                          <MenuItem value=''>Ninguno</MenuItem>
                          <MenuItem value={TypeIdentification.CEDULA}>
                            Cédula
                          </MenuItem>
                          <MenuItem value={TypeIdentification.RUC}>
                            RUC
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label='Número de identificación'
                  fullWidth
                  type='number'
                  {...register('numberIdentification', {
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
                      {errors.numberIdentification?.message}{' '}
                    </Typography>
                  }
                />
              </Grid>

              <Grid item xs={12}>
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
              <Grid item xs={12}>
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

              {/* <Grid item xs={12} >

            <TextField

              label="Dirección"
              rows={3}
              fullWidth
              multiline
              {
              ...register('address', {
                minLength: { value: 2, message: 'Minimo 2 caracteres' },
              })
              }
              helperText={<Typography color="red">{errors.address?.message} </ Typography>}
            />
          </Grid> */}

              <Grid item xs={12} display='flex' justifyContent='right'>
                <LoadingButton
                  variant='contained'
                  type='submit'
                  loading={isPending}
                >
                  Guardar
                </LoadingButton>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};
