import { Add, History } from '@mui/icons-material';
import { TitlePage } from '../../../components/TitlePage.component';
import {
  Grid,
  Card,
  CardHeader,
  Button,
  Stack,
  Tabs,
  Tab,
  TableContainer,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCashRegisterStore } from '../../../Common/store/useCashRegisterStore';
import { AddCashRegisterModal } from './components/AddCashRegisterModal.component';
import { useEffect, useState } from 'react';

import { TransactionType } from '../../../Common/enums/transaction-type.enum';
import { CashTransactionsTable } from './components/CashTransactionsTable.component';
import NiceModal from '@ebay/nice-modal-react';
import { CashRegisterCard } from './components/CashRegisterCard.component';
import { AddCashTransactionModal } from './components/AddCashTransactionModal.component';
import { CashTransaction } from '../../models/cash-transaction.model';

export enum AddTransactionTabs {
  INCOMES = 'add-incomes',
  EXPENSES = 'add-expenses'
}

export enum ViewTransactionFilter {
  INCOMES = 'incomes',
  EXPENSES = 'expenses',
  ALL = 'all'
}

export const BalanceDashboard = () => {
  const navigate = useNavigate();

  const { activeCashRegister, cashRegisters } = useCashRegisterStore(
    (state) => state
  );

  const [filteredCashTransactions, setFilteredCashTransactions] = useState<
    CashTransaction[]
  >(activeCashRegister?.cashTransactions || []);

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
      setFilteredCashTransactions(activeCashRegister?.cashTransactions || []);
    } else {
      setFilteredCashTransactions(
        activeCashRegister?.cashTransactions.filter(
          (transaction) => transaction.type === value
        ) || []
      );
    }
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };
  const openAddTransactionDrawer = (type: TransactionType) =>
    NiceModal.show(AddCashTransactionModal, { type });

  const showAddCashRegisterModal = () => NiceModal.show(AddCashRegisterModal);

  useEffect(() => {
    if (!activeCashRegister) return;
    handleChangeCashTransaction(transactionFilter);
  }, [activeCashRegister]);

  return (
    <>
      <TitlePage
        title='Cajas'
        action={
          <Stack direction='row' spacing={1}>
            <Button
              startIcon={<History />}
              onClick={() => navigateTo('/financial/cash-register')}
            >
              Historial
            </Button>
            <Button
              startIcon={<Add />}
              variant='contained'
              onClick={showAddCashRegisterModal}
              disabled={cashRegisters.length > 0}
            >
              Añadir caja
            </Button>
          </Stack>
        }
      />
      <Grid container spacing={2}>
        {cashRegisters.map((cashRegister) => (
          <Grid item xs={12} md={4} key={cashRegister.id}>
            <CashRegisterCard
              cashRegister={cashRegister}
              key={cashRegister.id}
            />
          </Grid>
        ))}

        {cashRegisters.length === 0 && (
          <Grid item xs={12}>
            <Typography variant='h4' textAlign='center' my={5}>
              No hay cajas activas
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid container spacing={2} mt={1}>
        {activeCashRegister && (
          <Grid item xs={12} lg={8}>
            <Tabs
              value={transactionFilter}
              onChange={(e, value) => handleChangeTransactionFilter(value)}
            >
              <Tab label='Todos' value={'all'} />
              <Tab label='Ingresos' value={TransactionType.INCOME} />
              <Tab label='Gastos' value={TransactionType.EXPENSE} />
            </Tabs>
            <Card>
              <CardHeader
                title='Transacciones'
                action={
                  <Stack direction='row' spacing={1}>
                    <Button
                      startIcon={<Add />}
                      size='small'
                      onClick={() =>
                        openAddTransactionDrawer(TransactionType.INCOME)
                      }
                      color='success'
                      variant='contained'
                    >
                      Ingreso
                    </Button>
                    <Button
                      startIcon={<Add />}
                      size='small'
                      onClick={() =>
                        openAddTransactionDrawer(TransactionType.EXPENSE)
                      }
                      color='error'
                      variant='contained'
                    >
                      Gasto
                    </Button>
                  </Stack>
                }
              />

              <TableContainer>
                <CashTransactionsTable
                  cashTransactions={filteredCashTransactions}
                />
              </TableContainer>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};
