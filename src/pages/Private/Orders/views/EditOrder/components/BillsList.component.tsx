import { FC } from 'react';

import { Receipt } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Stack,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemSecondaryAction
} from '@mui/material';
import { format } from 'date-fns';
import { Invoice } from '../../../models/Invoice.model';
import { useDrawerInvoiceStore } from '../../../store/drawerInvoiceStore';
import { CardHeader, CardActions } from '@mui/material/';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { LabelInvoiceStatus } from '../../../../components/LabelInvoiceStatus.component';
import { Bill } from '../../../../../../models/bill.model';
import { Label } from '../../../../../../components/ui';
import NiceModal from '@ebay/nice-modal-react';
import { DrawerBill } from '../../../../Bills/components/DrawerBill.component';

interface Props {
  bills: Bill[];
}

export const BillsList: FC<Props> = ({ bills }) => {
  const showDrawerBill = (bill: Bill) => {
    NiceModal.show(DrawerBill, { bill });
  };

  return (
    <>
      <Card>
        <CardHeader title={'Pagos'} />
        <CardContent>
          <Stack>
            {bills.map((bill) => (
              <ListItemButton
                onClick={() => showDrawerBill(bill)}
                key={bill.id}
              >
                {/* <ListItemAvatar>
                    <Avatar>
                      <Receipt color={bill.isActive ? "inherit" : "error"} />
                    </Avatar>
                  </ListItemAvatar> */}

                <ListItemText
                  primary={
                    <>
                      <Typography variant='body1'>
                        Cuenta N° {bill.num}{' '}
                        {bill.isPaid && (
                          <Label color='success' sx={{ ml: 1 }}>
                            Pagado
                          </Label>
                        )}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography variant='body1'>
                        {bill.client &&
                          `${bill.client.person.firstName} ${bill.client.person.lastName}`}
                      </Typography>
                      <Typography fontSize={13}>
                        {format(new Date(bill.createdAt), 'dd/MM/yyy HH:mm')}
                      </Typography>
                    </>
                  }
                />

                <ListItemSecondaryAction>
                  <Typography variant='body1'>
                    {formatMoney(bill.total || 0)}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
            ))}
          </Stack>
        </CardContent>

        <CardActions
          sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}
        >
          <Typography>Total</Typography>

          <Typography variant='h5'>
            {formatMoney(
              bills.reduce((acc, d) => acc + (d.total || 0), 0) || 0
            )}
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};
