import { restauranteApi } from '../../../../api';
import { Order } from '../../../../models';
import { CreateInvoiceDto } from '../dto';
import { FilterInvoicesDto } from '../dto/invoices/filter-invoices.dto';
import { Invoice } from '../models/Invoice.model';

export interface InvoicesResponse {
  invoices: Invoice[];
  count: number;
}

export const getInvoice = async (term: string): Promise<Invoice> => {
  const { data } = await restauranteApi.get<Invoice>(`invoices/${term}`);

  return data;
};

export const getInvoices = async (filterDto: FilterInvoicesDto) => {
  const { limit = 10, offset = 0, ...restFilter } = filterDto;

  const { data } = await restauranteApi.get<InvoicesResponse>(`invoices`, {
    params: {
      ...restFilter,
      offset: limit * offset,
      limit
    }
  });

  return data;
};

export const createInvoice = async (
  invoice: CreateInvoiceDto
): Promise<Order> => {
  console.log('invoice', invoice);

  const { data } = await restauranteApi.post<Order>(`invoices`, invoice);

  return data;
};

export const removeInvoice = async (invoiceId: string): Promise<Order> => {
  const { data } = await restauranteApi.delete<Order>(`invoices/${invoiceId}`);

  return data;
};
