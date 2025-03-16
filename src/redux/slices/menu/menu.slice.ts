import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { ICategory, IProduct, ISection, Menu } from '../../../models';

export interface MenuState {
  sections: ISection[];
  categories: ICategory[];
  products: IProduct[];
  activeSection: ISection | null;
  activeCategory: ICategory | null;
  activeProduct: IProduct | null;
}

const initialState: MenuState = {
  sections: [],
  categories: [],
  products: [],
  activeSection: null,
  activeCategory: null,
  activeProduct: null
};

/**
 * @description Redux slice for menu
 *
 * @author Santiago Quirumbay
 * @version 1.1 28/11/2023 Added crud products and categories to the state
 */
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<ISection>) => {
      state.sections = [...state.sections, action.payload];
    },
    updateSection: (state, { payload }: PayloadAction<ISection>) => {
      state.sections = state.sections.map((p) =>
        p.id === payload.id ? payload : p
      );
      state.activeSection = payload;
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter((p) => p.id !== action.payload);
    },

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
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, action.payload];
    },
    updateCategory: (state, { payload }: PayloadAction<ICategory>) => {
      state.categories = state.categories.map((c) =>
        c.id === payload.id ? payload : c
      );
      state.activeCategory = payload;
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (c) => c.id !== action.payload
      );
    },

    loadMenu: (state, action: PayloadAction<Menu>) => {
      const { sections, categories, products } = action.payload;
      state.sections = sections;
      state.categories = categories;
      state.products = products;
    },
    loadSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections = action.payload;
    },
    loadCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    loadProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setActiveCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    setActiveProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<ISection | null>) => {
      state.activeSection = action.payload;
    },
    resetSections: () => ({ ...initialState }),
    resetActiveSection: (state) => {
      state.activeSection = null;
    },
    setActiveCategory: (state, action: PayloadAction<ICategory | null>) => {
      state.activeCategory = action.payload;
    },
    resetCategories: () => ({ ...initialState }),
    resetActiveCategory: (state) => {
      state.activeCategory = null;
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
  addCategory,
  addProduct,
  addSection,
  deleteCategory,
  deleteProduct,
  deleteSection,
  loadMenu,
  loadCategories,
  loadProducts,
  loadSections,
  resetActiveCategory,
  resetActiveProduct,
  resetActiveSection,
  resetCategories,
  resetProducts,
  resetSections,
  setActiveCategories,
  setActiveCategory,
  setActiveProduct,
  setActiveProducts,
  setActiveSection,
  updateCategory,
  updateProduct,
  updateSection
} = menuSlice.actions;

export const selectMenu = (state: RootState) => state.menu;

export default menuSlice.reducer;
