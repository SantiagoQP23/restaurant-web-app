import { create } from 'zustand';
import { Invoice } from '../models/Invoice.model';

interface DrawerInvoiceState {
  activeInvoice: Invoice | null;

  open: boolean;

  openModal: boolean;

  setOpen: (open: boolean) => void;

  setOpenModal: (openModal: boolean) => void;

  setActiveInvoice: (invoice: Invoice | null) => void;

  reset: () => void;

  handleOpenModal: () => void;

  handleCloseModal: () => void;

  handleOpenDrawer: () => void;

  handleCloseDrawer: () => void;
}

export const useDrawerInvoiceStore = create<DrawerInvoiceState>((set, get) => ({
  title: 'Drawer Invoice',

  activeInvoice: null,

  open: false,

  openModal: false,

  setOpen: (open: boolean) => set({ open }),

  setOpenModal: (openModal: boolean) => set({ openModal }),

  setActiveInvoice: (activeInvoice: Invoice | null) => set({ activeInvoice }),

  reset: () => set({ activeInvoice: null }),

  handleOpenDrawer: () => set({ open: true }),

  handleOpenModal: () => set({ openModal: true }),

  handleCloseModal: () => set({ openModal: false }),

  handleCloseDrawer: () => set({ open: false, activeInvoice: null })
}));
