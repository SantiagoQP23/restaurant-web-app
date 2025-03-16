import { FC, ChangeEvent, useState } from 'react';
import {
  Stack,
  Box,
  InputLabel,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  TextField,
  Card,
  CardHeader,
  CardContent
} from '@mui/material';
import { format } from 'date-fns';
import { CashRegister } from '../../../models/cash-register.model';
import {
  Add,
  Close,
  ExpandLess,
  PointOfSale,
  Remove,
  RemoveCircle
} from '@mui/icons-material';
import { FormCashIncome } from './FormCashIncome.component';
import { useModal } from '../../../../../../hooks';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';
import { ActiveCashRegister } from '../../../services/cash-register.service';
import { UpdateCashRegisterDto } from '../../../dto/update-cash-register.dto';
import { useUpdateCashRegister } from '../../../hooks/useCashRegister';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { TransactionType } from '../../../../Common/enums/transaction-type.enum';

interface Props {
  cashRegister: CashRegister;
}

export const CashRegisterInfo: FC<Props> = ({ cashRegister }) => {
  const { isOpen, handleClose, handleOpen, toggleModal } = useModal();

  const [finalAmount, setFinalAmount] = useState<number>(0);

  const [closingNote, setClosingNote] = useState<string>('');

  const { openCreate } = useCashRegisterStore((state) => state);

  const updateCashMutation = useUpdateCashRegister();

  const balanceCash = 0;

  const getBalance = (cashRegister: CashRegister) => {
    const balance =
      cashRegister.initialAmount +
      getTotalIncomes(cashRegister) -
      getTotalExpenses(cashRegister);
    return balance;
  };

  const getTotalIncomes = (cashRegister: CashRegister) => {
    const totalIncomes = cashRegister.cashTransactions.reduce((acc, curr) => {
      if (curr.type === TransactionType.INCOME) {
        return acc + curr.amount;
      } else {
        return acc;
      }
    }, 0);
    return totalIncomes;
  };

  const getTotalExpenses = (cashRegister: CashRegister) => {
    const totalExpenses = cashRegister.cashTransactions.reduce((acc, curr) => {
      if (curr.type === TransactionType.EXPENSE) {
        return acc + curr.amount;
      } else {
        return acc;
      }
    }, 0);
    return totalExpenses;
  };

  return (
    <>
      <Card>
        <CardHeader title='Resumen de caja' />
        <CardContent>
          <Stack direction='column' spacing={2} justifyContent='flex-end'>
            {/* <Box>

            <InputLabel id="date">Fecha</InputLabel>
            <Typography variant='h6' >{format(new Date(), 'yyyy-MM-dd')}</Typography>
          </Box> */}

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Creado por</InputLabel>
              <Typography variant='h5'>
                {cashRegister.createdBy.person.firstName}{' '}
                {cashRegister.createdBy.person.lastName}
              </Typography>
            </Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Fecha</InputLabel>
              <Typography variant='h5'>
                {format(new Date(cashRegister.createdAt), 'yyyy-MM-dd HH:mm')}
              </Typography>
            </Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Monto inicial</InputLabel>
              <Typography variant='h5'>
                $ {cashRegister.initialAmount}
              </Typography>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Ingresos</InputLabel>
              <Typography variant='h4' color='success.main'>
                $ {getTotalIncomes(cashRegister)}
              </Typography>
            </Box>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Gastos</InputLabel>
              <Typography variant='h4' color='error.main'>
                $ {getTotalExpenses(cashRegister)}
              </Typography>
            </Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <InputLabel id='date'>Monto final</InputLabel>
              <Typography variant='h3'>
                {formatMoney(getBalance(cashRegister))}
              </Typography>
            </Box>

            {/* <Box display='flex' justifyContent='right' alignItems='center'>

          <Button
            variant='text'
            onClick={toggleModal}
            startIcon={isOpen ? <Close /> : <PointOfSale />}
          >
            {
              isOpen ? 'Cancelar' : 'Cerrar caja'
            }
          </Button>
        </Box>

        {
          isOpen && (
            <>

              

            </>
          )
        }

        <Divider /> */}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
