import { useEffect } from 'react';
import { TitlePage } from '../../../components';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { CreateProductDto } from '../../dto';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectMenu } from '../../../../../redux';
import { IProduct, ProductStatus } from '../../../../../models';
import { AttachMoney } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useCreateProduct } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import { useEditMenuStore } from '../../hooks/useEditMenuStore';
import { useProductionAreasStore } from '../../../Common/store/production-areas-store';

export interface ProductForm {
  name: string;
  price: number;
  categoryId: string;
  description?: string;
  status?: ProductStatus;
  productionAreaId?: number | '';
  unitCost?: number;
  quantity?: number;
}

const initialForm: ProductForm = {
  name: '',
  description: '',
  price: 0,
  status: ProductStatus.AVAILABLE,
  categoryId: '',
  productionAreaId: '',
  unitCost: 0,
  quantity: 0
};

export const CreateProduct = () => {
  const { sections, activeCategory } = useSelector(selectMenu);
  const { productionAreas } = useProductionAreasStore();

  const { mutateAsync, isPending } = useCreateProduct();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { findCategoryById, addProductToCategory } = useEditMenuStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<ProductForm>({
    defaultValues: initialForm
  });

  const updateCategoryProducts = (product: IProduct) => {
    const category = findCategoryById(product.category.id);

    if (!category) return;

    addProductToCategory(product, category);
  };

  const onSubmit = (data: ProductForm) => {
    console.log(data);
    const productData: CreateProductDto = {
      ...data,
      productionAreaId:
        data.productionAreaId === '' ? undefined : data.productionAreaId
    };
    mutateAsync(productData).then((product) => {
      dispatch(addProduct(product));
      updateCategoryProducts(product);
      navigateToEditProduct(product.id);
    });
  };

  const navigateToEditProduct = (productId: string) => {
    navigate(`/menu/products/${productId}/edit`);
  };

  useEffect(() => {
    reset({
      ...initialForm,
      status: ProductStatus.AVAILABLE,
      categoryId: activeCategory?.id
    });
  }, []);

  return (
    <>
      <Container>
        <TitlePage title='Crear producto' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title='Información del producto' />
                <CardContent>
                  <Grid item xs={12}>
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
                          error={!!errors.name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label='Descripcion del producto'
                          multiline
                          rows={4}
                          fullWidth
                          {...register('description', {
                            minLength: {
                              value: 2,
                              message: 'Minimo 2 caracteres'
                            }
                          })}
                          helperText={errors.description?.message}
                          error={!!errors.description}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='categoryId'
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                {...register('categoryId', {
                                  required: 'Este campo es requerido'
                                })}
                                error={!!errors.categoryId}
                              >
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
                                >
                                  {sections.map((section) => [
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
                                {errors.categoryId && (
                                  <FormHelperText>
                                    {errors.categoryId?.message}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='productionAreaId'
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <>
                              <FormControl
                                fullWidth
                                {...register('productionAreaId', {
                                  required: 'Este campo es requerido'
                                })}
                                error={!!errors.productionAreaId}
                              >
                                <InputLabel id='select-area'>
                                  Área de producción
                                </InputLabel>
                                <Select
                                  labelId='select-area'
                                  label='Área de producción'
                                  margin='dense'
                                  // disabled
                                  value={value}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                >
                                  {productionAreas.map((area) => (
                                    <MenuItem key={area.id} value={area.id}>
                                      {area.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {errors.productionAreaId && (
                                  <FormHelperText>
                                    {errors.productionAreaId?.message}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ mb: 2 }}>
                <CardHeader title='Precios' />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
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

                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Costo unitario'
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
                        {...register('unitCost', {
                          min: {
                            value: 0,
                            message: 'El valor debe ser mayor a $0'
                          },
                          valueAsNumber: true
                        })}
                        helperText={errors.unitCost?.message}
                        error={!!errors.unitCost}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card>
                <CardHeader title='Inventario' />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Controller
                        name='status'
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <>
                            <FormControl fullWidth>
                              <InputLabel id='select-estado'>Estado</InputLabel>

                              <Select
                                labelId='select-estado'
                                label='Estado'
                                fullWidth
                                margin='dense'
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!errors.status?.type}
                              >
                                <MenuItem value={ProductStatus.AVAILABLE}>
                                  Disponible
                                </MenuItem>
                                <MenuItem value={ProductStatus.OUT_OF_SEASON}>
                                  Fuera de temporada
                                </MenuItem>
                                <MenuItem value={ProductStatus.OUT_OF_STOCK}>
                                  Fuera de stock
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label='Cantidad disponible'
                        fullWidth
                        type='number'
                        inputProps={{
                          min: 0,
                          step: 1
                        }}
                        {...register('quantity', {
                          min: {
                            value: 0,
                            message: 'El valor debe ser mayor a 0'
                          },
                          valueAsNumber: true
                        })}
                        helperText={errors.quantity?.message}
                        error={!!errors.quantity}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}></Grid>
          </Grid>
          <Box display='flex' justifyContent='flex-end' mt={2}>
            <LoadingButton
              variant='contained'
              type='submit'
              // disabled={isDirty && !isValid}
              loading={isPending}
            >
              Crear
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </>
  );
};
