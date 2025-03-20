import { useState, useEffect, FC } from 'react';

import { CreditCard, Edit, Paid, Print } from '@mui/icons-material';
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
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  CircularProgress
} from '@mui/material';
import { useIncomes } from '../../../hooks/useIncomes';
import { format } from 'date-fns';
import { PaymentMethod } from '../../../../../../models';
import { Income } from '../../../models/income.model';
import { useModal } from '../../../../../../hooks';
import { DrawerIncome } from './DrawerIncome.component';
import { CashRegister } from '../../../models/cash-register.model';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { Label } from '../../../../../../components/ui';
import { generatePdfIncome } from '../../../helpers/pdf-income';
import { IncomesResponse } from '../../../services/incomes.service';

interface Props {
  cashRegister: CashRegister;
  editable?: boolean;
  data: IncomesResponse;
  filterIncomes: any;
}

export const IncomesList: FC<Props> = ({
  cashRegister,
  editable = false,
  data,
  filterIncomes
}) => {
  // const { incomesQuery, ...filterIncomes } = useIncomes();

  const [income, setIncome] = useState<Income | null>(null);

  const { isOpen, handleClose, handleOpen } = useModal();

  const handleOpenDrawer = (income: Income) => {
    setIncome(income);
    handleOpen();
  };

  const handlePrint = async (income: Income) => {
    const pdf = await generatePdfIncome(income);

    pdf.open();
  };

  // useEffect(() => {
  //   filterIncomes.handleChangeCashRegister(cashRegister)
  // }, [])

  return (
    <>
      {income && (
        <DrawerIncome open={isOpen} onClose={handleClose} income={income} />
      )}

      <Card>
        <CardHeader
          title='Lista de ingresos'
          // action={
          //   <Button variant='outlined' size='small'>Añadir</Button>
          // }

          // action={
          //   <CircularProgress />
          // }
        />

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
                // incomes.data?.incomes.map(income => (
                data.incomes.map((income) => (
                  <>
                    <TableRow key={income.id}>
                      <TableCell>
                        <ListItem>
                          <ListItemAvatar>
                            {income.transaction.paymentMethod ===
                            PaymentMethod.CASH ? (
                              <Paid color='success' />
                            ) : (
                              <CreditCard color='warning' />
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={income.transaction.description}
                            secondary={format(
                              new Date(income.createdAt),
                              'dd/MM/yyyy HH:mm'
                            )}
                            primaryTypographyProps={{
                              variant: 'h4'
                            }}
                          />
                        </ListItem>
                      </TableCell>

                      <TableCell>
                        <Label color='success'>
                          + {formatMoney(income.transaction.amount)}
                        </Label>
                      </TableCell>
                      <TableCell align='center'>
                        <Stack
                          direction='row'
                          spacing={2}
                          justifyContent='center'
                        >
                          <IconButton
                            color='primary'
                            onClick={() => handlePrint(income)}
                          >
                            <Print />
                          </IconButton>

                          {editable && (
                            <Button
                              startIcon={<Edit />}
                              size='small'
                              onClick={() => handleOpenDrawer(income)}
                            >
                              Editar
                            </Button>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={data?.count || 0}
          rowsPerPage={filterIncomes.rowsPerPage}
          page={filterIncomes.page}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Card>
    </>
  );
};
