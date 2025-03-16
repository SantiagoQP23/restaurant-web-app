import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderDetail } from '../../../models';
import { RootState } from '../../store';

export interface DetallesState {
  details: IOrderDetail[];
  detailActive: IOrderDetail | null;
}

const initialState: DetallesState = {
  details: [],
  detailActive: null
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    detalleSetActive: (state, action: PayloadAction<IOrderDetail>) => {
      state.detailActive = action.payload;
    },

    detalleAddNew: (state, action: PayloadAction<IOrderDetail>) => {
      state.details = [...state.details, action.payload];
    },
    detalleoUpdated: (state, action: PayloadAction<IOrderDetail>) => {
      state.details = state.details.map((d) =>
        d.id === action.payload.id ? action.payload : d
      );
    },
    detalleDeleted: (state, action: PayloadAction<string>) => {
      state.details = state.details.filter((d) => d.id !== action.payload);
    },
    detalleLoaded: (state, action: PayloadAction<IOrderDetail[]>) => {
      state.details = action.payload;
    },
    detalleUpdatedCantidad: (state, action: PayloadAction<number>) => {
      state.details = state.details.map((d) =>
        d.id === state.detailActive!.id
          ? ({
              ...d,
              quantity: action.payload,
              amount: d.product.price * action.payload
            } as IOrderDetail)
          : d
      );

      state.detailActive = {
        ...state.detailActive!,
        quantity: action.payload,
        amount: state.detailActive!.product.price * action.payload
      };
    }
  }
});

export const {
  detalleAddNew,
  detalleDeleted,
  detalleLoaded,
  detalleSetActive,
  detalleUpdatedCantidad,
  detalleoUpdated
} = detailsSlice.actions;

export const selectDetalles = (state: RootState) => state.details;

export default detailsSlice.reducer;
