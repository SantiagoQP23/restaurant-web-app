import { create } from 'zustand';
import { Supplier } from '../models/supplier.model';

interface DrawerSupplierState {
  activeSupplier: Supplier | null;

  open: boolean;

  setOpen: (open: boolean) => void;

  setActiveSupplier: (invoice: Supplier | null) => void;

  reset: () => void;

  handleOpenDrawer: () => void;

  handleCloseDrawer: () => void;
}

export const useDrawerSupplierStore = create<DrawerSupplierState>(
  (set, get) => ({
    title: 'Drawer Supplier',

    activeSupplier: null,

    open: false,

    setOpen: (open: boolean) => set({ open }),

    setActiveSupplier: (activeSupplier: Supplier | null) =>
      set({ activeSupplier }),

    reset: () => set({ activeSupplier: null }),

    handleOpenDrawer: () => set({ open: true }),

    handleCloseDrawer: () => set({ open: false, activeSupplier: null })
  })
);
