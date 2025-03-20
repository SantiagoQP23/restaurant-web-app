import { io, Manager, Socket } from 'socket.io-client';
import { useEffect, useState, useCallback } from 'react';

export const useSocket = (serverPath: string) => {
  const [online, setOnline] = useState<boolean | undefined>(false);

  const [socket, setSocket] = useState<Socket | null>(null);

  const conectarSocket = useCallback(() => {
    const token = localStorage.getItem('token') || '';

    const manager = new Manager(serverPath, {
      extraHeaders: {
        authentication: token
      }
    });

    const socketTemp = manager.socket('/');

    setSocket(socketTemp);

    /* 

     const socketTemp = io(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': token 
      }
    
    });

    setSocket(socketTemp); */
  }, [serverPath]);

  const desconectarSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
    conectarSocket,
    desconectarSocket
  };
};
