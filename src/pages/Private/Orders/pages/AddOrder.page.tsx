import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Grid, Card, CardContent, Typography, TextField } from '@mui/material';

import { MenuAddProduct } from '../components/EditOrder/MenuAddProduct.component';
import { DataClient } from '../components';
import { TableOrder } from '../components/ReceiptOrder/TableOrder.component';


import { useContext } from 'react';
import { Add } from "@mui/icons-material";
import { CardHeader, Box, } from "@mui/material"
import { OrderDetail } from "./../components"
import { OrderContext } from '../context/Order.context';
import { NewOrderDetail } from '../components/AddOrder/NewOrderDetail.component';
import { SocketContext } from '../../../../context/SocketContext';
import { CreateOrderDto } from '../dto/create-order.dto';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { useSnackbar } from 'notistack';






const People: FC = () => {

  const {people, setPeople} = useContext(OrderContext);

  return (
    <>
      <Card>
        <CardContent>
          <TextField
            type='number'
            label='Personas'
            value={people}
            onChange={(e)=>{setPeople(Number(e.target.value))}}
          />
        </CardContent>
      </Card>
    </>
  )
}


export const OrderDetails = () => {


  const navigate = useNavigate();

  const { details } = useContext(OrderContext)


  return (

    <>
      <Card>
        <CardHeader title={
          <Box display='flex' justifyContent='space-between' alignItems='center'>

            <Typography variant="body1" fontWeight='bold'>Detalles de pedido</Typography>

          </Box>
        } />

        <CardContent >
          <Grid container spacing={1}>
            {
              details.map((detail) => (

                <Grid key={detail.product.name} item xs={12}>
                  <NewOrderDetail detalle={detail} />
                </Grid>

              ))

            }
          </Grid>
        </CardContent>

      </Card>
    </>
  )
}



export const AddOrder = () => {

  const navigate = useNavigate();

  const {socket}= useContext(SocketContext);

  const { amount, reset,getOrder } = useContext(OrderContext);

  const cancelOrder = () => {
    navigate(-1);
    reset();
  }

  const {enqueueSnackbar} = useSnackbar();

  const submitAddOrder = () => {

    const order: CreateOrderDto = getOrder();

    socket?.emit(EventsEmitSocket.createOrder, order, (resp: SocketResponseOrder)=>{

      console.log('orden creada', resp)
      if(resp.ok){

        navigate('/orders');
        reset();
      }else{
        enqueueSnackbar(resp.msg, {variant: 'error'});
      }


    });



  }



  return (
    <>
      <Card sx={{mb: 2}}>
        <CardContent>
          <Grid container spacing={1} justifyContent='space-between' >
            <Grid item >

              <Typography variant='h6'>Nuevo pedido</Typography>
            </Grid>
            
            <Grid item display='flex' justifyContent='right' alignItems='center'>

              <Button variant='outlined' onClick={cancelOrder}>Cancelar</Button>
              {/* <Typography variant='body2'>$ {amount}</Typography> */}
              <Button variant='contained' onClick={submitAddOrder}> ${amount} Create Order</Button>
            </Grid>
            
          </Grid>

        </CardContent>
      </Card>

      <Grid container spacing={1} alignItems='start'>
        <Grid item xs={12} md={6}>
          <MenuAddProduct />

        </Grid>
        <Grid container spacing={1} item xs={12} md={6}>
          <Grid item xs={12} md={6}>
            <TableOrder />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <People />
          </Grid>

          <Grid item xs={12} >
            <DataClient />
          </Grid>
          <Grid item xs={12}>
            <OrderDetails />

          </Grid>
        </Grid>
      </Grid>


    </>
  )
}