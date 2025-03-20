import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { TitlePage } from '../../../components/TitlePage.component';
import { TableInvoices } from './components/TableInvoices.component';
import { Add } from '@mui/icons-material';

export const InvoicesList = () => {
  const navigate = useNavigate();

  return (
    <>
      <TitlePage
        title='Comprobantes'
        action={
          <Button
            variant='contained'
            color='primary'
            startIcon={<Add />}
            size='small'
            onClick={() => navigate('add')}
          >
            Nuevo Comprobante
          </Button>
        }
      />

      <TableInvoices />
    </>
  );
};
