import { IClient, Order, IOrderDetail } from '../../../../models';
import { CreateInvoiceDto } from '../dto';
import { PaymentMethod } from '../models/Invoice.model';

import { create } from 'zustand';

interface InvoiceState {
  client: IClient | null;
  order: Order | null;
  paymentMethod: PaymentMethod;
  discount: number;
  amountPaid: number;
  details: CreateInvoiceDetail[];
  step: number;
  amount: number;
  total: number;

  setPaymentMethod: (paymentMethod: PaymentMethod) => void;

  setDiscount: (discount: number) => void;

  setAmountPaid: (amountPaid: number) => void;

  setClient: (client: IClient | null) => void;

  setOrder: (order: Order) => void;

  reset: () => void;

  addDetail: (detail: CreateInvoiceDetail) => void;

  updateDetail: (detail: CreateInvoiceDetail) => void;

  removeDetail: (orderDetailId: string) => void;

  getInvoice: () => CreateInvoiceDto;

  resetDetails: () => void;

  setStep: (step: number) => void;

  handleNextStep: () => void;

  handleBackStep: () => void;
}

export interface CreateInvoiceDetail {
  orderDetail: IOrderDetail;
  quantity: number;
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  title: 'Invoices',
  client: null,
  order: null,
  paymentMethod: PaymentMethod.CASH,
  discount: 0,
  amountPaid: 0,
  details: [],
  step: 0,
  amount: 0,
  total: 0,

  setPaymentMethod: (paymentMethod: PaymentMethod) => set({ paymentMethod }),
  setDiscount: (discount: number) =>
    set({
      discount
    }),
  setAmountPaid: (amountPaid: number) => set({ amountPaid }),
  setClient: (client: IClient | null) => set({ client }),
  setOrder: (order: Order) => set({ order }),
  reset: () =>
    set({
      client: null,
      order: null,
      paymentMethod: PaymentMethod.CASH,
      discount: 0,
      amountPaid: 0,
      details: [],
      step: 0
    }),

  addDetail: (detail: CreateInvoiceDetail) => {
    const { details } = get();

    const index = details.findIndex(
      (d) => d.orderDetail.id === detail.orderDetail.id
    );

    if (index === -1) {
      set({ details: [...details, detail] });
    } else {
      const newDetails = [...details];
      newDetails[index] = detail;
      set({ details: newDetails });
    }

    set({
      amount: get().amount + detail.orderDetail.price * detail.quantity,
      total: get().amount - get().discount
    });
  },

  updateDetail: (detail: CreateInvoiceDetail) => {
    const { details } = get();
    const newDetails = [...details];
    const index = details.findIndex(
      (d) => d.orderDetail.id === detail.orderDetail.id
    );
    newDetails[index] = detail;
    // console.log(newDetails)

    set({
      details: newDetails
    });

    set({
      amount: get().details.reduce(
        (acc, d) => acc + d.orderDetail.price * d.quantity,
        0
      ),
      total: get().amount - get().discount
    });
  },

  removeDetail: (orderDetailId: string) => {
    const { details } = get();

    const detail = details.find((d) => d.orderDetail.id === orderDetailId)!;

    set({
      details: details.filter((d) => d.orderDetail.id !== orderDetailId),
      amount: get().amount - detail.orderDetail.price * detail.quantity,
      total: get().amount - get().discount
    });
  },

  resetDetails: () => set({ details: [], amount: 0, total: 0, discount: 0 }),

  setStep: (step: number) => set({ step }),

  handleNextStep: () => set({ step: get().step + 1 }),

  handleBackStep: () => set({ step: get().step - 1 }),

  getInvoice: (): CreateInvoiceDto => {
    const { client, order, paymentMethod, discount, amountPaid } = get();
    return {
      clientId: client!.id,
      orderId: order!.id,
      paymentMethod,
      discount,
      amountPaid,
      details: get()
        .details.filter((detail) => detail.quantity > 0)
        .map((detail) => ({
          orderDetailId: detail.orderDetail.id,
          quantity: detail.quantity
        })),
      cashRegisterId: ''
    };
  }
}));
