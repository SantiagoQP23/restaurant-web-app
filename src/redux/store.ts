import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { authSlice } from './slices/auth';
import { clientsSlice } from './slices/clients';
import { menuSlice } from './slices/menu';
import { detailsSlice, ordersSlice } from './slices/orders';
import { tablesSlice } from './slices/tables';
import { userSlice } from './slices/users';

export interface IAppStore {}

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    orders: ordersSlice.reducer,
    details: detailsSlice.reducer,
    clients: clientsSlice.reducer,
    tables: tablesSlice.reducer,
    menu: menuSlice.reducer,
    users: userSlice.reducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
