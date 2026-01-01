import { useEffect } from 'react';

import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, selectMenu } from '../../../../../../redux';
import { CreateCategoryDto } from '../../../dto';
import { LoadingButton } from '@mui/lab';
import { useCreateCategory } from '../../../hooks/useCategories';
import { useEditMenuStore } from '../../../hooks/useEditMenuStore';

export const ModalCreateCategory = NiceModal.create(() => {
  const modal = useModal();

  const dispatch = useDispatch();

  const { sections, activeSection } = useSelector(selectMenu);

  const { isPending, mutateAsync } = useCreateCategory();

  const { addCategoryToSection } = useEditMenuStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    register,
    reset
  } = useForm<CreateCategoryDto>();

  const closeModal = () => {
    modal.hide();
  };

  const onSubmit = (data: CreateCategoryDto) => {
    mutateAsync(data).then((category) => {
      dispatch(addCategory(category));
      addCategoryToSection(category, category.section.id);

      closeModal();
    });
  };

  useEffect(() => {
    const initialForm: CreateCategoryDto = {
      name: '',
      sectionId: activeSection?.id || ''
    };
    reset(initialForm);
  }, []);

  return (
    <Dialog {...muiDialogV5(modal)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ p: 4 }} gap={3}>
          <Stack gap={1}>
            <Typography variant='h4'>Nueva categoría</Typography>
            <Typography variant='body1'>
              Organiza tus productos en categorías
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <TextField
              autoFocus
              label='Nombre de la Categoria'
              type='text'
              fullWidth
              {...register('name', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <Controller
              name='sectionId'
              control={control}
              rules={{ required: 'Este campo es requerido' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel id='select-seccion'>Seccion</InputLabel>
                    <Select
                      labelId='select-seccion'
                      label='Seccion'
                      margin='dense'
                      // disabled
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors.sectionId}
                    >
                      {sections.map((seccion) => (
                        <MenuItem key={seccion.id} value={seccion.id}>
                          {seccion.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            />
          </Stack>

          <Stack direction='row' justifyContent='end' gap={2}>
            <Button onClick={closeModal}>Cancelar</Button>
            <LoadingButton
              loading={isPending}
              type='submit'
              variant='contained'
              disabled={!isDirty}
            >
              Guardar
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
});
