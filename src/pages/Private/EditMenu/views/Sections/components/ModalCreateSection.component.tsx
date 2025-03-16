import {
  TextField,
  Button,
  Typography,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle
} from '@mui/material/';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addSection } from '../../../../../../redux';

import { LoadingButton } from '@mui/lab';
import { useCreateSection } from '../../../hooks/useSections';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { CreateSectionDto } from '../../../dto';

export const ModalCreateSection = NiceModal.create(() => {
  const modal = useModal();

  const dispatch = useDispatch();

  const closeModal = () => {
    modal.hide();
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateSectionDto>({
    defaultValues: { name: '' }
  });

  const createSectionMutation = useCreateSection();

  async function onSubmit(form: CreateSectionDto) {
    createSectionMutation.mutateAsync(form).then((data) => {
      dispatch(addSection({ ...data, categories: [] }));
    });
  }

  return (
    <>
      <Dialog {...muiDialogV5(modal)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Nueva sección</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Nombre de la sección'
              type='text'
              fullWidth
              {...register('name', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              error={!!errors.name}
              helperText={
                <Typography color='red'>{errors.name?.message}</Typography>
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color='inherit'>
              Cancelar
            </Button>
            <LoadingButton
              loading={createSectionMutation.isLoading}
              variant='contained'
              color='primary'
              onClick={() => {
                handleSubmit(onSubmit);
              }}
            >
              Crear
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
});
