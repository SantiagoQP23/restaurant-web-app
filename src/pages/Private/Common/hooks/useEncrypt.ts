import { useState } from 'react';
import { replaceNumbersWithAsterisks } from '../utils/encrypt.util';

export const useEncryptMoney = (money: string) => {
  const [visible, setVisible] = useState(false);

  const txtMoney = visible ? money : replaceNumbersWithAsterisks(money);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return {
    txtMoney,
    toggleVisibility,
    visible
  };
};
