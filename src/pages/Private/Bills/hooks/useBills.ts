import { useSnackbar } from 'notistack';
import { Order } from '../../../../models';
import { EventsEmitSocket } from '../../Orders/interfaces/events-sockets.interface';
import { CreateBillDto, RemoveBillDto, UpdateBillDto } from '../dto';
import { useQuery } from '@tanstack/react-query';
import { getBill, getBills } from '../services/bills.service';
import { useEmitWebSocketsEvent } from '../../../../hooks/useEmitWebSocketsEvent';

export const useCreateBill = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useEmitWebSocketsEvent<Order, CreateBillDto>(
    EventsEmitSocket.createBill,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'success' });
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'error' });
      }
    }
  );
};

export const useBill = (term: number) => {
  return useQuery({
    queryKey: ['bill', term],
    queryFn: () => getBill(term),
    enabled: !!term
  });
};

export const useBills = () => {
  return useQuery({
    queryKey: ['bills'],
    queryFn: () => getBills()
  });
};

export const useDeleteBill = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useEmitWebSocketsEvent<Order, RemoveBillDto>(
    EventsEmitSocket.deleteBill,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'success' });
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'error' });
      }
    }
  );
};

export const useUpdateBill = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useEmitWebSocketsEvent<Order, UpdateBillDto>(
    EventsEmitSocket.updateBill,
    {
      onSuccess: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'success' });
      },
      onError: (resp) => {
        enqueueSnackbar(resp.msg, { variant: 'error' });
      }
    }
  );
};
