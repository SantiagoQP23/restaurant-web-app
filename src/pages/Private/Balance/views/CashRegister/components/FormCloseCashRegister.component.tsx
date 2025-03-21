import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { UpdateCashRegisterDto } from '../../../dto/update-cash-register.dto';
import { useUpdateCashRegister } from '../../../hooks/useCashRegister';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useNavigate } from 'react-router-dom';
import { CashRegister } from '../../../models/cash-register.model';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';

interface Props {
  cashRegister: CashRegister;
  onSuccess: () => void;
}

/**
 * @author Steven Rosales
 * @version 1.1 20-03-2025 Add isActive to cash register
 */
export const FormCloseCashRegister: FC<Props> = ({
  cashRegister,
  onSuccess
}) => {
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [closingNote, setClosingNote] = useState<string>('');

  const { removeCashRegister } = useCashRegisterStore((state) => state);

  const updateCashMutation = useUpdateCashRegister();

  const navigate = useNavigate();

  const handleChangeFinalAmount = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);

    if (Number.isNaN(value)) value = 0;

    setFinalAmount(value);
  };

  const handleChangeClosingNote = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setClosingNote(value);
  };

  const handleSubmit = () => {
    const data: UpdateCashRegisterDto = {
      id: cashRegister.id,
      finalAmount,
      closingNote,
      isActive: false
    };

    updateCashMutation.mutateAsync(data).then(() => {
      removeCashRegister(cashRegister.id);
      onSuccess();
      navigate('/financial/cash-register');
    });
  };

  const discrepancyAmount = cashRegister.balance - finalAmount;

  return (
    <>
      <Card>
        <CardHeader title='Cerrar caja' />
        <CardContent>
          <Stack spacing={2}>
            <InputLabel id='amount'>
              ¿Cuánto dinero tiene en efectivo?
            </InputLabel>
            <TextField
              type='number'
              value={finalAmount}
              onChange={handleChangeFinalAmount}
              inputProps={{
                lang: 'en'
              }}
            />

            {finalAmount > 0 && discrepancyAmount !== 0 && (
              <>
                <Box
                  sx={{
                    backgroundColor:
                      discrepancyAmount === 0 ? 'success.main' : 'warning.main',
                    padding: '1rem',
                    borderRadius: '1rem',
                    color: 'black'
                  }}
                >
                  <Typography variant='body1'>
                    Tienes un descuadre.{' '}
                    {discrepancyAmount < 0 ? 'Te sobran ' : 'Te faltan'}{' '}
                    {formatMoney(Math.abs(discrepancyAmount))}
                  </Typography>
                </Box>
                <TextField
                  value={closingNote}
                  onChange={handleChangeClosingNote}
                  multiline
                  label='Notas de cierre'
                  rows={3}
                />
              </>
            )}

            <Button variant='contained' onClick={handleSubmit}>
              Cerrar caja
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
