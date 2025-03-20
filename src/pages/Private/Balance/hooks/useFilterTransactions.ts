import { useState } from 'react';
import { IUser } from '../../../../models';
import { CashRegister } from '../models/cash-register.model';

export const useFilterTransactions = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const [cashRegister, setCashRegister] = useState<CashRegister | null>(null);

  const handleChangeUser = (user: IUser | null) => {
    setUser(user);
  };

  const handleChangeCashRegister = (cashRegister: CashRegister | null) => {
    setCashRegister(cashRegister);
  };

  return {
    user,
    cashRegister,
    handleChangeUser,
    handleChangeCashRegister
  };
};
