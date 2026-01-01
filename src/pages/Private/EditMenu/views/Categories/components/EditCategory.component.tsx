import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  Grid,
  CardHeader,
  CardContent
} from '@mui/material/';
// MOdal

import { Controller, useForm } from 'react-hook-form';
import { ICreateCategory } from '../../../../../../models/menu.model';

import { LoadingButton } from '@mui/lab';

import { useAppDispatch } from '../../../../../../hooks';

import { ArrowBack } from '@mui/icons-material';
import {
  addCategory,
  updateCategory
} from '../../../../../../redux/slices/menu/menu.thunks';
import {
  resetActiveCategory,
  selectMenu,
  setActiveCategory
} from '../../../../../../redux';
import { Container, FormControl, Card } from '@mui/material';

import {
  useCreateCategory,
  useUpdateCategory
} from '../../../hooks/useCategories';

const initialForm = (sectionId: string): ICreateCategory => {
  return {
    name: '',
    sectionId
  };
};

interface Props {}

export const EditCategory: FC<Props> = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { activeCategory, activeSection, sections } = useSelector(selectMenu);

  let category: ICreateCategory;

  if (activeCategory) {
    const { id, section, products, ...restCategory } = activeCategory!;

    category = { ...restCategory, sectionId: activeSection!.id };
  } else {
    category = { name: '', sectionId: activeSection!.id };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<ICreateCategory>({
    defaultValues: category
  });

  const updateCategoryMutation = useUpdateCategory();

  const createCategoryMutation = useCreateCategory();

  async function onSubmit(form: ICreateCategory) {
    if (activeCategory) {
      updateCategoryMutation
        .mutateAsync({ ...form, id: activeCategory.id })
        .then((data) => {
          dispatch(updateCategory(data));
          dispatch(setActiveCategory({ ...activeCategory, ...data }));
        });
    } else {
      createCategoryMutation.mutateAsync(form).then((data) => {
        dispatch(addCategory(data));
        dispatch(setActiveCategory({ ...data, products: [] }));
      });
    }
  }

  return (
    <>
      <Container maxWidth='xs'>
        <Grid container display='flex' justifyContent='space-between'>
          <Grid item display='flex' justifyContent='left' alignItems='center'>
            <Button onClick={() => navigate(-1)}>
              <ArrowBack />
            </Button>
            <Typography variant='h6'>
              {' '}
              {activeCategory ? activeCategory.name : 'Añadir Categoria'}
            </Typography>
          </Grid>
        </Grid>

        <Card>
          <CardHeader title='Datos de la Categoria' />

          <CardContent sx={{ my: 0, py: 0 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                helperText={
                  <Typography variant='body1' color='red'>
                    {errors.name?.message}
                  </Typography>
                }
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
                        disabled
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

              <LoadingButton
                variant='outlined'
                type='submit'
                loading={
                  updateCategoryMutation.isPending ||
                  createCategoryMutation.isPending
                }
              >
                {activeCategory ? 'Editar' : 'Crear'}
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
