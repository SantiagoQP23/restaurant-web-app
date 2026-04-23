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
  TextField
} from '@mui/material';
import { IProduct } from '../../../../../../models';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { CreateProductOptionDto } from '../../../dto';
import { useCreateProductOption } from '../../../hooks/useProductOptions';
import { AttachMoney } from '@mui/icons-material';

interface Props {
  product: IProduct;
}

export const ModalCreateProductOption = NiceModal.create<Props>(
  ({ product }) => {
    const modal = useModal();

    const { mutateAsync, isPending } = useCreateProductOption(product.id);

    const {
      handleSubmit,
      formState: { errors, isDirty },
      register,
      reset,
      watch
    } = useForm<CreateProductOptionDto>({
      defaultValues: {
        name: '',
        productId: product.id,
        price: product.price,
        cost: 0,
        trackStock: false,
        quantity: 0,
        isDefault: false
      }
    });

    const manageStock = watch('trackStock');

    const onSubmit = (data: CreateProductOptionDto) => {
      mutateAsync(data).then(() => {
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
            <DialogTitle variant='h5'>
              Añadir opción de {product.name}
            </DialogTitle>
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
