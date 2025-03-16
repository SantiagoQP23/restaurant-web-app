import React, { FC, useState } from 'react';
import { CashRegister } from '../../../../../Balance/models/cash-register.model';
import { PointOfSale, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from '@mui/material';
import { formatMoney } from '../../../../../Common/helpers/format-money.helper';
import { useEncryptMoney } from '../../../../../Common/hooks/useEncrypt';

interface Props {
  cashRegister: CashRegister;
}

export const CashRegisterSummary: FC<Props> = ({ cashRegister }) => {
  const { toggleVisibility, txtMoney, visible } = useEncryptMoney(
    formatMoney(cashRegister.balance)
  );

  return (
    <Card
      sx={{
        border: 'none',
        boxShadow: 'none'
      }}
    >
      <CardHeader
        avatar={<PointOfSale />}
        title={`Caja N° ${cashRegister.id}`}
        action={
          <IconButton onClick={toggleVisibility} size='small'>
            {!visible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant='h4'>{txtMoney}</Typography>
      </CardContent>
    </Card>
  );
};
