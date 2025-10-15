import { Container } from '@mui/material/';

import { Navigate, useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { TitlePage } from '../../../components';
import { FormProduct } from './components/FormProduct.component';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../redux';

export const EditProduct = () => {
  const params = useParams();

  if (!params.id) {
    return <Navigate to='/menu/products' />;
  }
  // This update activeProduct in redux
  const { isLoading, data: product } = useProduct(params.id);

  // const product = useSelector(selectMenu).activeProduct;

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!product) {
    return <>No se encontro el producto</>;
  }

  return (
    <>
      <TitlePage title={product.name} />

      {product && <FormProduct product={product} />}
    </>
  );
};
