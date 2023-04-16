import { useContext } from 'react';

import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { TypeOrder } from "../../../../../../models"
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { SocketContext } from "../../../../../../context";
import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { useSnackbar } from 'notistack';
import { UpdateOrderDto } from '../../../dto/update-order.dto';
import { DeliveryDining, LocalDining } from '@mui/icons-material';



export const SelectTypeOrder = () => {

  const { activeOrder } = useSelector(selectOrders);

  const { socket } = useContext(SocketContext)

  const { enqueueSnackbar } = useSnackbar();




  const handleChange = (type: TypeOrder) => {

    console.log({ id: activeOrder!.id, type })

    const data: UpdateOrderDto = {
      id: activeOrder!.id,
      typeOrder: type
    }

    socket?.emit('update-order', data, (res: SocketResponseOrder) => {

      if (!res.ok) {
        enqueueSnackbar(res.msg, { variant: 'error' })
      }
    })




  }


  return (<>
    <Typography variant='h5'>Tipo de orden</Typography>
    <Box
      display='flex' gap={2} alignItems='center'
      justifyContent='center'
    >
      <Box>


        <ToggleButtonGroup
          value={activeOrder!.type}

          onChange={(_, value) => handleChange(value as TypeOrder)}

          exclusive
        >
          <ToggleButton
            value={"TAKE_AWAY"}
          >
            <DeliveryDining />
          </ToggleButton>
          <ToggleButton
            value={"IN_PLACE"}
          >
            <LocalDining />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

    </Box>
  </>
  )
}