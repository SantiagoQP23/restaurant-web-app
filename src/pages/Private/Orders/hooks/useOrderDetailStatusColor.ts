import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { OrderDetailStatus } from '@/models/orders.model';

export const useOrderDetailStatusColor = (status: OrderDetailStatus) => {
  const theme = useTheme();

  return useMemo(() => {
    switch (status) {
      case OrderDetailStatus.PENDING:
        return theme.palette.warning.main;
      case OrderDetailStatus.IN_PROGRESS:
        return theme.palette.info.main;
      case OrderDetailStatus.READY:
        return theme.palette.success.main;
      case OrderDetailStatus.DELIVERED:
        return theme.palette.grey[500];
      default:
        return theme.palette.text.disabled;
    }
  }, [status, theme]);
};
