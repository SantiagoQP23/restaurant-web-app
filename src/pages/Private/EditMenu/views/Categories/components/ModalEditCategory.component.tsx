import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { LoadingButton } from '@mui/lab';
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
  TextField
} from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ICategory } from '../../../../../../models';
import { UpdateCategoryDto } from '../../../dto';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenu, updateCategory } from '../../../../../../redux';

import SaveIcon from '@mui/icons-material/Save';
import { useUpdateCategory } from '../../../hooks/useCategories';
import { useEditMenuStore } from '../../../hooks/useEditMenuStore';

export interface Props {
  category: ICategory;
}

const initialForm: UpdateCategoryDto = {
  id: '',
  name: '',
  sectionId: ''
};

export const ModalEditCategory = NiceModal.create<Props>(({ category }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<UpdateCategoryDto>({
    defaultValues: initialForm
  });

  const { sections } = useSelector(selectMenu);

  const dispatch = useDispatch();

  const { updateCategoryInSections, changeCategorySection } =
    useEditMenuStore();

  const modal = useModal();

  const { mutateAsync, isPending } = useUpdateCategory();

  const onSubmit = (updateCategoryDto: UpdateCategoryDto) => {
    mutateAsync(updateCategoryDto).then((updatedCategory) => {
      closeModal();
      dispatch(updateCategory(updatedCategory));

      if (updateCategoryDto.sectionId !== category.section.id) {
        changeCategorySection(updatedCategory, category.section.id);
      } else {
        updateCategoryInSections(updatedCategory);
      }
    });
  };

  const closeModal = () => {
    modal.hide();
  };

  useEffect(() => {
    reset({
      id: category.id,
      name: category.name,
      sectionId: category.section ? category.section.id : ''
    });
  }, []);

  return (
    <>
      <Dialog {...muiDialogV5(modal)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle color='inherit' variant='h5'>
            Editar categoría {category.name}
          </DialogTitle>

          <DialogContent>
            <Stack direction='column' spacing={2} mt={1}>
              <TextField
                autoFocus
                margin='dense'
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id='select-seccion'>Seccion</InputLabel>
                      <Select
                        labelId='select-seccion'
                        label='Seccion'
                        margin='dense'
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors.sectionId}
                      >
                        {sections.map((seccion) => (
                          <MenuItem key={seccion!.id} value={seccion.id!}>
                            {seccion.name}{' '}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color='inherit'>
              Cancelar
            </Button>
            <LoadingButton
              variant='contained'
              type='submit'
              loading={isPending}
              startIcon={<SaveIcon />}
            >
              Guardar
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
});
