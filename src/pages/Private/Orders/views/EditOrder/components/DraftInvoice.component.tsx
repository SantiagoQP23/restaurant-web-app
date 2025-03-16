import { FC, ChangeEvent } from 'react';

import {
  Card,
  CardHeader,
  Checkbox,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardActions,
  Table,
  IconButton,
  Typography
} from '@mui/material';

import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useInvoiceStore } from '../../../store/invoiceStore';
import { Close, DeleteOutline, MoreVert } from '@mui/icons-material';
import { CreateInvoiceDto } from '../../../dto';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';
import { LoadingButton } from '@mui/lab';
import { useCreateInvoiceOrder } from '../../../hooks/useInvocesOrder';
import { Invoice } from '../../../models/Invoice.model';

interface Props {
  invoice: Invoice;
}

export const DraftInvoice: FC<Props> = ({ invoice }) => {
  const { activeOrder } = useSelector(selectOrders);

  // const {
  //   activeInvoice,
  //   setActiveInvoice,
  //   removeInvoice,
  //   accountDetails,
  //   removeDetail,
  // } = useInvoiceStore((state) => state);

  const { activeCashRegister } = useCashRegisterStore();

  const { createInvoiceOrder, loading } = useCreateInvoiceOrder();

  const removeInvoice = () => {
    console.log('remove');
  };

  const handleSelectInvoice = (e: ChangeEvent<HTMLInputElement>) => {
    // const checked = e.target.checked;
    // if (!checked) return setActiveInvoice(null);
    // setActiveInvoice(invoice);
  };

  // const details = Object.entries(accountDetails).filter(([, value]) => {
  //   if (value.invoiceId === invoice.id) return value;
  // });

  // const totalInvoice = details.reduce(
  //   (acc, detail) =>
  //     acc + detail.orderDetailPayable.orderDetail.price * detail.quantity,
  //   0
  // );

  const handleCreateInvoice = () => {
    // if (!activeOrder || !activeCashRegister) return;
    // const data: CreateInvoiceDto = {
    //   orderId: activeOrder.id,
    //   details: details.map(([, detail]) => ({
    //     orderDetailId: detail.orderDetailPayable.id,
    //     quantity: detail.quantity,
    //   })),
    //   cashRegisterId: activeCashRegister.id,
    // };
    // console.log(data);
    // createInvoiceOrder(data);
  };

  return (
    <Card>
      <CardHeader
        title={`Cuenta ${invoice.transactionNumber}`}
        action={
          <IconButton color='error' onClick={() => removeInvoice()}>
            <DeleteOutline />
          </IconButton>
        }
      />

      <TableContainer>
        <Table
          sx={{
            whiteSpace: 'nowrap'
          }}
        >
          <TableHead>
            <TableRow>
              {
                <TableCell padding='checkbox' align='center'>
                  Cantidad
                </TableCell>
              }
              <TableCell>Producto</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>
                <MoreVert />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoice.details.map((detail) => (
              <TableRow key={detail.id}>
                {<TableCell align='center'>{detail.quantity}</TableCell>}
                <TableCell>
                  <b>{detail.title}</b>
                </TableCell>
                <TableCell>{formatMoney(detail.price)}</TableCell>
                <TableCell>
                  {formatMoney(detail.price * detail.quantity)}
                </TableCell>
                <TableCell align='center'>
                  {/* <IconButton onClick={() => removeDetail(key)} size="small">
                    <Close />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}

            {invoice.details.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  <Typography variant='h6' color='text.secondary' my={3}>
                    No hay productos
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <CardActions
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography>
           <b>Total:</b> {formatMoney(totalInvoice)} 
        </Typography>
        <LoadingButton
          variant="contained"
          size="small"
          disabled={details.length === 0}
          onClick={handleCreateInvoice}
          loading={loading}
        >
          Crear cuenta
        </LoadingButton>
      </CardActions> */}
    </Card>
  );
};
