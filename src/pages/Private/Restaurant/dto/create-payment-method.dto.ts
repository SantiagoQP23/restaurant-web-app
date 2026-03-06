import { PaymentMethodCategory } from '../../../../models/financial/payment-method.model';

export interface CreatePaymentMethodDto {
  name: string;
  type: PaymentMethodCategory;
  commissionPercentage?: number;
  defaultDestinationAccountId?: number;
  allowedDestinationAccountIds?: number[];
}
