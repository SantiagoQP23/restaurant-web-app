import { create } from 'zustand';
import { CashRegister } from '../../Balance/models/cash-register.model';

interface CashRegisterState {
  activeCashRegister: CashRegister | null;
  cashRegisters: CashRegister[];
  isOpenCreate: boolean;
  setActiveCashRegister: (activeCashRegister: CashRegister | null) => void;
  setOpenCreate: (open: boolean) => void;
  openCreate: () => void;
  closeCreate: () => void;
  addCashRegister: (cashRegister: CashRegister) => void;
  removeCashRegister: (cashRegisterId: number) => void;
  updateCashRegister: (cashRegister: CashRegister) => void;
  loadCashRegisters: (cashRegisters: CashRegister[]) => void;
}

export const useCashRegisterStore = create<CashRegisterState>((set) => ({
  title: 'Cash Register',
  cashRegisters: [],
  activeCashRegister: null,

  setActiveCashRegister: (activeCashRegister: CashRegister | null) =>
    set({ activeCashRegister }),

  isOpenCreate: false,

  addCashRegister: (cashRegister: CashRegister) =>
    set((state) => ({
      cashRegisters: [...state.cashRegisters, cashRegister]
    })),
  removeCashRegister: (cashRegisterId: number) =>
    set((state) => ({
      cashRegisters: state.cashRegisters.filter((c) => c.id !== cashRegisterId)
    })),

  updateCashRegister: (cashRegister: CashRegister) =>
    set((state) => ({
      cashRegisters: state.cashRegisters.map((c) =>
        c.id === cashRegister.id ? cashRegister : c
      )
    })),
  loadCashRegisters: (cashRegisters: CashRegister[]) => set({ cashRegisters }),

  setOpenCreate: (open: boolean) => set({ isOpenCreate: open }),

  closeCreate: () => set({ isOpenCreate: false }),

  openCreate: () => set({ isOpenCreate: true })
}));
