import React, { FC, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, FormControl, FormHelperText, Typography, Box, IconButton, Stack
} from '@mui/material/'

import { ICreateOrderDetail } from '../../../../../models/orders.model';
import { SocketContext } from '../../../../../context';
import { sharingInformationService } from '../../services/sharing-information.service';
import { OrderContext } from '../../context/Order.context';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../redux/slices/orders/orders.slice';

import { CreateOrderDetailDto } from "../../dto/create-order-detail.dto";
import { useOrders } from '../../hooks/useOrders';
import { LoadingButton } from '@mui/lab';
import { useCreateOrder } from '../../hooks/useCreateOrder';
import { useCreateOrderDetail } from '../../hooks/useCreateOrderDetail';
import { useCounter } from '../../hooks';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';




interface Props {

}


export const ModalAddDetail: FC<Props> = ({ }) => {

  const { idPedido } = useParams();
  const [description, setDescription] = useState('');

  const subscription$ = sharingInformationService.getSubject();

  const [detail, setDetail] = useState<ICreateOrderDetail>();

  const { state: counter, increment, decrement, setCounter } = useCounter(detail?.quantity, 1, 100, 1);

  const { activeOrder } = useSelector(selectOrders);

  const [open, setOpen] = useState(false);



  const { addDetail, updateDetail } = useContext(OrderContext);

  const { enqueueSnackbar } = useSnackbar();

  const { createOrderDetail, loading } = useCreateOrderDetail();


  const crearDetalle = () => {

    if (activeOrder) {
      const data: CreateOrderDetailDto = {
        orderId: activeOrder.id,
        productId: detail!.product.id,
        quantity: counter
      }

      if (description) {
        data.description = description;
      }

      console.log({data})

      createOrderDetail(data);

    } else {

      addDetail({ ...detail!, quantity: counter, description })
    }

    enqueueSnackbar(`${detail?.product.name} agregado`, { variant: 'success' })


    // updateDetail({...detail!, description})

    setDescription('');
    setOpen(false)
  }

  useEffect(() => {
    subscription$.subscribe((data) => {

      setDetail(data.detalle)
      setOpen(!!data.value);
      setDescription(data.detalle?.description || '');
      setCounter(data.detalle?.quantity || 1);

    })
  }, [])



  return (
    <>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
          setDescription('');
        }}
      >
        <DialogTitle>Añadir Producto</DialogTitle>

        <DialogContent>
          <Typography variant="h4" mb={1}>{detail?.product.name}</Typography>

          <Typography variant="body2">{detail?.product.description}</Typography>

          <Stack direction='row' alignItems='center' justifyContent='space-between' my={2}>
            <Typography variant="body2" >Cantidad</Typography>
            <Box display='flex' alignItems='center'>

              <IconButton
                size="small"
                onClick={decrement}
              >
                <RemoveCircleOutline />
              </IconButton>

              <Typography sx={{ width: 40, textAlign: 'center' }}>{counter}</Typography>
              <IconButton
                size="small"
                onClick={increment}
              >
                <AddCircleOutline />
              </IconButton>

            </Box>

          </Stack>




          <FormControl fullWidth>
            <TextField
              id="descripcion-pedido"
              label="Notas"
              margin="dense"
              multiline
              rows={4}
              defaultValue={description}
              
              onBlur={(e) => {
                console.log(e.target.value);
                setDescription(e.target.value);

              }
            }
            variant='filled'
            
            />


          </FormControl>





        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
              setDescription('');
            }}

          >Cancelar</Button>
          <LoadingButton
            onClick={crearDetalle}
            variant="contained"
            loading={loading}
            startIcon={<ShoppingCartIcon />}

          >Añadir</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

