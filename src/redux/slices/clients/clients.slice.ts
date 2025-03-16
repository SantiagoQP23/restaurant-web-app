import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { IClient } from '../../../models';

export interface ClientsState {
  clients: IClient[];
  activeClient: null | IClient;
}

const initialState: ClientsState = {
  clients: [],
  activeClient: null
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<IClient>) => {
      state.clients = [...state.clients, action.payload];
    },
    updateClient: (state, { payload }: PayloadAction<IClient>) => {
      state.clients = state.clients.map((p) =>
        p.id === payload.id ? payload : p
      );
      state.activeClient = payload;
    },
    deleteClient: (state, action: PayloadAction<string>) => {
      state.clients = state.clients.filter((p) => p.id !== action.payload);
    },
    loadClients: (state, action: PayloadAction<IClient[]>) => {
      state.clients = action.payload;
    },
    setActiveClient: (state, action: PayloadAction<IClient>) => {
      state.activeClient = action.payload;
    },
    resetClients: () => ({ ...initialState }),
    resetActiveClient: (state) => {
      state.activeClient = null;
    }
  }
});

export const {
  addClient,
  updateClient,
  deleteClient,
  loadClients,
  setActiveClient,
  resetClients,
  resetActiveClient
} = clientsSlice.actions;

export const selectClients = (state: RootState) => state.clients;

export default clientsSlice.reducer;
