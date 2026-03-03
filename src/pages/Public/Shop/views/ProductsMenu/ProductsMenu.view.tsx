import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';

import NiceModal from '@ebay/nice-modal-react';

import { TitlePage } from '../../../../Private/components';
import { FilterList, SearchOutlined, ClearOutlined } from '@mui/icons-material';
import { Product } from '../../../../Private/Orders/views';
import { useSelector } from 'react-redux';
import { IProduct } from '../../../../../models';
import { selectMenu } from '../../../../../redux';
import { useMenu } from '../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { RegisteredModals } from '../../../../Private/modals';
import { useMemo, useState } from 'react';

export const ProductsMenu = () => {
  const { activeCategory, products } = useSelector(selectMenu);
  const [searchQuery, setSearchQuery] = useState('');

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
    const publicProducts = findPublicProducts();

    if (searchQuery.trim()) {
      return publicProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory) {
      return findPublicProductsByCategory(activeCategory.id);
    }

    return publicProducts.slice(0, 10);
  }, [products, activeCategory, searchQuery]);

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          my: 2
        }}
      >
        <TextField
          size='small'
          placeholder='Buscar productos...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, maxWidth: 340 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlined fontSize='small' />
              </InputAdornment>
            ),
            endAdornment: searchQuery ? (
              <InputAdornment position='end'>
                <IconButton size='small' onClick={() => setSearchQuery('')}>
                  <ClearOutlined fontSize='small' />
                </IconButton>
              </InputAdornment>
            ) : null
          }}
        />

        <Button
          variant='text'
          endIcon={<FilterList />}
          color='inherit'
          onClick={openDrawerProductsFilter}
        >
          Categorías
        </Button>
      </Box>

      {!searchQuery && activeCategory && (
        <Typography variant='h4' mb={2}>
          {activeCategory.name}
        </Typography>
      )}

      <Grid container spacing={2}>
        {availableProducts.map((product) => (
          <Grid item key={product.id} xs={6} sm={3} lg={3} xl={2}>
            <Product product={product} onClick={showProduct} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
