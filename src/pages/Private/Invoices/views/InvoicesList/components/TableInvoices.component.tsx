import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TablePagination,
  IconButton,
  Box,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

import { Visibility } from '@mui/icons-material';

import { Label } from '../../../../../../components/ui';

import { ComboBoxClient } from '../../../../Orders/components';
import { PaymentMethod } from '../../../../Orders/models/Invoice.model';
import { useInvoices } from '../../../../Orders/hooks/useInvoices';

export const TableInvoices = () => {
  const { invoicesQuery, ...filters } = useInvoices();

  const navigate = useNavigate();

  return (
    <>
      <Card>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <ComboBoxClient
                handleChangeClient={filters.handleChangeClient}
                client={null}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Forma de pago
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Forma de pago'
                  value={filters.paymentMethod || ''}
                  onChange={(e) =>
                    filters.handleChangePaymentMethod(
                      e.target.value as PaymentMethod
                    )
                  }
                  fullWidth
                >
                  <MenuItem value={''}>Todos</MenuItem>
                  <MenuItem value={PaymentMethod.CASH}>Efectivo</MenuItem>
                  <MenuItem value={PaymentMethod.TRANSFER}>
                    Transferencia
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nro. Comprobante</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Forma de pago</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoicesQuery.data?.invoices?.map((invoice) => (
                <>
                  <TableRow>
                    <TableCell>
                      {/* <Description /> */}
                      N° {invoice.transactionNumber}
                    </TableCell>
                    <TableCell>
                      {format(new Date(invoice.createdAt), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      {invoice.client &&
                        `${invoice.client.person.firstName} ${invoice.client.person.lastName}`}
                    </TableCell>
                    <TableCell>$ {invoice.total}</TableCell>
                    <TableCell>
                      {invoice.paymentMethod === PaymentMethod.CASH
                        ? 'Efectivo'
                        : 'Transferencia'}
                    </TableCell>
                    <TableCell>
                      {invoice.isActive ? (
                        <>
                          <Label color='success'>Válido</Label>
                        </>
                      ) : (
                        <>
                          <Label color='error'>Anulado</Label>
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => navigate(`${invoice.id}`)}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={filters.rowsPerPage}
          component='div'
          count={invoicesQuery.data?.count || 0}
          page={filters.page}
          onPageChange={filters.handleChangePage}
          onRowsPerPageChange={filters.handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
};
