import {} from 'react';

import { FormControl, MenuItem, InputLabel } from '@mui/material';
import { useInvoiceStore } from '../../../store/invoiceStore';

import Select from '@mui/material/Select';

export const DraftInvoiceSelect = () => {
  // const { invoices, setActiveInvoice, activeInvoice } = useInvoiceStore(
  //   (state) => state
  // );

  // const handleChangeInvoice = (value: number) => {
  //   const invoiceId = value;

  //   const invoice = invoices.find((invoice) => invoice.id === invoiceId);

  //   if (!invoice) return setActiveInvoice(null);

  //   setActiveInvoice(invoice);
  // };

  return (
    <FormControl size='small'>
      {/* <InputLabel id="active-invoice">Cuenta</InputLabel>

      <Select
        labelId="active-invoice"
        label="Cuenta"
        onChange={(e) => handleChangeInvoice(e.target.value as number)}
        value={activeInvoice?.id || ""}
      >
        <MenuItem value="">No seleccionado</MenuItem>
        {invoices.map((invoice) => (
          <MenuItem value={invoice.id} key={invoice.id}>
            Cuenta {invoice.id}
          </MenuItem>
        ))}
      </Select> */}
    </FormControl>
  );
};
