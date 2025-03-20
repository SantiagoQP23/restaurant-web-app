import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectTables } from '../../../../../../redux/slices/tables/tables.slice';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

interface Props {
  tableId: string;
  setTable: (tableId: string) => void;
}

export const OrderTable: FC<Props> = ({ tableId, setTable }) => {
  const { tables } = useSelector(selectTables);

  // const updateOrderDto: UpdateOrderDto = {
  //   id: activeOrder!.id,
  //   tableId,
  // }
  // const changeTableDto: ChangeTableDto = {
  //   previousTableId: activeOrder?.table?.id,
  //   newTableId: tableId
  // }
  // updateOrder(updateOrderDto)
  // //console.log('Actualizando mesas')
  // emitChangeTable(changeTableDto);

  // const emitChangeTable = (tablesId: ChangeTableDto) => {
  //   socket?.emit(EventsEmitSocket.changeTable, tablesId, ({ ok, msg, order }: SocketResponseOrder) => {

  //     console.log('response', ok);

  //     if (ok) {

  //     }

  //     else {
  //       enqueueSnackbar(msg, { variant: 'error' });
  //     }
  //   })

  // }

  // useEffect(() => {

  //   setTable(activeOrder?.table?.id);

  // }, [activeOrder]);

  return (
    <>
      {tables.length === 0 ? (
        <Typography variant='body1' color='gray' align='center'>
          No hay mesas disponibles
        </Typography>
      ) : (
        <>
          <FormControl fullWidth>
            <InputLabel id='table-order-id'>Mesa</InputLabel>
            <Select
              labelId='table-order-id'
              label='Mesa'
              value={tableId}
              onChange={(e) => setTable(e.target.value)}
              // disabled={activeOrder!.type !== TypeOrder.IN_PLACE}

              // error={activeOrder!.type === TypeOrder.IN_PLACE && !table}
            >
              <MenuItem value=''>Ninguna</MenuItem>
              {tables.map((table) => (
                <MenuItem key={table.id} value={table.id}>
                  Mesa {table.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
};
