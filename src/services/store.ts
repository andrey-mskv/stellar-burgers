import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredients/slice';
import { feedSlice } from './feeds/slice';
import { userSlice } from './user/slice';
import { burgerConstructorSlice } from './burger-construcrot/slice';
import { orderSlice } from './orders/slice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  feedSlice,
  userSlice,
  burgerConstructorSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});
// console.log(store.getState());

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
