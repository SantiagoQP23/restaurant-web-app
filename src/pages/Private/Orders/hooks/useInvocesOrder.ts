import { useState, useContext } from 'react';
import { SocketContext } from '../../../../context/SocketContext';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { CreateInvoiceDto } from '../dto/invoices/create-invoice-dto';
import { setActiveOrder } from '../../../../redux/slices/orders';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { UpdateInvoiceDto } from '../dto';
import { useInvoiceStore } from '../store/invoiceStore';

export const useCreateInvoiceOrder = () => {
  const [loading, setLoading] = useState(false);

  const { reset } = useInvoiceStore((state) => state);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const createInvoiceOrder = (idOrder: CreateInvoiceDto) => {
    setLoading(true);
    socket?.emit(
      EventsEmitSocket.createInvoice,
      idOrder,
      (resp: SocketResponseOrder) => {
        if (resp.ok) {
          // dispatch(setActiveOrder(resp.order!))

          enqueueSnackbar('Factura creada correctamente', {
            variant: 'success'
          });

          reset();
        } else {
          enqueueSnackbar(resp.msg, { variant: 'error' });
        }
        setLoading(false);
      }
    );
  };

  return {
    loading,
    createInvoiceOrder
  };
};
export const useUpdateInvoiceOrder = () => {
  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const updateInvoiceOrder = (idOrder: UpdateInvoiceDto) => {
    setLoading(true);
    socket?.emit(
      EventsEmitSocket.updateInvoice,
      idOrder,
      (resp: SocketResponseOrder) => {
        if (resp.ok) {
          // dispatch(setActiveOrder(resp.order!))

          enqueueSnackbar('Factura actualizada correctamente', {
            variant: 'success'
          });
        } else {
          enqueueSnackbar(resp.msg, { variant: 'error' });
        }
        setLoading(false);
      }
    );
  };

  return {
    loading,
    updateInvoiceOrder
  };
};

export const useDeleteInvoice = () => {
  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const deleteInvoiceOrder = (deleteInvoice: UpdateInvoiceDto) => {
    setLoading(true);
    socket?.emit(
      EventsEmitSocket.deleteInvoice,
      deleteInvoice,
      (resp: SocketResponseOrder) => {
        if (resp.ok) {
          // dispatch(setActiveOrder(resp.order!))

          enqueueSnackbar('Factura eliminada correctamente', {
            variant: 'success'
          });
        } else {
          enqueueSnackbar(resp.msg, { variant: 'error' });
        }
        setLoading(false);
      }
    );
  };

  return {
    loading,
    deleteInvoiceOrder
  };
};
