import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Box,
  Button,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Switch,
  TextField
} from '@mui/material';
import { ProductOption } from '../../../../../../models';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { UpdateProductOptionDto } from '../../../dto';
import { useUpdateProductOption } from '../../../hooks/useProductOptions';
import { AttachMoney } from '@mui/icons-material';

interface Props {
  productOption: ProductOption;
  productId: string;
}

/**
 * Modal to update a product option from a product
 * @author Santiago Quirumbay
 * @version 1.0 18/12/2023
 */
export const ModalUpdateProductOption = NiceModal.create<Props>(
  ({ productOption, productId }) => {
    const modal = useModal();

    const { mutateAsync, isPending } = useUpdateProductOption(productId);

    const {
      control,
      handleSubmit,
      formState: { errors, isDirty },
      register,
      reset,
      watch
    } = useForm<UpdateProductOptionDto>({
      defaultValues: {
        ...productOption,
        cost: productOption.cost ?? 0,
        trackStock: productOption.manageStock ?? false,
        quantity: productOption.quantity ?? 0,
        productId: productId
      }
    });

    const manageStock = watch('trackStock');

    const onSubmit = (data: UpdateProductOptionDto) => {
      mutateAsync({ id: productOption.id, productionArea: data }).then(() => {
        reset();
        closeModal();
      });
    };

    const closeModal = () => {
      modal.hide();
    };

    return (
      <>
        <Dialog {...muiDialogV5(modal)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle variant='h5'>Editar {productOption.name}</DialogTitle>
            <CardContent
              sx={{
                width: 300
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel>Nombre de la variante</InputLabel>
                  <TextField
                    autoFocus
                    size='small'
                    type='text'
                    fullWidth
                    {...register('name', {
                      required: 'Este campo es requerido',
                      minLength: {
                        value: 2,
                        message: 'Minimo 2 caracteres'
                      }
                    })}
                    helperText={errors.name?.message}
                    error={!!errors.name}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel>Precio</InputLabel>
                  <TextField
                    size='small'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AttachMoney />
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                    type='number'
                    inputProps={{
                      step: 0.05
                    }}
                    {...register('price', {
                      required: 'Este campo es requerido',
                      min: {
                        value: 0.25,
                        message: 'El valor debe ser mayor a $0.25'
                      },
                      valueAsNumber: true
                    })}
                    helperText={errors.price?.message}
                    error={!!errors.price}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel>Costo</InputLabel>
                  <TextField
                    size='small'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AttachMoney />
                        </InputAdornment>
                      )
                    }}
                    fullWidth
                    type='number'
                    inputProps={{
                      step: 0.05
                    }}
                    {...register('cost', {
                      required: 'Este campo es requerido',
                      min: {
                        value: 0,
                        message: 'El valor debe ser mayor o igual a $0'
                      },
                      valueAsNumber: true
                    })}
                    helperText={errors.cost?.message}
                    error={!!errors.cost}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-start'
                    minHeight='44px'
                  >
                    <FormControlLabel
                      control={<Checkbox {...register('trackStock')} />}
                      label='Manejar inventario'
                    />
                  </Box>
                </Grid>

                {manageStock && (
                  <Grid item xs={12} md={6}>
                    <InputLabel>Stock inicial</InputLabel>
                    <TextField
                      size='small'
                      fullWidth
                      type='number'
                      inputProps={{
                        step: 1,
                        min: 0
                      }}
                      {...register('quantity', {
                        required:
                          'Este campo es requerido cuando se maneja inventario',
                        min: {
                          value: 0,
                          message: 'El valor debe ser mayor o igual a 0'
                        },
                        valueAsNumber: true
                      })}
                      helperText={errors.quantity?.message}
                      error={!!errors.quantity}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <FormControlLabel
                    label='Disponible'
                    control={
                      <Controller
                        name='isAvailable'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Switch
                            checked={value}
                            onChange={onChange}
                            color='success'
                          />
                        )}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>

            <DialogActions>
              <Button onClick={closeModal}>Cancelar</Button>
              <LoadingButton
                variant='contained'
                color='primary'
                loading={isPending}
                type='submit'
                disabled={!isDirty}
              >
                Aceptar
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
);
