import React, { useEffect, useMemo, useState } from 'react';
import { useBill, useUpdateBill } from '../../hooks/useBills';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { BillDetailsTable } from '../../components/BillDetailsTable.component';
import {
  MonetizationOnOutlined,
  CreditCard,
  AttachMoney,
  PersonAddOutlined,
  CreditCardOutlined,
  AccountBalanceWalletOutlined
} from '@mui/icons-material';
import { IClient, PaymentMethod } from '../../../../../models';
import { formatMoney } from '../../../Common/helpers/format-money.helper';
import { TitlePage } from '../../../components';
import { ComboBoxClient } from '../../../Orders/components';
import { LoadingButton } from '@mui/lab';
import { Label } from '../../../../../components/ui';
import { format } from 'date-fns';
import { UpdateBillDto } from '../../dto';
import { AddClientModalProps } from '@/pages/Private/Clients/components/AddClient/AddClientModal.component';
import NiceModal from '@ebay/nice-modal-react';
import { AddClientModal } from '@/pages/Private/Clients/components/AddClient/AddClientModal.component';
import { useSnackbar } from 'notistack';
// import { useCashRegisterStore } from "../../../Common/store/useCashRegisterStore";
//

export interface IPaymentMethod {
  name: string;
  value: string;
  icon: React.ReactNode;
}

/**
 * Component for pay a bill
 *
 * @author Santiago Quirumbay
 * @version 1.1 28-02-2025 Remove payment method
 * @author Steven Rosales
 * @version 1.2 15-03-2025 Add iva to bill
 * @version 1.3 20-03-2025 Remove iva from bill
 */
