import { FC, useContext } from 'react';

import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { TypeOrder } from '../../../../../../models';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../../../../../redux/slices/orders/orders.slice';
import { SocketContext } from '../../../../../../context';
import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { useSnackbar } from 'notistack';
import { UpdateOrderDto } from '../../../dto/update-order.dto';
import { DeliveryDining, LocalDining } from '@mui/icons-material';

interface Props {
  type: TypeOrder;
  setType: (type: TypeOrder) => void;
}

export const OrderTypeSelector: FC<Props> = ({ type, setType }) => {
  const { activeOrder } = useSelector(selectOrders);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (type: TypeOrder) => {
    // console.log({ id: activeOrder!.id, type })
    // const data: UpdateOrderDto = {
    //   id: activeOrder!.id,
    //   typeOrder: type
    // }
    // socket?.emit('update-order', data, (res: SocketResponseOrder) => {
    //   if (!res.ok) {
    //     enqueueSnackbar(res.msg, { variant: 'error' })
    //   }
    // })
  };

  return (
    <>
      <ToggleButtonGroup
        value={type}
        onChange={(_, value) => setType(value as TypeOrder)}
        exclusive
        size='small'
        fullWidth
      >
        <ToggleButton value={'TAKE_AWAY'}>
          <DeliveryDining />
          Para llevar
        </ToggleButton>
        <ToggleButton value={'IN_PLACE'}>
          <LocalDining />
          Para servir
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
