import { FC, useEffect } from 'react';

import { Income } from '../../../models/income.model';
import { useFilterIncomes } from '../../../hooks/useFilterIncomes';
import { useIncomes } from '../../../hooks/useIncomes';
import { CashRegister } from '../../../models/cash-register.model';
import { Edit } from '@mui/icons-material';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  TablePagination
} from '@mui/material';
import { format } from 'date-fns';
import { PaymentMethod } from '../../../../Orders/models/Invoice.model';

interface Props {
  cashRegister: CashRegister;
}

export const TableIncomes: FC<Props> = ({ cashRegister }) => {
  const { incomesQuery, ...filterIncomes } = useIncomes();

  useEffect(() => {
    filterIncomes.handleChangeCashRegister(cashRegister);
  }, []);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Importe</TableCell>
              <TableCell>Forma de pago</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {incomesQuery.data?.incomes.map((income) => (
              <>
                <TableRow key={income.id}>
                  <TableCell>
                    <Typography variant='h5'>
                      {income.transaction.description}
                    </Typography>

                    {income.client && (
                      <Typography variant='body2'>
                        {income.client.person.firstName}{' '}
                        {income.client.person.lastName}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {format(new Date(income.createdAt), 'dd/MM/yyyy')}
                    </Typography>
                    <Typography>
                      {format(new Date(income.createdAt), 'HH:mm')}
                    </Typography>
                  </TableCell>

                  <TableCell>$ {income.transaction.amount}</TableCell>
                  <TableCell>
                    {income.transaction.paymentMethod === PaymentMethod.CASH
                      ? 'Efectivo'
                      : 'Transferencia'}
                  </TableCell>
                  <TableCell>
                    {/* <IconButton
                        onClick={() => handleOpenDrawer(income)}
                      >
                        <Edit />
                      </IconButton> */}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={incomesQuery.data?.count || 0}
        rowsPerPage={filterIncomes.rowsPerPage}
        page={filterIncomes.page}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </>
  );
};
