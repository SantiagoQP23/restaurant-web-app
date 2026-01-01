import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { useCreateProductionArea } from '../hooks/useProductionArea';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { CreateProductionAreaDto } from '../dto/create-production-area.dto';
import { Save } from '@mui/icons-material';

export const ModalCreateProductionArea = NiceModal.create(() => {
  const modal = useModal();

  const {
    handleSubmit,
    formState: { errors, isDirty },
    register
  } = useForm<CreateProductionAreaDto>();

  const { isPending, mutateAsync } = useCreateProductionArea();

  const closeModal = () => {
    modal.hide();
  };

  const onSubmit = (data: CreateProductionAreaDto) => {
    mutateAsync(data).then(() => {
      closeModal();
    });
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle variant='h5'>Crear area de producción</DialogTitle>

        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            autoFocus
            label='Nombre del área'
            type='text'
            fullWidth
            {...register('name', {
              required: 'Este campo es requerido',
              minLength: { value: 2, message: 'Minimo 2 caracteres' }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            sx={{ mt: 2 }}
            autoFocus
            label='Descripción del área'
            type='text'
            fullWidth
            {...register('description')}
            error={!!errors.name}
            helperText={errors.name?.message}
            rows={2}
            multiline
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <LoadingButton
            loading={isPending}
            type='submit'
            variant='contained'
            disabled={!isDirty}
            startIcon={<Save />}
          >
            Guardar
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
});
