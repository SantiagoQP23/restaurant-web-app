import { Done } from '@mui/icons-material';
import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
  Stack,
  InputLabel
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { FC, useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SocketContext } from '../../../../../../context';
import { selectOrders, setActiveOrder } from '../../../../../../redux';
import { UpdateOrderDto } from '../../../dto/update-order.dto';
import { EventsEmitSocket } from '../../../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../../../interfaces/responses-sockets.interface';
import { useUpdateOrder } from '../../../hooks';
import { CounterInput } from '../../../components/CounterInput.component';
import { Order } from '../../../../../../models';

interface Props {
  order: Order;
}

export const PeopleCounter: FC<Props> = ({ order }) => {
  const [people, setPeople] = useState<number>(order.people);

  const { socket } = useContext(SocketContext);

  const { activeOrder } = useSelector(selectOrders);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateOrder, isLoading } = useUpdateOrder();

  const handleChangePeople = (value: number) => {
    setPeople(value);
  };

  const updatePeopleOrder = () => {
    const data: UpdateOrderDto = {
      id: activeOrder!.id,
      people
    };

    updateOrder(data);
  };

  return (
    <>
      <InputLabel>Personas</InputLabel>
      <Stack direction='row'>
        <CounterInput value={people} onChange={handleChangePeople} min={1} />
        {activeOrder?.people !== people && (
          <IconButton onClick={() => updatePeopleOrder()}>
            {isLoading ? <CircularProgress size={20} /> : <Done />}
          </IconButton>
        )}
      </Stack>
    </>
  );
};
