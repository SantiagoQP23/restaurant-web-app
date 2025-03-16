import { useSnackbar } from 'notistack';
import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../../../context';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';

export const useUpdateTable = () => {
  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const updateTable = (table: { tableId: string; isAvailable: boolean }) => {
    setLoading(true);

    socket?.emit(EventsEmitSocket.updateTable, table, (resp: any) => {
      if (resp.ok) {
        enqueueSnackbar('Mesa actualizada', { variant: 'success' });
      } else {
        enqueueSnackbar('No se pudo actualizar la mesa', { variant: 'error' });
      }

      setLoading(false);
    });
  };

  return {
    loading,
    updateTable
  };
};
