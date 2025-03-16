import { FC } from 'react';
import { Paid } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Stack
} from '@mui/material';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { CashRegister } from '../../../models/cash-register.model';

interface Props {
  cashRegister: CashRegister;
}

export const SummaryCash: FC<Props> = ({ cashRegister }) => {
  return (
    <>
      <Card>
        <CardHeader
          title='Efectivo'
          titleTypographyProps={{
            variant: 'h5',
            textAlign: 'center'
          }}
        />
        <CardContent>
          <Box display='flex' justifyContent='center'>
            <Paid color='success' fontSize='large' />
          </Box>

          <Typography
            variant='h3'
            // color={balanceTranfer > 0 ? 'success.main' : 'error.main'}
            textAlign='center'
            my={2}
          >
            {formatMoney(cashRegister.balance)}
          </Typography>

          <Stack
            spacing={2}
            // divider={<Divider orientation='vertical'/>}
            direction='row'
            justifyContent='space-between'
          >
            <Box>
              <Typography variant='caption'>Monto inicial</Typography>
              <Typography variant='h4' color='success.main'>
                {formatMoney(cashRegister.initialAmount)}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>Ingresos</Typography>
              <Typography variant='h4' color='success.main'>
                {formatMoney(cashRegister.totalIncome)}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>Ventas</Typography>
              <Typography variant='h4' color='success.main'>
                {formatMoney(cashRegister.totalExpense)}
              </Typography>
            </Box>
            <Box>
              <Typography variant='caption'>Gastos</Typography>
              <Typography variant='h4' color='error.main'>
                {formatMoney(cashRegister.balance)}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
