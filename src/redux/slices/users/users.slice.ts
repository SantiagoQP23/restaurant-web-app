import { IUser } from '../../../models/auth.model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface UserState {
  users: IUser[];
  activeUser: null | IUser;
}

const initialState: UserState = {
  users: [],
  activeUser: null
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users = [...state.users, action.payload];
    },
    updateUser: (state, { payload }: PayloadAction<IUser>) => {
      state.users = state.users.map((user) =>
        user.id === payload.id ? payload : user
      );
      state.activeUser = payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    loadUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setActiveUser: (state, action: PayloadAction<IUser>) => {
      state.activeUser = action.payload;
    },
    resetUsers: () => ({ ...initialState }),
    resetActiveUser: (state) => {
      state.activeUser = null;
    }
  }
});

export const {
  addUser,
  updateUser,
  deleteUser,
  loadUsers,
  setActiveUser,
  resetUsers,
  resetActiveUser
} = userSlice.actions;

export const selectUsers = (state: RootState) => state.users;
