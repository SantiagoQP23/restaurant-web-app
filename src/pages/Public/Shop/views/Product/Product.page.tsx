import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../../../Private/EditMenu/hooks/useProducts';
import {
  Box,
  Grid,
  Stack,
  Typography,
  styled,
  Rating,
  Button
} from '@mui/material';
import { formatMoney } from '../../../../Private/Common/helpers/format-money.helper';
import { Label } from '../../../../../components/ui';
import { ShoppingCart } from '@mui/icons-material';
import { TitlePage } from '../../../../Private/components';
import { LabelProductStatus } from '../../../../../components/ui/LabelProductStatus.component';

const StyledProductImg = styled('img')({
  width: '100%',
  height: '100%',
  borderRadius: 8,
  objectFit: 'cover',
  position: 'relative'
});

export const Product = () => {
  const { id = '' } = useParams();

  const { data: product, isPending } = useProduct(id);

  if (isPending) return <div>Cargando...</div>;

  if (!product) return <div>Producto no encontrado</div>;

  return (
    <>
      <TitlePage title={product.name} />

      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} md={6}>
          <StyledProductImg
            alt={product.name}
            src={product.images || '/static/images/products/no-image.png'}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Box sx={{ width: 200 }}>
              <LabelProductStatus status={product.status} />
            </Box>

            <Typography variant='h4'>{product.name}</Typography>

            <Typography variant='h6'>{formatMoney(product.price)}</Typography>

            <Rating name='read-only' value={4.5} readOnly />

            <Typography variant='body1'>{product.description}</Typography>

            <Box>
              <Button variant='contained' startIcon={<ShoppingCart />} disabled>
                Agregar al carrito
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
