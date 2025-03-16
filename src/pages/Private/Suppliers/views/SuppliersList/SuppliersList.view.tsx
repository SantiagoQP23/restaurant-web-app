import { Grid } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { SupplierTable } from './components/SupplierTable.component';
import { AddSupplier } from './components/AddSupplier.component';

export const SuppliersList = () => {
  return (
    <>
      <TitlePage title='Proveedores' />

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={8}>
          <SupplierTable />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <AddSupplier />
        </Grid>
      </Grid>
    </>
  );
};
