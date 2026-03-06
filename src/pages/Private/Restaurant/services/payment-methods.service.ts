import { restauranteApi } from '../../../../api';
import { PaymentMethod } from '../../../../models/financial/payment-method.model';
import { CreatePaymentMethodDto } from '../dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../dto/update-payment-method.dto';

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data } =
    await restauranteApi.get<PaymentMethod[]>('/payment-methods');
  return data;
};

export const createPaymentMethod = async (
  dto: CreatePaymentMethodDto
): Promise<PaymentMethod> => {
  const { data } = await restauranteApi.post<PaymentMethod>(
    '/payment-methods',
    dto
  );
  return data;
};

export const updatePaymentMethod = async (
  id: number,
  dto: UpdatePaymentMethodDto
): Promise<PaymentMethod> => {
  const { data } = await restauranteApi.patch<PaymentMethod>(
    `/payment-methods/${id}`,
    dto
  );
  return data;
};
