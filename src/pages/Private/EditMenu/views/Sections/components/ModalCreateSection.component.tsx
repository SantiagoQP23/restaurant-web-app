import {
  TextField,
  Button,
  Typography,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  Box
} from '@mui/material/';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addSection } from '../../../../../../redux';

import { LoadingButton } from '@mui/lab';
import { useCreateSection } from '../../../hooks/useSections';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { CreateSectionDto } from '../../../dto';
import { Stack } from '@mui/system';

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
    console.log('Creating section', form);
    createSectionMutation.mutateAsync(form).then((data) => {
      dispatch(addSection({ ...data, categories: [] }));
      closeModal();
    });
  }

  return (
    <>
      <Dialog {...muiDialogV5(modal)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack sx={{ p: 4 }} gap={3}>
            <Stack gap={1}>
              <Typography variant='h4'>Nueva sección</Typography>
              <Typography variant='body1'>
                Organiza tus categorias en secciones
              </Typography>
            </Stack>

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
              helperText={errors.name?.message}
            />
            <Stack direction='row' justifyContent='end' gap={2}>
              <Button onClick={closeModal} color='inherit'>
                Cancelar
              </Button>
              <LoadingButton
                loading={createSectionMutation.isPending}
                variant='contained'
                color='primary'
                type='submit'
              >
                Crear
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Dialog>
    </>
  );
});
