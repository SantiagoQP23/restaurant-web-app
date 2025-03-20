import React, { FC } from 'react';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { PointOfSale, Visibility, VisibilityOff } from '@mui/icons-material';
import { CashRegister } from '../../../../Balance/models/cash-register.model';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useEncryptMoney } from '../../../../Common/hooks/useEncrypt';

interface Props {
  cashRegister: CashRegister;
}

export const CashRegisterItem: FC<Props> = ({ cashRegister }) => {
  const { activeCashRegister, setActiveCashRegister } = useCashRegisterStore();

  const handleClick = () => {
    setActiveCashRegister(cashRegister);
  };

  const { toggleVisibility, txtMoney, visible } = useEncryptMoney(
    formatMoney(cashRegister.balance)
  );

  return (
    <Card
      sx={{
        cursor: 'pointer',
        border: (theme) =>
          activeCashRegister?.id === cashRegister.id
            ? `1px solid ${theme.colors.primary.main}`
            : '1px solid transparent'
      }}
      onClick={handleClick}
    >
      <CardContent>
        <PointOfSale />
        <Typography variant='h6'>Caja N° {cashRegister.id}</Typography>
        <Typography variant='h4'>
          {txtMoney}{' '}
          <IconButton onClick={toggleVisibility} size='small'>
            {!visible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Typography>
      </CardContent>
    </Card>
  );
};
