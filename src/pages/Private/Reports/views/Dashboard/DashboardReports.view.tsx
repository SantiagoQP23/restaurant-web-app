import { Grid, Typography } from '@mui/material';

import { TitlePage } from '../../../components/TitlePage.component';
import {
  BestSellingProductsSummary,
  IncomesSummary,
  OrdersSummary,
  PredictionAffluenceSummary
} from './components';
import { IncomesAndExpensesSummary } from './components/IncomesAndExpensesSummary.component';
import { UsersSummary } from '../../../Balance/views/BalanceDashboard/components/UsersSummary.component';
import { FootfallSummary } from './components/FootfallSummary.component';
import { ClientsSummary } from './components/ClientsSummary.component';

export const DashboardReports = () => {
  return (
    <>
      <TitlePage title='Dashboard' />

      <Grid container spacing={2} my={1}>
        <Grid item xs={12}>
          <Typography variant='h5' component='h2' gutterBottom>
            Comming Soon...
          </Typography>
        </Grid>
        {/* 
        <Grid item xs={12} md={3}>
          <Day />

        </Grid> */}

        {/* <Grid item xs={12} md={3}> */}
        {/*   <ClientsSummary /> */}
        {/* </Grid> */}
        {/**/}
        {/* <Grid item xs={12} md={3}> */}
        {/*   <FootfallSummary /> */}
        {/* </Grid> */}
        {/**/}
        {/* <Grid item xs={12} md={3}> */}
        {/*   <IncomesSummary /> */}
        {/* </Grid> */}
        {/**/}
        {/* <Grid item xs={12} md={3}> */}
        {/*   <OrdersSummary /> */}
        {/* </Grid> */}
        {/**/}
        {/* <Grid item xs={12}> */}
        {/*   <Grid container spacing={2}> */}
        {/*     <Grid item xs={12} md={6}> */}
        {/*       <BestSellingProductsSummary /> */}
        {/*     </Grid> */}
        {/**/}
        {/*     <Grid item xs={12} md={6}> */}
        {/*       <UsersSummary /> */}
        {/*     </Grid> */}
        {/*   </Grid> */}
        {/* </Grid> */}
      </Grid>
    </>
  );
};
