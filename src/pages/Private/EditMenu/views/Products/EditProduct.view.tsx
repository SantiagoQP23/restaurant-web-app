import { Container } from '@mui/material/';

import { Navigate, useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { TitlePage } from '../../../components';
import { FormProduct } from './components/FormProduct.component';
import { ProductTags } from './components/ProductTags.component';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../redux';
import { Grid } from '@mui/material';

export const EditProduct = () => {
  const params = useParams();

  if (!params.id) {
    return <Navigate to='/menu/products' />;
  }
  // This update activeProduct in redux
  const { isPending, data: product } = useProduct(params.id);

  // const product = useSelector(selectMenu).activeProduct;

  if (isPending) {
    return <>Loading...</>;
  }

  if (!product) {
    return <>No se encontro el producto</>;
  }

  return (
    <>
      <TitlePage title={product.name} />

      {product && <FormProduct product={product} />}

      <Grid container spacing={2} sx={{ mt: 1, mb: 6 }}>
        <Grid item xs={12} md={6}>
          <ProductTags product={product} />
        </Grid>
      </Grid>
    </>
  );
};
