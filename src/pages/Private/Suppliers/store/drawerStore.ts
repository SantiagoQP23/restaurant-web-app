import { create } from 'zustand';
import { Supplier } from '../models/supplier.model';

interface DrawerState<T> {
  activeSupplier: T | null;

  open: boolean;

  setOpen: (open: boolean) => void;

  setActiveSupplier: (invoice: T | null) => void;

  reset: () => void;

  handleOpenDrawer: () => void;

  handleCloseDrawer: () => void;
}

const useStoreDrawerBase = create<DrawerState<any>>((set, get) => ({
  title: 'Drawer Supplier',

  activeSupplier: null,

  open: false,

  setOpen: (open: boolean) => set({ open }),

  setActiveSupplier: (activeSupplier: Supplier | null) =>
    set({ activeSupplier }),

  reset: () => set({ activeSupplier: null }),

  handleOpenDrawer: () => set({ open: true }),

  handleCloseDrawer: () => set({ open: false, activeSupplier: null })
}));

export const useDrawerStore = <T, Slice>(
  selector: (state: DrawerState<T>) => Slice
) => useStoreDrawerBase(selector);

const {} = (state: DrawerState<Supplier>) => state;
