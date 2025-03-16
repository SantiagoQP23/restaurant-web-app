import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

import { ISection } from '../../../models';

export interface SectionsState {
  sections: ISection[];
  activeSection: ISection | null;
}

const initialState: SectionsState = {
  sections: [],
  activeSection: null
};

export const sectionsSlice = createSlice({
  name: 'sections',
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
    loadSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<ISection>) => {
      state.activeSection = action.payload;
    },
    resetSections: () => ({ ...initialState }),
    resetActiveSection: (state) => {
      state.activeSection = null;
    }
  }
});

export const {
  /*  addSection,
  deleteSection, 
  loadSections, 
  setActiveSection,
  updateSection, 
  resetActiveSection,
  resetSections */
} = sectionsSlice.actions;

// export const selectSections = (state: RootState) => state.sections;

export default sectionsSlice.reducer;
