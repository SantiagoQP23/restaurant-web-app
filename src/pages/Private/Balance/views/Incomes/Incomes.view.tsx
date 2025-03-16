import { Grid } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { AddIncome } from './components/AddIncome.component';

export const Incomes = () => {
  return (
    <>
      <TitlePage title='Ingresos' />

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={8}></Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <AddIncome />
        </Grid>
      </Grid>
    </>
  );
};
