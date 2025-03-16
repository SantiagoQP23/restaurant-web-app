import { FC, useState } from 'react';

import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button
} from '@mui/material';
import { Label } from '../../../../../../components/ui';
import { useRuleMonth, useUpdateRuleMonth } from '../../../hooks/useRuleMonth';
import { RuleMonth } from '../../../models/rule-month.model';
import { LoadingButton } from '@mui/lab';
import { UpdateRuleMonthDto } from '../../../dto/update-rule-month.dto';

interface MonthRuleProps {
  month: RuleMonth;
}

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

const MonthRule: FC<MonthRuleProps> = ({ month }) => {
  const [value, setValue] = useState<number>(month.value);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const { mutateAsync, isLoading } = useUpdateRuleMonth();

  const handleSubmit = () => {
    const data: UpdateRuleMonthDto = {
      id: month.id,
      value
    };

    mutateAsync(data);
  };

  return (
    <Card>
      <CardHeader
        action={
          <>
            <Label color='info'> {month.num} </Label>
          </>
        }
        title={months[month.num - 1]}
        titleTypographyProps={{ variant: 'h4' }}

        // subheader="2.2"
      />
      <CardContent>
        <TextField
          label='Valor'
          type='number'
          value={value}
          onChange={handleChangeValue}
          inputProps={{
            step: 0.1
          }}
          fullWidth
        />
      </CardContent>

      <CardActions sx={{ justifyContent: 'right' }}>
        <LoadingButton
          variant='outlined'
          size='small'
          loading={isLoading}
          onClick={handleSubmit}
          disabled={value === month.value}
        >
          Actualizar
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export const MonthRules = () => {
  const { rulesMonthQuery } = useRuleMonth();

  const { isLoading, data } = rulesMonthQuery;

  return (
    <>
      <Typography variant='h4' my={2}>
        Reglas del mes
      </Typography>

      <Grid container spacing={2}>
        {data?.map((item, index) => (
          <Grid item xs={12} md={4} xl={3} key={item.id}>
            <MonthRule month={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
