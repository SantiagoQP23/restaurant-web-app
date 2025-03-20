import { useState, FC, useEffect } from 'react';

import {
  ArrowDownward,
  CreditCard,
  Edit,
  Paid,
  Print
} from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Button,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TablePagination,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Stack
} from '@mui/material';
import { format } from 'date-fns';
import { PaymentMethod } from '../../../../Orders/models/Invoice.model';
import { Expense } from '../../../models/expense.model';
import { useModal } from '../../../../../../hooks';
import { DrawerExpense } from '../../Expenses/components/DrawerExpense.component';
import { Label } from '../../../../../../components/ui';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { CashRegister } from '../../../models/cash-register.model';
import { generatePdfExpense } from '../../../helpers/pdf-expense';

interface Props {
  cashRegister: CashRegister;
  editable?: boolean;
}

export const ExpensesList: FC<Props> = ({ cashRegister, editable = false }) => {
  const [activeExpense, setActiveExpense] = useState<Expense | null>(null);

  const { isOpen, handleClose, handleOpen } = useModal();

  const handleOpenDrawer = (activeExpense: Expense) => {
    console.log('change expense');
    console.log(activeExpense);
    setActiveExpense(activeExpense);
    handleOpen();
  };

  const handlePrint = async (expense: Expense) => {
    const pdf = await generatePdfExpense(expense);

    pdf.open();
  };

  return (
    <>
      {activeExpense && (
        <DrawerExpense
          open={isOpen}
          onClose={handleClose}
          expense={activeExpense}
        />
      )}
      <Card>
        <CardHeader
          title='Lista de gastos'
          // action={
          //   <Button variant='outlined' size='small'>Añadir</Button>
          // }
        />

        {/* <List>
          {
            expensesQuery.data?.expenses.map((expense) => (
              <ListItem>
                <ListItemText 
                primary={expense.transaction.description}
                secondary={format(new Date(expense.createdAt), 'dd/MM/yyyy HH:mm')}
                primaryTypographyProps={{
                  variant:'h5'
                }}

                />

                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => handleOpenDrawer(expense)}
                  >
                    <Edit />
                  </IconButton>

                </ListItemSecondaryAction>

              </ListItem>

            ))
          }

        </List> */}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell align='center'>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                // .map((expense) => (
                //   <TableRow key={expense.id}>
                //     <TableCell
                //     >
                //       <ListItem>
                //         <ListItemAvatar>
                //           {
                //             expense.transaction.paymentMethod === PaymentMethod.CASH
                //               ? (
                //                 <Paid color='success' />
                //               ) : (
                //                 <CreditCard color='warning' />
                //               )
                //           }
                //         </ListItemAvatar>
                //         <ListItemText
                //           primary={expense.transaction.description}
                //           secondary={format(new Date(expense.createdAt), 'dd/MM/yyyy HH:mm')}
                //           primaryTypographyProps={{
                //             variant: 'h4'
                //           }}
                //         />
                //       </ListItem>
                //     </TableCell>
                //     <TableCell>
                //       <Typography
                //         color='error.main'
                //       >
                //         - {formatMoney(expense.transaction.amount)}
                //       </Typography>
                //     </TableCell>
                //     <TableCell
                //       align='center'
                //     >
                //       <Stack direction='row' spacing={2}  justifyContent='center'>
                //         <IconButton
                //           color='primary'
                //           onClick={() => handlePrint(expense)}
                //         >
                //           <Print />
                //         </IconButton>
                //         {
                //           editable && (
                //             <Button
                //               startIcon={<Edit />}
                //               size='small'
                //               onClick={() => handleOpenDrawer(expense)}
                //             >
                //               Editar
                //             </Button>
                //           )
                //         }
                //       </Stack>
                //     </TableCell>
                //   </TableRow>
                // ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination

          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={expensesQuery.data?.count || 0}
          rowsPerPage={filterExpenses.rowsPerPage}
          page={filterExpenses.page}
          onPageChange={() => { }}
          onRowsPerPageChange={() => { }}

        /> */}
      </Card>
    </>
  );
};
