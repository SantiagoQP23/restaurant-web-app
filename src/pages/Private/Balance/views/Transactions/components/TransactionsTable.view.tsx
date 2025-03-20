import { FC } from 'react';
import { Transaction } from '../../../models/transaction.model';
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table
} from '@mui/material';
import { TransactionRow } from './TransactionRow.component';

interface Props {
  transactions: Transaction[];
}

export const TransactionsTable: FC<Props> = ({ transactions }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Título</TableCell>
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
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </Table>
  );
};
