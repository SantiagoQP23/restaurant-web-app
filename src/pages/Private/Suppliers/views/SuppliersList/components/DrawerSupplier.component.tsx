import {
  Drawer,
  useTheme,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useDrawerSupplierStore } from '../../../store/drawerSupplierStore';
import { CloseOutlined, Print, DeleteOutline } from '@mui/icons-material';
import { UpdateSupplierDto } from '../../../models/dto/udpate-supplier.dto';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { TypeIdentification } from '../../../../../../models/common.model';
import { LoadingButton } from '@mui/lab';
import { updateSupplier } from '../../../services/suppliers.service';
import { Supplier } from '../../../models/supplier.model';
import { FC } from 'react';
import { useUpdateSupplier } from '../../../hooks/useSuppliers';

interface Props {
  supplier: Supplier;
}
export const DrawerSupplier: FC<Props> = ({ supplier }) => {
  const theme = useTheme();

  const { open, handleCloseDrawer } = useDrawerSupplierStore();

  let updateSupplierDto: UpdateSupplierDto;

  updateSupplierDto = {
    id: supplier?.id || '',
    firstName: supplier?.person.firstName || 'dsaf',
    lastName: supplier?.person.lastName || '',
    email: supplier?.person.email || '',
    numPhone: supplier?.person.numPhone || '',
    numberIdentification: supplier?.person.identification?.num || ''
    // typeIdentification: activeSupplier?.person.identification?.type || '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<UpdateSupplierDto>({
    defaultValues: updateSupplierDto
  });

  const { mutateAsync, isPending } = useUpdateSupplier();

  const typeIdentification = useWatch({ control, name: 'typeIdentification' });

  const lenghtIdentification =
    typeIdentification === TypeIdentification.CEDULA ? 10 : 13;

  const onSubmit = async (data: UpdateSupplierDto) => {
    if (!data.email) delete data.email;

    if (!data.numPhone) delete data.numPhone;

    if (!data.numberIdentification) delete data.numberIdentification;

    if (!data.typeIdentification) delete data.typeIdentification;

    await mutateAsync(data).then((data) => {
      console.log(data);
      handleCloseDrawer();
    });
  };

  return (
    <>
      <Drawer
        anchor='right'
        open={open}
        onClose={() => {
          handleCloseDrawer();
        }}
        sx={{
          width: 'auto',
          zIndex: 10000
        }}
      >
        <Box
          sx={{
            display: 'flex',
            p: 1,
            [theme.breakpoints.down('sm')]: { width: '100vw' },
            [theme.breakpoints.up('sm')]: { width: 500, flexShrink: 0 }

            // width: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '100%' },
          }}
        >
          {false ? (
            <Box>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                No hay factura seleccionada
              </Typography>
            </Box>
          ) : (
            <>
              <Stack direction='column' spacing={2} width='100%'>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <IconButton onClick={handleCloseDrawer}>
                    <CloseOutlined />
                  </IconButton>
                  <Stack direction='row' spacing={1}>
                    <Button variant='outlined' color='error' size='small'>
                      Eliminar
                    </Button>
                  </Stack>
                </Stack>
                <Divider />

                <Box px={2}>
                  <Typography variant='h4'>
                    Editar proveedor {supplier?.person.firstName}
                  </Typography>
                </Box>

                <FormControl component='form' onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12}>
                      <TextField
                        label='Nombres'
                        fullWidth
                        {...register('firstName', {
                          required: 'Este campo es requerido',
                          minLength: {
                            value: 2,
                            message: 'Minimo 2 caracteres'
                          },
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
                          minLength: {
                            value: 2,
                            message: 'Minimo 2 caracteres'
                          },

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
                          minLength: {
                            value: 2,
                            message: 'Minimo 2 caracteres'
                          }
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
                          minLength: {
                            value: 10,
                            message: 'Minimo 10 caracteres'
                          },
                          maxLength: {
                            value: 10,
                            message: 'Máximo 10 caracteres'
                          }
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
                        Actualizar
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </FormControl>
              </Stack>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};
