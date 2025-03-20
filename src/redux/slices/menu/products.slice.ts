import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../models';
import { RootState } from '../../store';

export interface ProductsState {
  products: IProduct[];
  activeProduct: IProduct | null;
}

const initialState: ProductsState = {
  products: [],
  activeProduct: null
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = [...state.products, action.payload];
    },
    updateProduct: (state, { payload }: PayloadAction<IProduct>) => {
      state.products = state.products.map((p) =>
        p.id === payload.id ? payload : p
      );
      state.activeProduct = payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    loadProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setActiveProduct: (state, action: PayloadAction<IProduct>) => {
      state.activeProduct = action.payload;
    },
    resetProducts: () => ({ ...initialState }),
    resetActiveProduct: (state) => {
      state.activeProduct = null;
    }
  }
});

export const {
  /* 
  addProduct, 
  deleteProduct, 
  loadProducts,
  updateProduct,
  setActiveProduct,
  resetActiveProduct,
  resetProducts */
} = productsSlice.actions;

//export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
