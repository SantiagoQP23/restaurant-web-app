import { useDispatch } from 'react-redux';
import { useOnWebSocketsEvent } from '../../../../hooks';
import { SocketEvent } from '../../../../models/socket-event.dto';
import { EventsOnSocket } from '../../Orders/interfaces/events-sockets.interface';
import { updateTable } from '../../../../redux';
import { ITable } from '../../../../models';

/**
 * Custom hook to listen to the event of updating a table with websockets
 * @version 1.0 28-12-2023
 */
export const useOnTableUpdated = () => {
  const dispatch = useDispatch();

  useOnWebSocketsEvent<ITable>(
    EventsOnSocket.updateTable,
    ({ data: table }: SocketEvent<ITable>) => {
      dispatch(updateTable(table));
    }
  );
};
