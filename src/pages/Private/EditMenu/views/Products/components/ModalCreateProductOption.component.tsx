import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  InputAdornment,
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
      reset
    } = useForm<CreateProductOptionDto>({
      defaultValues: {
        name: '',
        productId: product.id,
        price: product.price
      }
    });

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
                  <TextField
                    autoFocus
                    label='Nombre del producto'
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
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label='Precio'
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
