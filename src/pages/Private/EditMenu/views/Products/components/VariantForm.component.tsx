import { Controller, useFormContext } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Stack,
  TextField
} from '@mui/material';
import { AttachMoney, Delete } from '@mui/icons-material';
import { ProductForm } from '../CreateProduct.view';

interface VariantFormProps {
  index: number;
  onRemove: (index: number) => void;
}

export const VariantForm = ({ index, onRemove }: VariantFormProps) => {
  const {
    register,
    control,
    formState: { errors },
    watch
  } = useFormContext<ProductForm>();

  const manageStockFieldName = `variants.${index}.manageStock` as const;
  const manageStock = watch(manageStockFieldName);

  return (
    <Card
      sx={{
        mb: 2,
        border: 1,
        borderColor: 'divider',
        boxShadow: 'none'
      }}
    >
      <CardHeader
        title={`Variante ${index + 1}`}
        action={
          <Button
            startIcon={<Delete />}
            color='error'
            size='small'
            onClick={() => onRemove(index)}
            disabled={index <= 1} // Deshabilitar el botón para la primera variante
          >
            Eliminar
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12}>
            <InputLabel>Nombre de la variante</InputLabel>
            <TextField
              size='small'
              fullWidth
              type='text'
              {...register(`variants.${index}.name`, {
                required: 'Este campo es requerido',
                minLength: {
                  value: 2,
                  message: 'Mínimo 2 caracteres'
                }
              })}
              helperText={errors.variants?.[index]?.name?.message}
              error={!!errors.variants?.[index]?.name}
            />
          </Grid>

          {/* Price Field */}
          <Grid item xs={12} md={6}>
            <InputLabel>Precio</InputLabel>
            <TextField
              size='small'
              fullWidth
              type='number'
              inputProps={{
                step: 0.05
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                )
              }}
              {...register(`variants.${index}.price`, {
                required: 'Este campo es requerido',
                min: {
                  value: 0.25,
                  message: 'El valor debe ser mayor a $0.25'
                },
                valueAsNumber: true
              })}
              helperText={errors.variants?.[index]?.price?.message}
              error={!!errors.variants?.[index]?.price}
            />
          </Grid>

          {/* Cost Field */}
          <Grid item xs={12} md={6}>
            <InputLabel>Costo</InputLabel>
            <TextField
              size='small'
              fullWidth
              type='number'
              inputProps={{
                step: 0.05
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                )
              }}
              {...register(`variants.${index}.cost`, {
                required: 'Este campo es requerido',
                min: {
                  value: 0,
                  message: 'El valor debe ser mayor o igual a $0'
                },
                valueAsNumber: true
              })}
              helperText={errors.variants?.[index]?.cost?.message}
              error={!!errors.variants?.[index]?.cost}
            />
          </Grid>

          {/* Manage Stock Checkbox */}
          <Grid item xs={12}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='flex-start'
              minHeight='44px'
            >
              <FormControlLabel
                control={
                  <Checkbox {...register(`variants.${index}.manageStock`)} />
                }
                label='Manejar inventario'
              />
            </Box>
          </Grid>

          {/* Default Stock Field - Conditional */}
          {manageStock && (
            <Grid item xs={12} md={6}>
              <InputLabel>Stock inicial</InputLabel>
              <TextField
                size='small'
                fullWidth
                type='number'
                inputProps={{
                  step: 1,
                  min: 0
                }}
                {...register(`variants.${index}.defaultStock`, {
                  required:
                    'Este campo es requerido cuando se maneja inventario',
                  min: {
                    value: 0,
                    message: 'El valor debe ser mayor o igual a 0'
                  },
                  valueAsNumber: true
                })}
                helperText={errors.variants?.[index]?.defaultStock?.message}
                error={!!errors.variants?.[index]?.defaultStock}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
