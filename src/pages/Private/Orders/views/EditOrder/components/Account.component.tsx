import {
  Card,
  FormControlLabel,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { useInvoiceStore } from '../../../store/invoiceStore';
import { FC, useState } from 'react';
import { Order, IOrderDetail } from '../../../../../../models';
import { CounterInput } from '../../../components';
import { CardHeader } from '@mui/material/';
import { ArrowBackIos, Send } from '@mui/icons-material';
import { Label } from '../../../../../../components/ui';
import { formatMoney } from '../../../../Common/helpers/format-money.helper';
import { useCreateBill } from '../../../../Bills/hooks/useBills';
import { CreateBillDto } from '../../../../Bills/dto';
import { useCashRegisterStore } from '../../../../Common/store/useCashRegisterStore';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from '../../../../../../redux';

interface SelectedDetails {
  [id: string]: {
    detail: IOrderDetail;
    quantity: number;
  };
}

interface Props {
  order: Order;
  onSuccess?: () => void;
}

/**
 * Componente for create bills
 * @author Santiaago Quirumbay
 * @version v1.1 22-12-2023 Adds create bills
 * @version v1.2 02-01-2024 Fix bug: total order to pay
 * @version v1.3 21-04-2024 Fix bug: details with quantity 0
 * @version 1.4. 01-03-2025 Add onSuccess prop
 */
export const Account: FC<Props> = ({ order, onSuccess }) => {
  const details = order.details.filter(
    (detail) => detail.qtyPaid !== detail.quantity
  );
  const { handleBackStep } = useInvoiceStore((state) => state);

  const dispatch = useDispatch();

  const [selectedDetails, setSelectedDetails] = useState<SelectedDetails>({});

  const [selectAll, setSelectAll] = useState(false);

  const [total, setTotal] = useState(0);

  const { mutate: createBill, isLoading } = useCreateBill();

  const getTotalSelectedDetails = (selectedDetails: SelectedDetails) => {
    let total = 0;
    Object.keys(selectedDetails).forEach((id) => {
      const selectedDetail = selectedDetails[id];
      total += selectedDetail.quantity * selectedDetail.detail.price;
    });
    return total;
  };

  const getTotalToPay = () => {
    let total = 0;
    details.forEach((detail) => {
      total += (detail.quantity - detail.qtyPaid) * detail.price;
    });
    return total;
  };

  const handleToggleSelectAll = (allDetails: boolean) => {
    setSelectAll(() => {
      setTotal(
        allDetails ? getTotalToPay() : getTotalSelectedDetails(selectedDetails)
      );

      return allDetails;
    });
  };

  const handleUpdateDetail = (orderDetail: IOrderDetail, quantity: number) => {
    setSelectedDetails((prev) => {
      const newSelectedDetails: SelectedDetails = { ...prev };

      newSelectedDetails[orderDetail.id] = {
        detail: orderDetail,
        quantity
      };
      setTotal(getTotalSelectedDetails(newSelectedDetails));
      return newSelectedDetails;
    });
  };

  const onSubmit = () => {
    const data: CreateBillDto = {
      orderId: order.id,
      details: []
    };

    if (selectAll) {
      data.details = details.map((detail) => ({
        orderDetailId: detail.id,
        quantity: detail.quantity - detail.qtyPaid
      }));
    } else {
      // Enviar solo los seleccionados
      data.details = Object.keys(selectedDetails)
        .filter((id) => selectedDetails[id].quantity > 0)
        .map((id) => {
          const selectedDetail = selectedDetails[id];
          return {
            orderDetailId: selectedDetail.detail.id,
            quantity: selectedDetail.quantity
          };
        });
    }
    console.log(data);
    createBill(data, {
      onSuccess: ({ data: order }) => {
        console.log(order);
        dispatch(setActiveOrder(order!));
        onSuccess && onSuccess();
        // handleBackStep();
      }
    });
  };

  const BtnBack = () => (
    <Button
      color='inherit'
      onClick={handleBackStep}
      startIcon={<ArrowBackIos fontSize='small' />}
      size='small'
    >
      Atras
    </Button>
  );

  const getDescription = (orderDetail: IOrderDetail) => (
    <>
      <Label color='warning'>
        {orderDetail.quantity - orderDetail.qtyPaid}
      </Label>{' '}
      <b>
        {`${orderDetail.product.name} `}
        {orderDetail.productOption ? `(${orderDetail.productOption.name})` : ''}
      </b>{' '}
      de <b>{orderDetail.quantity}</b>
    </>
  );

  return (
    <>
      <Stack spacing={2}>
        <Card>
          <CardHeader
            title='Detalle de la orden'
            action={
              <>
                <FormControlLabel
                  label='Todo'
                  control={
                    <Checkbox
                      checked={selectAll}
                      onChange={(e) => {
                        handleToggleSelectAll(e.target.checked);
                      }}
                    />
                  }
                  // labelPlacement='start'
                />
              </>
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
                  {!selectAll && (
                    <TableCell padding='checkbox' align='center'>
                      Cantidad
                    </TableCell>
                  )}
                  <TableCell>Producto</TableCell>
                  <TableCell>Precio</TableCell>

                  <TableCell align='right'>Subtotal</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {details.map((detail, index) => (
                  <TableRow key={index}>
                    {!selectAll && (
                      <TableCell>
                        <CounterInput
                          value={selectedDetails[detail.id]?.quantity || 0}
                          onChange={(value: number) => {
                            handleUpdateDetail(detail, value);
                          }}
                          max={detail.quantity - detail.qtyPaid}
                          min={0}
                        />
                      </TableCell>
                    )}
                    <TableCell>{getDescription(detail)}</TableCell>
                    <TableCell>{formatMoney(detail.price)}</TableCell>
                    <TableCell align='right'>
                      {selectAll
                        ? formatMoney(
                            detail.price * (detail.quantity - detail.qtyPaid)
                          )
                        : formatMoney(
                            detail.price *
                              selectedDetails[detail.id]?.quantity || 0
                          )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {details.length === 0 ? (
              <Typography
                variant='h6'
                color='textSecondary'
                textAlign='center'
                p={2}
              >
                No hay detalles
              </Typography>
            ) : (
              <Grid container spacing={3} p={2} width='auto'>
                <Grid item xs={8}>
                  <Typography
                    variant='h6'
                    color='textSecondary'
                    textAlign='right'
                  >
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h4' textAlign='right'>
                    {formatMoney(total)}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </TableContainer>
        </Card>

        <Stack direction='row' spacing={1} justifyContent='right'>
          {/* <BtnBack /> */}
          <LoadingButton
            variant='contained'
            endIcon={<Send />}
            onClick={onSubmit}
            loading={isLoading}
            disabled={total === 0}
          >
            Crear cuenta
          </LoadingButton>
        </Stack>
      </Stack>
    </>
  );
};
