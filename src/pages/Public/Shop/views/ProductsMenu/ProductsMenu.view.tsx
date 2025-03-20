import { Box, Button, Grid, Typography } from '@mui/material';

import NiceModal from '@ebay/nice-modal-react';

import { ComboBoxProducts } from '../../../../Private/EditMenu/components/products/ComboBoxProducts.component';
import { TitlePage } from '../../../../Private/components';
import { FilterList } from '@mui/icons-material';
import { Product } from '../../../../Private/Orders/views';
import { useSelector } from 'react-redux';
import { IProduct } from '../../../../../models';
import { selectMenu } from '../../../../../redux';
import { useMenu } from '../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { RegisteredModals } from '../../../../Private/modals';
import { useMemo } from 'react';

export const ProductsMenu = () => {
  const { activeCategory, products } = useSelector(selectMenu);

  const navigate = useNavigate();

  useMenu();

  const findPublicProducts = () =>
    products.filter((product) => product.isPublic && product.isActive);

  const findPublicProductsByCategory = (categoryId: string) => {
    return findPublicProducts()
      .filter((product) => product.category.id === categoryId)
      .filter((product) => product.isPublic && product.isActive);
  };

  const availableProducts = useMemo(() => {
    if (activeCategory) {
      return findPublicProductsByCategory(activeCategory.id);
    }

    return findPublicProducts();
  }, [products, activeCategory]);

  const showProduct = (productId: string) => {
    navigate(`/shop/product/${productId}`);
  };

  const navigateToProduct = (product: IProduct) => {
    navigate(`/shop/product/${product.id}`);
  };

  const openDrawerProductsFilter = () => {
    NiceModal.show(RegisteredModals.DrawerProductsFilter);
  };

  return (
    <>
      <TitlePage title='Productos' />

      <Box
        sx={{
          width: '250px'
        }}
      >
        <ComboBoxProducts selectProduct={navigateToProduct} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 2
        }}
      >
        <Typography variant='h4'>{activeCategory?.name}</Typography>

        <Button
          variant='text'
          endIcon={<FilterList />}
          color='inherit'
          onClick={openDrawerProductsFilter}
        >
          Categorías
        </Button>
      </Box>

      <Grid container spacing={2}>
        {activeCategory
          ? availableProducts.map((product) => (
              <Grid item key={product.id} xs={6} sm={3} lg={3} xl={2}>
                <Product product={product} onClick={showProduct} />
              </Grid>
            ))
          : availableProducts.slice(0, 10).map((product) => (
              <Grid item key={product.id} xs={6} sm={3} lg={3} xl={2}>
                <Product product={product} onClick={showProduct} />
              </Grid>
            ))}
      </Grid>

      {/* <CartWidget badge={1} /> */}
    </>
  );
};
