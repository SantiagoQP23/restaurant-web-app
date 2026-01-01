import { FC, useEffect, useState } from 'react';
import { IProduct, ProductStatus } from '../../../../../../models';
import { Add, AttachMoney, Save, Percent } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Box,
  Switch,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { UpdateProductDto } from '../../../dto';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenu, updateProduct } from '../../../../../../redux';

import { FormProductImage } from './';
import { useUpdateProduct } from '../../../hooks/useProducts';
import { useEditMenuStore } from '../../../hooks/useEditMenuStore';
import { useProductionAreasStore } from '../../../../Common/store/production-areas-store';
import NiceModal from '@ebay/nice-modal-react';
import { ModalCreateProductOption } from './ModalCreateProductOption.component';
import { ProductOptionItem } from './ProductOptionItem.component';
import { getPriceWithIva } from '@/helpers/product.helper';

interface Props {
  product: IProduct;
}

const initialForm: UpdateProductDto = {
  id: '',
  name: '',
  description: '',
  price: 0,
  isActive: false,
  isPublic: false,
  status: ProductStatus.AVAILABLE,
  categoryId: '',
  productionAreaId: 0,
  quantity: 0,
  unitCost: 0,
  iva: 0
};

/**
 * Component to edit a product
 * @author Santiago Quirumbay
 * @version 1.1 19/12/2023 Adds Product Options and use activeProduct
 * @author Steven Rosales
 * @version 1.2 15/03/2025 Add iva to product
 */
export const FormProduct: FC<Props> = ({ product }) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(product);

  const { productionAreas } = useProductionAreasStore();

  const [priceWithoutIva, setPriceWithoutIva] = useState<number>(
    getPriceWithIva(selectedProduct.price, selectedProduct.iva)
  );
  const [unitCostWithoutIva, setUnitCostWithoutIva] = useState<number>(
    getPriceWithIva(selectedProduct.unitCost, selectedProduct.iva)
  );

  const { sections } = useSelector(selectMenu);

  const { changeProductCategory } = useEditMenuStore();

  const dispatch = useDispatch();

  const { isPending, mutateAsync } = useUpdateProduct();

  const getUpdateProductDto = (product: IProduct) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { options, images, productionArea, category, ...restProduct } =
      product;
    const updateProductDto: UpdateProductDto = {
      ...restProduct,
      categoryId: category.id,
      productionAreaId: productionArea.id
    };
    console.log({ updateProductDto });
    return updateProductDto;
  };

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value || '0');
    setPriceWithoutIva(getPriceWithIva(value, selectedProduct.iva));
  };

  const onUnitCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value || '0');
    setUnitCostWithoutIva(getPriceWithIva(value, selectedProduct.iva));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
    reset
  } = useForm<UpdateProductDto>({
    defaultValues: initialForm
  });

  const onSubmit = (data: UpdateProductDto) => {
    mutateAsync(data)
      .then((updatedProduct) => {
        reset(getUpdateProductDto(updatedProduct));
        dispatch(updateProduct(updatedProduct));
        setSelectedProduct(updatedProduct);

        const currentCategoryId = updatedProduct.id;
        const oldCategoryId = selectedProduct.category.id;

        if (currentCategoryId !== oldCategoryId) {
          changeProductCategory(updatedProduct, oldCategoryId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    reset(getUpdateProductDto(selectedProduct));
    setPriceWithoutIva(
      getPriceWithIva(selectedProduct.price, selectedProduct.iva)
    );
    setUnitCostWithoutIva(
      getPriceWithIva(selectedProduct.unitCost, selectedProduct.iva)
    );
  }, [selectedProduct, sections]);

  useEffect(() => {
    reset(getUpdateProductDto(selectedProduct));
    setPriceWithoutIva(
      getPriceWithIva(selectedProduct.price, selectedProduct.iva)
    );
    setUnitCostWithoutIva(
      getPriceWithIva(selectedProduct.unitCost, selectedProduct.iva)
    );
  }, []);

  function showModalCreateOption(): void {
    NiceModal.show(ModalCreateProductOption, { product });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title='Imagenes del producto' />
              <CardContent>
                <FormProductImage product={product} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title='Información del producto' />
              <CardContent>
                <Grid item xs={12}>
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
                        label='Descripcion del producto'
                        multiline
                        rows={4}
                        fullWidth
                        {...register('description', {
                          minLength: {
                            value: 10,
                            message: 'Minimo 10 caracteres'
                          }
                        })}
                        helperText={errors.description?.message}
                      />
                    </Grid>
                    {sections && sections.length > 0 && (
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name='categoryId'
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <>
                              <FormControl fullWidth>
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
                              </FormControl>
                            </>
                          )}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='productionAreaId'
                        control={control}
                        rules={{ required: 'Este campo es requerido' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <>
                            <FormControl fullWidth>
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
                                error={!!errors.productionAreaId}
                              >
                                {productionAreas.map((area) => (
                                  <MenuItem key={area.id} value={area.id}>
                                    {area.name}
                                  </MenuItem>
                                ))}
                              </Select>
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

          <Grid item xs={12} md={6}>
            <Card>
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
                      onChange={onPriceChange}
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
                      onChange={onUnitCostChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label='IVA'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Percent />
                          </InputAdornment>
                        )
                      }}
                      fullWidth
                      type='number'
                      inputProps={{
                        step: 0.1
                      }}
                      {...register('iva', {
                        min: {
                          value: 0,
                          message: 'El valor debe ser mayor a 0'
                        },
                        max: {
                          value: 100,
                          message: 'El valor debe ser menor a 100'
                        },
                        valueAsNumber: true
                      })}
                      helperText={errors.iva?.message}
                      error={!!errors.iva}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      label='$ con IVA'
                      fullWidth
                      disabled
                      type='number'
                      value={priceWithoutIva}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      label='$ unitario con IVA'
                      fullWidth
                      disabled
                      type='number'
                      inputProps={{
                        step: 0.05
                      }}
                      value={unitCostWithoutIva}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title='Opciones'
                action={
                  <Button startIcon={<Add />} onClick={showModalCreateOption}>
                    Añadir
                  </Button>
                }
              />
              <List>
                {/* {product.options?.map((option) => ( */}
                {/*   <ProductOptionItem */}
                {/*     key={option.id} */}
                {/*     productOption={option} */}
                {/*     productId={selectedProduct.id} */}
                {/*   /> */}
                {/* ))} */}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title='Estados' />
              <List>
                <ListItem
                  secondaryAction={
                    <Controller
                      name='isActive'
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
                  <ListItemText primary='Activo' />
                </ListItem>
                <ListItem
                  secondaryAction={
                    <Controller
                      name='isPublic'
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
                  <ListItemText primary='Público' />
                </ListItem>
              </List>

              {/* <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <FormControlLabel
                      label="Activo"
                      control={
                        <Controller
                          name="isActive"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Switch
                              checked={value}
                              onChange={onChange}
                              color="success"
                            />
                          )}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    

                    <FormControlLabel
                      label="Público"
                      control={
                        <Controller
                          name="isPublic"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <Switch
                              checked={value}
                              onChange={onChange}
                              color="success"
                            />
                          )}
                        />
                      }
                    />
                  </Grid>
                </Grid> */}
            </Card>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
            mb: 4
          }}
        >
          <LoadingButton
            variant='contained'
            type='submit'
            disabled={!isValid}
            loading={isPending}
            startIcon={<Save />}
          >
            Editar
          </LoadingButton>
        </Box>
      </form>
    </>
  );
};
