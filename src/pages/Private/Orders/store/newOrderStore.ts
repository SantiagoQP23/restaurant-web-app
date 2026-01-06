import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ICreateOrderDetail, ITable, TypeOrder } from '../../../../models';

interface NewOrderState {
  table: ITable | null;
  amount: number;
  details: ICreateOrderDetail[];
  people: number;
  orderType: TypeOrder;
  totalProducts: number;
  notes: string;
  deliveryTime: Date | null;
}

interface NewOrderActions {
  setTable: (table: ITable | null) => void;
  setAmount: (amount: number) => void;
  setDetails: (details: ICreateOrderDetail[]) => void;
  setPeople: (people: number) => void;
  setOrderType: (orderType: TypeOrder) => void;
  setTotalProducts: (totalProducts: number) => void;
  setNotes: (notes: string) => void;
  setDeliveryTime: (deliveryTime: Date | null) => void;
  addDetail: (detail: ICreateOrderDetail) => void;
  removeDetail: (detail: ICreateOrderDetail) => void;
  updateDetail: (detail: ICreateOrderDetail) => void;

  reset: () => void;
}

const initialState: NewOrderState = {
  details: [],
  amount: 0,
  table: null,
  people: 1,
  orderType: TypeOrder.IN_PLACE,
  totalProducts: 0,
  notes: '',
  deliveryTime: new Date()
};

export const useNewOrderStore = create<NewOrderState & NewOrderActions>()(
  persist(
    (set, get) => ({
      title: 'New Order',
      ...initialState,

      setTable: (table: ITable | null) => set({ table }),
      setAmount: (amount: number) => set({ amount }),
      setDetails: (details: ICreateOrderDetail[]) => set({ details }),

      addDetail: (detail: ICreateOrderDetail) => {
        const details = get().details;

        set({ details: [...details, detail] });
      },

      removeDetail: (detail: ICreateOrderDetail) => {
        const details = get().details;
        const index = details.findIndex(
          (d) => d.product.id === detail.product.id
        );
        if (index !== -1) {
          details.splice(index, 1);
          set({ details });
        }
      },

      updateDetail: (detail: ICreateOrderDetail) => {
        const details = get().details;

        const index = details.findIndex(
          (d) =>
            d.product.id === detail.product.id &&
            d.productOption?.id === detail.productOption?.id
        );

        if (index !== -1) {
          const updatedDetail = {
            ...details[index],
            quantity: detail.quantity,
            description: detail.description,
            productOption: detail.productOption
          };

          details[index] = updatedDetail;
          set({ details });
        }
      },

      setPeople: (people: number) => set({ people }),
      setOrderType: (orderType: TypeOrder) => set({ orderType }),
      setTotalProducts: (totalProducts: number) => set({ totalProducts }),
      setNotes: (notes: string) => set({ notes }),
      setDeliveryTime: (deliveryTime: Date | null) => set({ deliveryTime }),

      reset: () => set(initialState)
    }),
    {
      name: 'newOrderStore'
    }
  )
);
