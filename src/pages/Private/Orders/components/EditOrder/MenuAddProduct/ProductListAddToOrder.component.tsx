import { Grid } from '@mui/material';
import { FC } from 'react';
import { IProduct } from '../../../../../../models';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';

interface ProductsListProps {
  products: IProduct[];
}

export const ProductListAddToOrder: FC<ProductsListProps> = ({ products }) => {
  const { activeOrder } = useSelector(selectOrders);

  return (
    <>
      <Grid container spacing={1}>
        {products.map((product) => {
          if (product.isActive)
            return (
              <Grid key={product.id} item xs={12} md={4}>
                {/* {
                  activeOrder
                  ? <ProductAddToOrder product={product} />
                  : <ProductNewOrder product={product} />
                  
                } */}
              </Grid>
            );
        })}
      </Grid>
    </>
  );
};
