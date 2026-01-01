import { Navigate, useParams } from 'react-router-dom';
import { useCashRegister } from '../../hooks/useCashRegister';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
  InputLabel,
  Stack,
  Divider,
  Tabs,
  Tab,
  TableContainer
} from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { Print } from '@mui/icons-material';
import { format } from 'date-fns';
import { SummaryCash } from '../BalanceDashboard/components/SummaryCash.component';
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { generatePdfCashReport } from '../../helpers/pdf-cash-report';
import { useIncomes } from '../../hooks/useIncomes';
import { TransactionType } from '../../../Common/enums/transaction-type.enum';
import { useState } from 'react';
import { CashTransaction } from '../../models/cash-transaction.model';
import { CashTransactionsTable } from '../BalanceDashboard/components';

export enum ViewTransactionFilter {
  INCOMES = 'incomes',
  EXPENSES = 'expenses',
  ALL = 'all'
}

export const CashRegister = () => {
  const { cashRegisterId } = useParams();

  if (!cashRegisterId) return <Navigate to='/balance/cash-register' replace />;

  const { cashRegisterQuery } = useCashRegister(cashRegisterId);

  const handlePrint = async () => {
    // if (cashRegisterQuery.data) {
    //   const pdf = await generatePdfCashReport(cashRegisterQuery.data);
    //   pdf.open();
    // }
  };

  const { data } = cashRegisterQuery;

  const [filteredCashTransactions, setFilteredCashTransactions] = useState<
    CashTransaction[]
  >(data?.cashTransactions || []);

  const [transactionFilter, setTransactionFilter] = useState<
    TransactionType | 'all'
  >('all');

  const handleChangeTransactionFilter = (value: TransactionType | 'all') => {
    setTransactionFilter(() => {
      handleChangeCashTransaction(value);
      return value;
    });
  };

  const handleChangeCashTransaction = (value: TransactionType | 'all') => {
    if (value === 'all') {
      setFilteredCashTransactions(data?.cashTransactions || []);
    } else {
      setFilteredCashTransactions(
        data?.cashTransactions.filter(
          (transaction) => transaction.type === value
        ) || []
      );
    }
  };

  // if (isPending) return <div>Loading...</div>

  if (!data) return <div>Not found</div>;

  return (
    <>
      <TitlePage
        title='Información de caja'
        action={
          <Button
            variant='contained'
            startIcon={<Print />}
            onClick={handlePrint}
          >
            Descargar reporte
          </Button>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <SummaryCash cashRegister={data} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Resumen' />

            <CardContent>
              <Stack spacing={2} direction='column'>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <InputLabel id='date'>Creado por</InputLabel>
                  <Typography variant='h5'>
                    {data.createdBy.person.firstName}{' '}
                    {data.createdBy.person.lastName}
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <InputLabel id='date'>Fecha</InputLabel>
                  <Typography variant='h5'>
                    {format(new Date(data.createdAt), 'yyyy-MM-dd HH:mm')}
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <InputLabel id='date'>Monto inicial</InputLabel>
                  <Typography variant='h5'>
                    {formatMoney(data.initialAmount)}
                  </Typography>
                </Box>

                {data.isClosed && (
                  <>
                    <Divider />

                    <Typography variant='h5'>Cierre de caja</Typography>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <InputLabel id='date'>Fecha de cierre</InputLabel>
                      <Typography variant='h5'>
                        {data.closedAt
                          ? format(new Date(data.closedAt), 'yyyy-MM-dd HH:mm')
                          : 'No cerrada'}
                      </Typography>
                    </Box>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <InputLabel id='date'>Balance</InputLabel>
                      <Typography variant='h4'>
                        {formatMoney(data.balance)}
                      </Typography>
                    </Box>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <InputLabel id='date'>Monto final</InputLabel>
                      <Typography variant='h4'>
                        {formatMoney(data.finalAmount)}
                      </Typography>
                    </Box>

                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <InputLabel id='date'>Discrepancia</InputLabel>
                      <Typography
                        variant='h4'
                        color={data.discrepancy ? 'warning.main' : 'inherit'}
                      >
                        {formatMoney(data.discrepancy)}
                      </Typography>
                    </Box>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Transacciones' />

            <Tabs
              value={transactionFilter}
              onChange={(e, value) => handleChangeTransactionFilter(value)}
            >
              <Tab label='Todos' value={'all'} />
              <Tab label='Ingresos' value={TransactionType.INCOME} />
              <Tab label='Gastos' value={TransactionType.EXPENSE} />
            </Tabs>

            <TableContainer>
              <CashTransactionsTable
                cashTransactions={filteredCashTransactions}
              />
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
