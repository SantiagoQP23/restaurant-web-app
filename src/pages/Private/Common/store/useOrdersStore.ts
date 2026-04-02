import { Order } from '@/models';
import { create } from 'zustand';

interface OrdersState {
  activeOrder: Order | null;
}

interface OrdersActions {
  setActiveOrder: (order: Order | null) => void;
}

const initialState: OrdersState = {
  activeOrder: null
};

export const useOrdersStore = create<OrdersState & OrdersActions>((set) => ({
  ...initialState,
  setActiveOrder: (order: Order | null) => set({ activeOrder: order })
}));
