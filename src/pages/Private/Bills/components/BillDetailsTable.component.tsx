import React, { FC } from 'react';
import { BillDetail } from '../../../../models/bill-detail.model';
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material';
import { formatMoney } from '../../Common/helpers/format-money.helper';


interface Props {
  details: BillDetail[];
}

/**
 * @author Steven Rosales
 * @version 1.0 15-03-2025 Add iva to bill
 * @version 1.1 20-03-2025 Remove iva from bill
 */
export const BillDetailsTable: FC<Props> = ({ details }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>IVA</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {details.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell align='center'>{detail.quantity}</TableCell>
              <TableCell>{detail.orderDetail.product.name}</TableCell>
              <TableCell align='right'>
                {formatMoney(detail.orderDetail.price)}
              </TableCell>
              <TableCell align='right'>
                {formatMoney(detail.orderDetail.price)}
                {/* <Typography variant='caption' color='textSecondary'>
                  {` (${formatPercentage(Number(detail.orderDetail.product.iva))})`}
                </Typography> */}
              </TableCell>
              <TableCell align='right'>{formatMoney(detail.total)}</TableCell>
            </TableRow>
          ))}

          {/* <TableRow>
            <TableCell
              colSpan={3}
              align="right"
              sx={{
                border: "none",
              }}
            >
              <Typography variant="subtitle1" color="textSecondary">
                Subtotal
              </Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{
                border: "none",
              }}
            >
              <Typography variant="subtitle1">
                {formatMoney(activeInvoice.amount)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              colSpan={3}
              align="right"
              sx={{
                border: "none",
              }}
              size="small"
            >
              <Typography variant="subtitle1" color="textSecondary">
                Descuento
              </Typography>
            </TableCell>
            <TableCell
              align="right"
              sx={{
                border: "none",
              }}
              size="small"
            >
              <Typography variant="h5" color="error">
                {" "}
                - {formatMoney(activeInvoice.discount || 0)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="h6" color="textSecondary">
                Total
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h4">
                {formatMoney(activeInvoice.total || 0)}
              </Typography>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </>
  );
};
