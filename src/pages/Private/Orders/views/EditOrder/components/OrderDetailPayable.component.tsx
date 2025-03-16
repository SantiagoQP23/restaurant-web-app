import { FC, useState, useEffect } from 'react';

import { TableRow, TableCell } from '@mui/material';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { CounterInput } from '../../../components';
import { useInvoiceStore } from '../../../store/invoiceStore';
import { Label } from '../../../../../../components/ui';

interface Props {
  detail: any;
  qtyToPay: number;
}

export const OrderDetailPayable: FC<Props> = ({ detail, qtyToPay }) => {
  const [counter, setCounter] = useState(qtyToPay);

  const { updateDetail } = useInvoiceStore((state) => state);

  const handleUpdateDetail = (value: number) => {
    setCounter(value);

    updateDetail({ ...detail, qtyToPay: value });
  };

  useEffect(() => {
    setCounter(qtyToPay);
  }, [qtyToPay]);

  return (
    <>
      <TableRow>
        <TableCell>
          {detail.quantity - detail.qtyPaid - detail.qtyInAccounts > 0 ? (
            <CounterInput
              value={counter}
              onChange={(value: number) => {
                handleUpdateDetail(value);
              }}
              max={detail.quantity - detail.qtyPaid - detail.qtyInAccounts}
              min={0}
            />
          ) : (
            <Label color='success'>Añadido</Label>
          )}
        </TableCell>

        <TableCell>
          <Label color='info'>{detail.qtyInAccounts}</Label>{' '}
          <Label color='warning'>{detail.quantity - detail.qtyPaid}</Label>{' '}
          <b>{detail.product.name}</b> de <b>{detail.quantity}</b>
        </TableCell>
        <TableCell>{formatMoney(detail.price)}</TableCell>
        <TableCell>{formatMoney(detail.price * detail.quantity)}</TableCell>
      </TableRow>
    </>
  );
};
