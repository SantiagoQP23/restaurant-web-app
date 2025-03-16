import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box
} from '@mui/material';
import { FC, useContext } from 'react';
import {
  DriveFileRenameOutlineOutlined,
  TableRestaurant
} from '@mui/icons-material';
import { ITable } from '../../../../models';
import { OrderActionType, OrderContext } from '../context/Order.context';
import { SocketContext } from '../../../../context/SocketContext';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { useSnackbar } from 'notistack';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrders,
  setActiveOrder
} from '../../../../redux/slices/orders/orders.slice';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { selectTables } from '../../../../redux/slices/tables/tables.slice';
import { TypeOrder } from '../../../../models/orders.model';

interface Props {
  table?: ITable;
}

export const TableOrder: FC<Props> = () =>
  // { table: tableOrder = { id: '', name: '' } }
  {
    const {
      state: { table: tableOrder, typeOrder },
      dispatch: dispatchReducer
    } = useContext(OrderContext);

    const { socket } = useContext(SocketContext);

    const dispatch = useDispatch();

    const { activeOrder } = useSelector(selectOrders);

    const { tables } = useSelector(selectTables);

    const { enqueueSnackbar } = useSnackbar();

    // const filterTablesAvailable = (tables: ITable[]) => {

    //   const tablesAvailable = tables.filter(t => t.isAvailable);

    //   return tablesAvailable;
    // }

    const changeTable = (tableId: string) => {
      const table = tables.find((t) => t.id === tableId);

      console.log({ tableOrder });

      if (activeOrder) {
        console.log('emitiendo evento');

        const data: UpdateOrderDto = {
          id: activeOrder.id,
          tableId
        };

        const tables: { previousTableId: string; newTableId: string } = {
          previousTableId: tableOrder!.id,
          newTableId: table!.id
        };

        console.log('Actualizando mesas');

        socket?.emit(
          EventsEmitSocket.changeTable,
          tables,
          ({ ok, msg, order }: SocketResponseOrder) => {
            console.log('response', ok);
            if (!ok) {
              enqueueSnackbar(msg, { variant: 'error' });
            }
          }
        );

        socket?.emit(
          EventsEmitSocket.updateOrder,
          data,
          ({ ok, msg, order }: SocketResponseOrder) => {
            console.log('response', ok);
            if (ok) {
              dispatch(setActiveOrder(order!));
            } else {
              enqueueSnackbar(msg, { variant: 'error' });
            }
          }
        );
      } else {
        dispatchReducer({ type: OrderActionType.SET_TABLE, payload: table });
      }
    };

    // return (
    //   <>

    //         <Accordion sx={{ p: 0, m: 0 }}>
    //           <AccordionSummary
    //             expandIcon={<DriveFileRenameOutlineOutlined />}
    //             aria-controls="panel1a-content"
    //             id="panel1a-header"
    //             sx={{ p: 0, m: 0 }}
    //           >
    //             <Typography variant='body1'>Mesa <b>{table ? table.name : 'N.A.'}</b></Typography>
    //           </AccordionSummary>
    //           <AccordionDetails sx={{ p: 0, m: 0 }}>
    //             {
    //               tables.length === 0
    //                 ? <Typography variant='body1' color='gray' align='center'>No hay mesas disponibles</Typography>
    //                 : <FormControl fullWidth>
    //                     <InputLabel id="demo-simple-select-label">Mesa</InputLabel>
    //                     <Select
    //                       labelId="demo-simple-select-label"
    //                       id="demo-simple-select"
    //                       value={table?.id}
    //                       label="Mesa del pedido"

    //                       onChange={(e) => changeTable(e.target.value)}

    //                     >
    //                       {
    //                         tables.map(table => (

    //                           <MenuItem key={table.id} value={table.id}>Mesa {table.name}</MenuItem>

    //                         ))
    //                       }

    //                     </Select>
    //                   </FormControl>
    //             }

    //           </AccordionDetails>
    //         </Accordion>

    //   </>
    // )
    return (
      <>
        {tables.length === 0 ? (
          <Typography variant='body1' color='gray' align='center'>
            No hay mesas disponibles
          </Typography>
        ) : (
          <>
            <Grid container spacing={1}>
              {tables.map((table) => (
                <Grid item key={table.id} xs={4} md={3}>
                  <Card
                    sx={{
                      color:
                        table.id === tableOrder?.id
                          ? 'white'
                          : table.isAvailable
                            ? 'success.main'
                            : 'secondary.main',
                      bgcolor:
                        table.id === tableOrder?.id
                          ? table.isAvailable
                            ? 'success.main'
                            : 'secondary.main'
                          : 'transparent'
                    }}
                  >
                    <CardActionArea
                      sx={{
                        p: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 1
                      }}
                      onClick={() => changeTable(table.id)}
                    >
                      <TableRestaurant />
                      <Typography variant='h5'>Mesa {table.name}</Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </>
    );
  };

// <FormControl fullWidth
// >
//   <Typography variant='subtitle1'>Mesa </Typography>

//   <Select

//     id="demo-simple-select"
//     value={table?.id}

//     onChange={(e) => changeTable(e.target.value)}

//     size='small'

//     error={TypeOrder.IN_PLACE === typeOrder && !table}
//   >
//     <MenuItem value="">
//       Ninguno
//     </MenuItem>
//     {
//       tables.map(table => (

//         <MenuItem key={table.id} value={table.id}>Mesa {table.name}</MenuItem>

//       ))
//     }

//   </Select>
//   {
//     TypeOrder.IN_PLACE === typeOrder && !table &&
//     <Typography color='error' variant='subtitle1'>Seleccione una mesa</Typography>
//   }
// </FormControl>
