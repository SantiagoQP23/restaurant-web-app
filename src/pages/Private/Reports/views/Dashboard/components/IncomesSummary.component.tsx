import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import { useState } from 'react';
import { MonetizationOn } from '@mui/icons-material';
import { DateIncome } from '../../../models/date-orders.interface';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';
import { Label } from '../../../../../../components/ui';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';

export const IncomesSummary = () => {
  const { activeCashRegister } = useCashRegisterStore();

  return (
    <>
      <Card>
        <CardHeader
          avatar={<MonetizationOn color='success' sx={{ fontSize: 30 }} />}
          title={<Typography variant='h4'>Caja</Typography>}
          action={
            <Button
              disableRipple
              to='/balance'
              component={RouterLink}
              variant='outlined'
              color='success'
              size='small'
            >
              Ver más
            </Button>
          }
        />

        <CardContent>
          {activeCashRegister && (
            <Typography variant='h3' component='div'>
              {activeCashRegister && formatMoney(activeCashRegister.balance)}
              <Label sx={{ ml: 1 }} color='success'>
                + {formatMoney(0)}
              </Label>

              <Label sx={{ ml: 1 }} color='error'>
                - {formatMoney(0)}
              </Label>
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};
