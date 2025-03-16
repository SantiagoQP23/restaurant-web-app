import { FC } from 'react';
import { ActiveCashRegister } from '../../../services/cash-register.service';
import { CreditCard } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Stack
} from '@mui/material';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';

interface Props {
  cashRegister: ActiveCashRegister;
}

export const SummaryTransfer: FC<Props> = ({ cashRegister }) => {
  const balanceTransfer = cashRegister
    ? cashRegister.totalIncomesTransfer +
      cashRegister.totalInvoicesTransfer -
      cashRegister.totalExpensesTransfer
    : 0;
  return (
    <Card>
      <CardHeader
        title='Transferencias'
        titleTypographyProps={{
          variant: 'h5',
          textAlign: 'center'
        }}
      />
      <CardContent>
        <Box display='flex' justifyContent='center'>
          <CreditCard color='warning' fontSize='large' />
        </Box>

        <Typography
          variant='h3'
          // color={balanceTransfer > 0 ? 'success.main' : 'error.main'}
          textAlign='center'
          my={2}
        >
          {formatMoney(balanceTransfer)}
        </Typography>

        <Stack
          spacing={2}
          // divider={<Divider orientation='vertical'/>}
          direction='row'
          justifyContent='space-between'
        >
          <Box>
            <Typography variant='caption'>Ingresos</Typography>
            <Typography variant='h4' color='success.main'>
              {formatMoney(cashRegister.totalIncomesTransfer)}
            </Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Ventas</Typography>
            <Typography variant='h4' color='success.main'>
              {formatMoney(cashRegister.totalInvoicesTransfer)}
            </Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Gastos</Typography>
            <Typography variant='h4' color='error.main'>
              {formatMoney(cashRegister.totalExpensesTransfer)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
