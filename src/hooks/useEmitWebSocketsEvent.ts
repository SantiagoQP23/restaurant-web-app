import { useContext, useState } from 'react';
import { SocketContext } from '../context';
import {
  SocketResponse,
  SocketResponseData
} from '../models/socket-response.dto';

interface WebSocketOptions<TData> {
  onSuccess?: (resp: TData) => void;
  onError?: (resp: SocketResponse) => void;
}

/**
 * Hook to use websockets
 * @version v1.0 24-12-2023
 */
export function useEmitWebSocketsEvent<TData, TVariables>(
  eventMessage: string,
  options?: WebSocketOptions<SocketResponseData<TData>>
) {
  const { socket, online } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);

  const mutate = async (
    data: TVariables,
    secondaryOptions?: WebSocketOptions<SocketResponseData<TData>>
  ) => {
    setLoading(true);

    socket?.emit(eventMessage, data, (resp: SocketResponseData<TData>) => {
      setLoading(false);

      if (resp.ok) {
        options?.onSuccess?.(resp);
        secondaryOptions?.onSuccess?.(resp);
      } else {
        options?.onError?.(resp);
        secondaryOptions?.onError?.(resp);
      }
    });
  };

  return {
    mutate,
    isLoading: loading,
    isOnline: online
  };
}
