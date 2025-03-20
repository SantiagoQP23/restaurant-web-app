import { TitlePage } from '../../../components/TitlePage.component';
import { Grid } from '@mui/material';
import { ExpensesList, IncomesList } from '../BalanceDashboard/components';
// import { AddExpense } from "./components/AddTransactionDrawer.component";

export const Expenses = () => {
  return (
    <>
      <TitlePage title='Gastos' />

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={8}>
          {/* <ExpensesList /> */}
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          {/* <AddExpense /> */}
        </Grid>
      </Grid>
    </>
  );
};
