import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
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
      reset
    } = useForm<UpdateProductOptionDto>({
      defaultValues: {
        ...productOption,
        productId: productId
      }
    });

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

                <Grid item xs={12}>
                  <List>
                    <ListItem
                      secondaryAction={
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
                    >
                      <ListItemText primary='Disponible' />
                    </ListItem>
                  </List>
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
