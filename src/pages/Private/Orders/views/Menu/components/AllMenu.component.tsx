import { FC, useMemo } from 'react';

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../../redux';

import { ListProducts } from './';

export const AllMenu: FC = () => {
  const { activeCategory, products } = useSelector(selectMenu);

  const activeProducts = useMemo(() => {
    return products.filter((product) => product.isActive);
  }, [products]);

  const productsByCategory = useMemo(() => {
    if (activeCategory) {
      return activeProducts.filter(
        (product) => product.category.id === activeCategory.id
      );
    }
    return [];
  }, [activeCategory]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {activeCategory ? (
            <ListProducts products={productsByCategory} />
          ) : (
            <ListProducts products={activeProducts.slice(0, 10)} />
          )}
        </Grid>
      </Grid>
    </>
  );
};
