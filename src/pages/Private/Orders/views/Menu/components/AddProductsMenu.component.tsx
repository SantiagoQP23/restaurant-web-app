import NiceModal from '@ebay/nice-modal-react';

import { Box, Stack, Grid, Button, Typography, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../../../../../redux';
import { ComboBoxProducts } from '../../../../EditMenu/components/products/ComboBoxProducts.component';
import { AllMenu } from '../../../../Menu/components';
import { IProduct } from '../../../../../../models';
import { FilterList } from '@mui/icons-material';
import { RegisteredModals } from '../../../../modals';
import { ModalAddDetail } from '../../../components';

export const AddProductsMenu = () => {
  const { activeCategory } = useSelector(selectMenu);

  const addProductoToOrder = (product: IProduct) => {
    NiceModal.show(ModalAddDetail, { detail: { product, quantity: 1 } });
  };

  const openDrawerProductsFilter = () => {
    NiceModal.show(RegisteredModals.DrawerProductsFilter);
  };

  return (
    <>
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: '50%',
            md: '33%',
            lg: '25%',
            xl: '20%'
          }
        }}
      >
        <ComboBoxProducts selectProduct={addProductoToOrder} />
      </Box>

      <Stack spacing={1} my={2} direction='row' justifyContent='space-between'>
        {activeCategory && (
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Categoría:
            <Chip label={activeCategory.name} sx={{ ml: 1 }} size='small' />
          </Typography>
        )}
        <Button
          startIcon={<FilterList />}
          onClick={openDrawerProductsFilter}
          size='small'
        >
          Categorías
        </Button>
      </Stack>

      <Grid
        container
        spacing={1}
        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
      >
        <Grid item xs={12} mb={1}>
          <AllMenu />
        </Grid>
      </Grid>
    </>
  );
};
