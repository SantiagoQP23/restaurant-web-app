import { InvoiceStatus } from '../../Orders/models/Invoice.model';

export const getInvoiceStatus = (status: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.PAID:
      return 'Pagada';
    case InvoiceStatus.PENDING:
      return 'Pendiente';
    case InvoiceStatus.DRAFT:
      return 'Borrador';
    default:
      return 'Borrador';
  }
};
