import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  InputAdornment,
  Typography,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  Button
} from '@mui/material';

import NiceModal, { useModal, muiDialogV5 } from '@ebay/nice-modal-react';
import { AttachMoney } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../../redux';
import { CreateProductDto } from '../../../../EditMenu/dto';
import { useCreateProduct } from '../../../../EditMenu/hooks/useProducts';

export const ModalCreateProduct = NiceModal.create(() => {
  const modal = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<CreateProductDto>();

  const { sections } = useSelector(selectMenu);

  const createProductMutation = useCreateProduct();

  const sectionsWithCategories = sections.filter(
    (section) => section.categories.length > 0
  );

  const closeModal = () => {
    modal.hide();
  };

  const onSubmit = (form: CreateProductDto) => {
    createProductMutation.mutateAsync(form).then(() => {
      closeModal();
    });
  };

  return (
    <Dialog {...muiDialogV5(modal)}>
      <DialogTitle variant='h4'>Crear producto</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin='dense'
                label='Nombre del producto'
                type='text'
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' }
                })}
                helperText={errors.name?.message}
                error={!!errors.name}
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
                margin='dense'
                fullWidth
                type='number'
                inputProps={{
                  step: 0.05
                }}
                {...register('price', {
                  required: 'Este campo es requerido',
                  min: {
                    value: 0,
                    message: 'El valor debe ser mayor a 0'
                  },
                  valueAsNumber: true
                })}
                helperText={errors.price?.message}
                error={!!errors.price}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='categoryId'
                control={control}
                rules={{ required: 'Este campo es requerido' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <FormControl fullWidth error={!!errors.categoryId}>
                      <InputLabel htmlFor='grouped-select'>
                        Categoría
                      </InputLabel>
                      <Select
                        id='grouped-select'
                        label='Categoría'
                        margin='dense'
                        fullWidth
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors.categoryId}
                      >
                        {sectionsWithCategories.map((section) => [
                          <ListSubheader
                            key={section.id}
                            sx={{
                              fontWeight: 'bold'
                            }}
                          >
                            {section.name}
                          </ListSubheader>,
                          ...section.categories.map((category) => (
                            <MenuItem
                              key={category.id}
                              value={category.id}
                              sx={{ pl: 3 }}
                            >
                              {category.name}
                            </MenuItem>
                          ))
                        ])}
                      </Select>
                      <Typography color='error' p={1}>
                        {errors.categoryId?.message}
                      </Typography>
                    </FormControl>
                  </>
                )}
              />
            </Grid>
          </Grid>

          <Stack mt={2} direction='row' justifyContent='right' spacing={2}>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button type='submit' variant='contained'>
              Crear
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
});
