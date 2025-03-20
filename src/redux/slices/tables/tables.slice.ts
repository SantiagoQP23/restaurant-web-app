import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { ITable } from '../../../models';

export interface tablesState {
  tables: ITable[];
  activeTable: ITable | null;
}

const initialState: tablesState = {
  tables: [],
  activeTable: null
};

export const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<ITable>) => {
      state.tables = [...state.tables, action.payload];
    },
    updateTable: (state, { payload }: PayloadAction<ITable>) => {
      state.tables = state.tables.map((p) =>
        p.id === payload.id ? payload : p
      );
      state.activeTable = payload;
    },
    deleteTable: (state, { payload }: PayloadAction<string>) => {
      state.tables = state.tables.filter((p) => p.id !== payload);
    },
    loadTables: (state, { payload }: PayloadAction<ITable[]>) => {
      state.tables = payload;
    },
    setActiveTable: (state, action: PayloadAction<ITable | null>) => {
      state.activeTable = action.payload;
    },
    resetTables: () => ({ ...initialState }),
    resetactiveTable: (state) => {
      state.activeTable = null;
    }
  }
});

export const {
  addTable,
  updateTable,
  deleteTable,
  loadTables,
  setActiveTable,
  resetTables,
  resetactiveTable
} = tablesSlice.actions;

export const selectTables = (state: RootState) => state.tables;

export default tablesSlice.reducer;
