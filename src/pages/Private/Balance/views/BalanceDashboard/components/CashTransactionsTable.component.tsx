import { FC } from 'react';
import { CashTransaction } from '../../../models/cash-transaction.model';
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table
} from '@mui/material';
import { CashTransactionRow } from './CashTransactionRow.component';

interface Props {
  cashTransactions: CashTransaction[];
}

export const CashTransactionsTable: FC<Props> = ({ cashTransactions }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell>Creado por</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell align='center'>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            whiteSpace: 'pre'
          }}
        >
          {cashTransactions.map((transaction) => (
            <CashTransactionRow
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};
