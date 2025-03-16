import { useNavigate } from 'react-router-dom';

import {
  Button,
  Grid,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  CardContent,
  Card
} from '@mui/material';

import { useContext, useState } from 'react';
import {
  ArrowBackIos,
  DeliveryDining,
  LocalDining,
  ShoppingCart
} from '@mui/icons-material';
import { OrderActionType, OrderContext } from '../../context/Order.context';

import { TitlePage } from '../../../components/TitlePage.component';

import { OrderDetails, NewOrderSummary } from './components';
import { TypeOrder } from '../../../../../models';
import { TableOrder } from '../../components';
import { ModalOrderAdded } from './components/ModalOrderAdded.component';
import { useNewOrderStore } from '../../store/newOrderStore';

export const AddOrder = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<number>(0);

  const { reset } = useNewOrderStore((state) => state);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const {
    dispatch,
    state: { typeOrder }
  } = useContext(OrderContext);

  const BtnBack = () => (
    <Button
      color='inherit'
      onClick={handleBack}
      startIcon={<ArrowBackIos fontSize='small' />}
      size='small'
    >
      Atras
    </Button>
  );

  return (
    <>
      <Container maxWidth='xl' sx={{ pb: 5 }}>
        <TitlePage title='Nuevo pedido' />

        <Grid container spacing={1}>
          <Grid item xs={12} md={8}>
            {activeStep === 0 && (
              <>
                <OrderDetails />

                <Stack
                  direction='row'
                  spacing={1}
                  justifyContent='space-between'
                  my={2}
                >
                  <Button
                    startIcon={<ShoppingCart />}
                    fullWidth={false}
                    onClick={() => {
                      navigate('/orders/add/menu');
                    }}
                    color='primary'
                  >
                    Añadir productos
                  </Button>
                  <Button
                    color='error'
                    variant='outlined'
                    size='small'
                    onClick={reset}
                  >
                    Limpiar
                  </Button>
                </Stack>
              </>
            )}

            {activeStep === 1 && (
              <>
                <Card>
                  <CardContent>
                    <Stack spacing={2} direction='column'>
                      <Stack direction='row' justifyContent='center'>
                        <ToggleButtonGroup
                          value={typeOrder}
                          onChange={(e, value) =>
                            dispatch({
                              type: OrderActionType.SET_TYPE_ORDER,
                              payload: value
                            })
                          }
                          exclusive
                        >
                          <ToggleButton value={TypeOrder.TAKE_AWAY}>
                            <DeliveryDining />
                            Para llevar
                          </ToggleButton>
                          <ToggleButton value={TypeOrder.IN_PLACE}>
                            <LocalDining />
                            Para servir
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Stack>

                      {typeOrder === TypeOrder.IN_PLACE && (
                        <>
                          <TableOrder />
                        </>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
                <Stack
                  direction='row'
                  spacing={1}
                  justifyContent='space-between'
                >
                  <BtnBack />
                </Stack>
              </>
            )}

            {/* <Button

                onClick={() => {
                  dispatch({ type: OrderActionType.RESET })
                  navigate('/orders')
                }}
                color='error'
              >
                Limpiar
              </Button> */}
          </Grid>

          <Grid item xs={12} md={4}>
            <NewOrderSummary step={activeStep} />
          </Grid>
        </Grid>
      </Container>

      <ModalOrderAdded />
    </>
  );
};
