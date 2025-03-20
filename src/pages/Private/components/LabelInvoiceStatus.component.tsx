import { FC } from 'react';

import { Label } from '../../../components/ui';
import { InvoiceStatus } from '../Orders/models/Invoice.model';
import { getInvoiceStatus } from '../Common/helpers/get-invoice-status';

interface Props {
  status: InvoiceStatus;
}

export const LabelInvoiceStatus: FC<Props> = ({ status }) => {
  return (
    <Label
      color={
        status === InvoiceStatus.PAID
          ? 'success'
          : status === InvoiceStatus.PENDING
            ? 'warning'
            : 'secondary'
      }
    >
      {getInvoiceStatus(status)}
    </Label>
  );
};
