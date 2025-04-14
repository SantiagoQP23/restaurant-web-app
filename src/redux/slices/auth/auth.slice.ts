import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../../models';
import { AppThunk, RootState } from '../../store';
import { Restaurant } from '../../../pages/Private/Reports/models/restaurant.model';

export interface AuthState {
  user: IUser | null;
  error?: string;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  restaurant: Restaurant | null;
}

const initialState: AuthState = {
  status: 'checking',
  user: null,
  error: '',
  restaurant: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      state.status = 'authenticated';
    },
    onLogout: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.user = null;
      state.status = 'not-authenticated';
    },
    onChecking: (state) => {
      state.status = 'checking';
      state.user = null;
      state.error = '';
    },
    clearErrorMessage: (state) => {
      state.error = '';
    },
    loadRestaurant: (state, { payload }: PayloadAction<Restaurant>) => {
      state.restaurant = payload;
    }
  }
});

export const {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  loadRestaurant
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
