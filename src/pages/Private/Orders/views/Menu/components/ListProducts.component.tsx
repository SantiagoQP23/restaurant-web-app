import { FC } from 'react';

import { Grid } from '@mui/material';
import { IProduct } from '../../../../../../models/menu.model';
import { Product } from './Product.component';

interface ProductsListProps {
  products: IProduct[];
}

export const ListProducts: FC<ProductsListProps> = ({ products }) => {
  return (
    <>
      <Grid container spacing={2}>
        {products.map((product) => {
          if (product.isActive)
            return (
              <Grid key={product.id} item xs={6} sm={5} md={3}>
                <Product product={product} onClick={() => {}} />
              </Grid>
            );
        })}
      </Grid>
    </>
  );
};
