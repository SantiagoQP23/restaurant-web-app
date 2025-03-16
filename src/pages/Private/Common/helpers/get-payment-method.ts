import { PaymentMethod } from '../../../../models';

export const getPaymentMethod = (paymentMethod: PaymentMethod): string => {
  switch (paymentMethod) {
    case PaymentMethod.CASH:
      return 'Efectivo';
    // case PaymentMethod.CARD:
    //   return 'Tarjeta';
    case PaymentMethod.TRANSFER:
      return 'Transferencia';
    default:
      return '';
  }
};
