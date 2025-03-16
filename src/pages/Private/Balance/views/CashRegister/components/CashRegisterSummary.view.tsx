import { FC } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  Stack,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { CashRegister } from '../../../models/cash-register.model';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';

interface Props {
  cashRegister: CashRegister;
}

export const CashRegisterSummary: FC<Props> = ({ cashRegister }) => {
  return (
    <>
      <Card>
        <CardHeader title='Resumen de caja' />
        <CardContent>
          <Stack direction='column' spacing={2} justifyContent='flex-end'>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Creado por</InputLabel>
              <Typography variant='h5'>
                {cashRegister.createdBy.person.firstName}{' '}
                {cashRegister.createdBy.person.lastName}
              </Typography>
            </Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Fecha</InputLabel>
              <Typography variant='h5'>
                {format(new Date(cashRegister.createdAt), 'yyyy-MM-dd HH:mm')}
              </Typography>
            </Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Monto inicial</InputLabel>
              <Typography variant='h5'>
                $ {cashRegister.initialAmount}
              </Typography>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Ingresos</InputLabel>
              <Typography variant='h4' color='success.main'>
                {formatMoney(cashRegister.totalIncome)}
              </Typography>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Gastos</InputLabel>
              <Typography variant='h4' color='error.main'>
                {formatMoney(cashRegister.totalExpense)}
              </Typography>
            </Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Monto final</InputLabel>
              <Typography variant='h3'>
                {formatMoney(cashRegister.balance)}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
