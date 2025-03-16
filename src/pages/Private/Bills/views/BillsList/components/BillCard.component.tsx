import React, { FC } from 'react';
import { Bill } from '../../../../../../models/bill.model';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { Label } from '../../../../../../components/ui';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useNavigate } from 'react-router-dom';
import { Visibility } from '@mui/icons-material';

interface Props {
  bill: Bill;
}

/**
 * Component to display the bill card
 * @version v1.0 24-12-2023
 */
export const BillCard: FC<Props> = ({ bill }) => {
  const navigate = useNavigate();

  const navitateToEditBill = () => {
    navigate(`/bills/${bill.id}/edit`);
  };

  const navigateToBill = () => {
    navigate(`/bills/${bill.id}`);
  };

  return (
    <>
      <Card>
        <CardHeader
          title={`Cuenta #${bill.num}`}
          subheader={`${bill.owner.person.firstName} ${bill.owner.person.lastName}`}
          action={
            <Typography variant='h4'>{formatMoney(bill.total)}</Typography>
          }
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            Creado el
          </Typography>
          <Typography>
            {format(new Date(bill.createdAt), 'dd/MM/yyyy HH:mm')}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'space-between'
          }}
        >
          <Label color={bill.isPaid ? 'success' : 'warning'}>
            {bill.isPaid ? 'Pagada' : 'Pendiente'}
          </Label>
          <Stack direction='row' spacing={1}>
            <IconButton onClick={navigateToBill} size='small'>
              <Visibility />
            </IconButton>
            <Button
              variant='contained'
              color='primary'
              size='small'
              disabled={bill.isPaid}
              onClick={navitateToEditBill}
            >
              Cobrar
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};
