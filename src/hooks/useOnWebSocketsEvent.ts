import { useContext, useEffect } from 'react';
import { SocketContext } from '../context';
import { SocketEvent } from '../models/socket-event.dto';
import { EventsOnSocket } from '../pages/Private/Orders/interfaces/events-sockets.interface';

export const useOnWebSocketsEvent = <T>(
  event: EventsOnSocket,
  callback: (socketEvent: SocketEvent<T>) => void
) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on(event, (socketEvent: SocketEvent<T>) => {
      callback(socketEvent);
    });
    return () => {
      socket?.off(event);
    };
  }, [socket]);
};
