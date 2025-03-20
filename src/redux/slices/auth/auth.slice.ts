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

/*
usuario:  idUsuario: 1,
 nombreUsuario: "Nombre del usuario",
 nombres: "No se ha iniciado sesión",
 
 cargo: {
   idCargo: 1,
   nombre: 'Admin',
   descripcion: 'alsdjl',
 }} */

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

    /*  authUsuariosLoad: (state, action: PayloadAction<IUsuario[]>) => {
       state.usuarios = action.payload;
     },
     authUsuarioAdd: (state, action: PayloadAction<IUsuario>) => {
       state.usuarios.push(action.payload);
     },
     authUsuarioDelete: (state, action: PayloadAction<number>) => {
       state.usuarios = state.usuarios.filter(u => u.idUsuario === action.payload);
     },
     authUsuarioUpdate: (state, action: PayloadAction<IUsuario>) => {
       state.usuarios = state.usuarios.map(
         u => (u.idUsuario === action.payload.idUsuario)
         ? action.payload
         : u
         );
     }, */
  }
});

export const {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  loadRestaurant
  /*  authUsuarioAdd,
   authUsuarioUpdate,
   authUsuarioDelete,
   authUsuariosLoad */
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