export const PaymentBill = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  if (!id) return <Navigate to='/bills' replace />;

  const { isPending, data: bill } = useBill(+id);

  const navigate = useNavigate();
  // const { cashRegisters } = useCashRegisterStore((state) => state);
  const {
    mutate: updateBill,
    isLoading: isUpdating,
    isOnline
  } = useUpdateBill();

  // const { activeCashRegister } = useCashRegisterStore((state) => state);

  const [step, setStep] = useState(1);

  const handleChangeStep = (step: number) => () => setStep(step);

  const [client, setClient] = useState<IClient | null>(null);

  const [withClient, setWithClient] = useState<boolean>(false);

  const [discount, setDiscount] = useState<number>(0);

  const total = useMemo(() => {
    if (!bill) return 0;

    const total = bill.total - discount;

    return total < 0 ? 0 : total;
  }, [bill, discount]);

  const handleChangeDiscount = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDiscount(+event.target.value);

  const handleChangeWithClient = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWithClient(event.target.value === 'true');

  const handleChangeClient = (client: IClient | null) => setClient(client);
  const [receivedAmount, setReceivedAmount] = useState<number>(0);

  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod | null>(
    null
  );

  const openCreateClientModal = () => {
    const data: AddClientModalProps = { onClientCreated: handleChangeClient };
    NiceModal.show(AddClientModal, data);
  };

  const handleChangePaymentMethod = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(() => {
      const value = event.target.value as PaymentMethod;
      const newMethod = paymentMethods.find(
        (method) => method.value === value
      )!;
      setReceivedAmount(0);

      return newMethod;
    });
  };

  const handleChangeAmountPaid = (event: React.ChangeEvent<HTMLInputElement>) =>
    setReceivedAmount(+event.target.value);

  const navigateToBill = () => {
    if (!bill) return;
    navigate(`/bills/${bill.id}`);
  };

  const paymentMethods: IPaymentMethod[] = [
    {
      name: 'Cash',
      value: 'CASH',
      icon: <MonetizationOnOutlined fontSize='small' />
    },
    {
      name: 'Credit Card',
      value: 'CREDIT_CARD',
      icon: <CreditCardOutlined fontSize='small' />
    },
    {
      name: 'Transfer',
      value: 'TRANSFER',
      icon: <AccountBalanceWalletOutlined fontSize='small' />
    }
  ];

  const submitPayment = () => {
    if (!bill) {
      alert('Error al registrar el pago');
      return;
    }

    if (!paymentMethod) {
      alert('Seleccione una forma de pago');
      return;
    }

    if (paymentMethod.value === PaymentMethod.CASH && receivedAmount < total) {
      enqueueSnackbar('La cantidad recibida es insuficiente', {
        variant: 'error'
      });
      return;
    }

    const data: UpdateBillDto = {
      id: bill.id,
      discount,
      paymentMethod: paymentMethod.value,
      receivedAmount,
      isPaid: true
      // cashRegisterId: activeCashRegister!.id,
    };

    // if (!withClient) {
    //   data.clientId = '0999999999';
    // } else {
    //   data.clientId = client?.id;
    // }

    updateBill(data, {
      onSuccess: () => {
        navigateToBill();
      }
    });
  };

  useEffect(() => {
    if (bill && bill.isPaid) navigateToBill();
  }, [bill]);

  if (isPending) return <>Loading...</>;

  if (!bill) return <>Not Found</>;

  return (
    <>
      <Container maxWidth='lg'>
        <TitlePage title={`Pago de cuenta #${bill.num}`} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack direction='column' spacing={2}>
              {/* <Card> */}
              {/*   <CardHeader */}
              {/*     avatar={ */}
              {/*       <Chip */}
              {/*         label={1} */}
              {/*         size='small' */}
              {/*         variant={step === 1 ? 'filled' : 'outlined'} */}
              {/*       /> */}
              {/*     } */}
              {/*     title='Cliente' */}
              {/*     subheaderTypographyProps={{ */}
              {/*       variant: 'h5', */}
              {/*       color: 'text.primary' */}
              {/*     }} */}
              {/*     action={ */}
              {/*       step !== 1 && ( */}
              {/*         <Button */}
              {/*           size='small' */}
              {/*           color='inherit' */}
              {/*           variant='outlined' */}
              {/*           onClick={handleChangeStep(1)} */}
              {/*         > */}
              {/*           Cambiar */}
              {/*         </Button> */}
              {/*       ) */}
              {/*     } */}
              {/*     subheader={ */}
              {/*       step !== 1 */}
              {/*         ? client */}
              {/*           ? `${client.person.firstName} ${client.person.lastName}` */}
              {/*           : 'Consumidor final' */}
              {/*         : '' */}
              {/*     } */}
              {/*   /> */}
              {/*   {step === 1 && ( */}
              {/*     <CardContent> */}
              {/*       <> */}
              {/*         <RadioGroup */}
              {/*           name='use-radio-group' */}
              {/*           value={withClient} */}
              {/*           onChange={handleChangeWithClient} */}
              {/*         > */}
              {/*           <FormControlLabel */}
              {/*             value={false} */}
              {/*             label={'Consumidor final'} */}
              {/*             control={<Radio />} */}
              {/*           /> */}
              {/*           <FormControlLabel */}
              {/*             value={true} */}
              {/*             label={'Seleccionar cliente'} */}
              {/*             control={<Radio />} */}
              {/*           /> */}
              {/*         </RadioGroup> */}
              {/*         <Box mt={1}> */}
              {/*           {withClient && ( */}
              {/*             <ComboBoxClient */}
              {/*               handleChangeClient={handleChangeClient} */}
              {/*               client={client} */}
              {/*             /> */}
              {/*           )} */}
              {/*         </Box> */}
              {/*       </> */}
              {/*       <Box */}
              {/*         sx={{ */}
              {/*           display: 'flex', */}
              {/*           justifyContent: 'flex-end', */}
              {/*           mt: 2 */}
              {/*         }} */}
              {/*       > */}
              {/*         {withClient && ( */}
              {/*           <Button */}
              {/*             variant='text' */}
              {/*             startIcon={<PersonAddOutlined />} */}
              {/*             onClick={openCreateClientModal} */}
              {/*           > */}
              {/*             Nuevo cliente */}
              {/*           </Button> */}
              {/*         )} */}
              {/*         <Button */}
              {/*           onClick={handleChangeStep(2)} */}
              {/*           variant='contained' */}
              {/*           disabled={withClient && !client} */}
              {/*         > */}
              {/*           Siguiente */}
              {/*         </Button> */}
              {/*       </Box> */}
              {/*     </CardContent> */}
              {/*   )} */}
              {/* </Card> */}
              <Card>
                <CardHeader
                  title='Forma de pago'
                  avatar={
                    <Chip
                      label={1}
                      size='small'
                      variant={step === 1 ? 'filled' : 'outlined'}
                    />
                  }
                  subheaderTypographyProps={{
                    variant: 'subtitle1',
                    color: 'text.primary'
                  }}
                  action={
                    step != 1 && (
                      <Button
                        size='small'
                        color='inherit'
                        variant='outlined'
                        onClick={handleChangeStep(1)}
                      >
                        Cambiar
                      </Button>
                    )
                  }
                  subheader={
                    paymentMethod && step !== 1 ? paymentMethod.name : ''
                  }
                />
                {step === 1 && (
                  <CardContent>
                    <RadioGroup
                      name='use-radio-group'
                      value={paymentMethod?.value || ''}
                      onChange={handleChangePaymentMethod}
                    >
                      <Stack spacing={2}>
                        {paymentMethods.map((method) => (
                          <FormControlLabel
                            key={method.value}
                            value={method.value}
                            label={
                              <Stack
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                                spacing={1}
                              >
                                {method.icon}
                                <Typography variant='body1'>
                                  {method.name}
                                </Typography>
                              </Stack>
                            }
                            control={<Radio />}
                          />
                        ))}

                        {
                          // paymentMethod === PaymentMethod.CASH && (
                          //   <Grid container spacing={1}>
                          //     {cashRegisters.length > 0 ? (
                          //       cashRegisters.map((cashRegister) => (
                          //         <Grid item xs={6} md={3} key={cashRegister.id}>
                          //           <CashRegisterItem
                          //             cashRegister={cashRegister}
                          //           />
                          //         </Grid>
                          //       ))
                          //     ) }
                          //   </Grid>
                          // )
                        }
                      </Stack>
                    </RadioGroup>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2
                      }}
                    >
                      <Button onClick={handleChangeStep(2)} variant='contained'>
                        Siguiente
                      </Button>
                    </Box>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader
                  title='Detalles de pago'
                  avatar={
                    <Chip
                      label={2}
                      size='small'
                      variant={step === 2 ? 'filled' : 'outlined'}
                    />
                  }
                />
                {step === 2 && (
                  <CardContent>
                    <Typography
                      variant='subtitle2'
                      fontSize='0.8rem'
                      textAlign='center'
                    >
                      Total
                    </Typography>
                    <Typography
                      variant={receivedAmount >= total ? 'h4' : 'h3'}
                      textAlign='center'
                    >
                      {`${formatMoney(total)}`}
                    </Typography>

                    {paymentMethod?.value === PaymentMethod.CASH && (
                      <Stack
                        direction='column'
                        alignItems='center'
                        mt={3}
                        spacing={2}
                      >
                        <TextField
                          label='Cantidad recibida'
                          variant='outlined'
                          type='number'
                          value={receivedAmount || ''}
                          onChange={handleChangeAmountPaid}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <AttachMoney />
                              </InputAdornment>
                            )
                          }}
                          sx={{
                            width: 200
                          }}
                        />

                        {receivedAmount >= total && (
                          <Box>
                            <Typography
                              variant='subtitle2'
                              fontSize='0.8rem'
                              textAlign='center'
                            >
                              Cambio
                            </Typography>
                            <Typography variant='h2' textAlign='center'>
                              {`${formatMoney(receivedAmount - total)}`}
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2
                      }}
                    >
                      <LoadingButton
                        variant='contained'
                        onClick={submitPayment}
                        loading={isUpdating}
                        startIcon={paymentMethod?.icon}
                      >
                        Registrar pago
                      </LoadingButton>
                    </Box>
                  </CardContent>
                )}
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title='Resumen de la cuenta' />
              <BillDetailsTable details={bill.details} />

              <Grid container spacing={2} p={2}>
                <Grid item xs={8}>
                  <Typography variant='h6' color='textSecondary'>
                    Descuento
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id='precio-producto'
                    type='number'
                    value={discount || ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AttachMoney />
                        </InputAdornment>
                      )
                    }}
                    onChange={handleChangeDiscount}
                    size='small'
                    inputProps={{
                      min: 0,

                      step: 0.25
                    }}
                  />
                </Grid>
                <Divider />

                <Grid item xs={8}>
                  <Typography variant='h3' color='textSecondary'>
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h3' textAlign='right'>
                    {formatMoney(total)}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardHeader
                title='Información de la cuenta'
                action={
                  <Label color={bill.isPaid ? 'success' : 'warning'}>
                    {bill.isPaid ? 'Pagada' : 'Pendiente'}
                  </Label>
                }
              />
              <CardContent>
                <Stack direction='column' spacing={1}>
                  <Box>
                    <Typography variant='body2' color='textSecondary'>
                      Creado por
                    </Typography>

                    <Typography variant='body1'>
                      {bill.createdBy.person.firstName}{' '}
                      {bill.createdBy.person.lastName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' color='textSecondary'>
                      Mesero
                    </Typography>

                    <Typography variant='body1'>
                      {bill.owner.person.firstName} {bill.owner.person.lastName}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant='body2' color='textSecondary'>
                      Fecha de creación
                    </Typography>
                    <Typography variant='body1'>
                      {format(new Date(bill.createdAt), 'dd/MM/yyyy HH:mm')}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
