import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PaymentMethod } from '../../../../models/financial/payment-method.model';
import { CreatePaymentMethodDto } from '../dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../dto/update-payment-method.dto';
import {
  createPaymentMethod,
  getPaymentMethods,
  updatePaymentMethod
} from '../services/payment-methods.service';

const QUERY_KEY = ['restaurant-payment-methods'] as const;

export const usePaymentMethods = () => {
  return useQuery<PaymentMethod[]>({
    queryKey: QUERY_KEY,
    queryFn: getPaymentMethods
  });
};

export const useCreatePaymentMethod = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<PaymentMethod, unknown, CreatePaymentMethodDto>({
    mutationFn: (dto) => createPaymentMethod(dto),
    onSuccess: () => {
      enqueueSnackbar('Método de pago creado', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => {
      enqueueSnackbar('No se pudo crear el método de pago', {
        variant: 'error'
      });
    }
  });
};

interface UpdatePaymentMethodVars {
  id: number;
  dto: UpdatePaymentMethodDto;
}

export const useUpdatePaymentMethod = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation<PaymentMethod, unknown, UpdatePaymentMethodVars>({
    mutationFn: ({ id, dto }) => updatePaymentMethod(id, dto),
    onSuccess: () => {
      enqueueSnackbar('Método de pago actualizado', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => {
      enqueueSnackbar('No se pudo actualizar el método de pago', {
        variant: 'error'
      });
    }
  });
};
