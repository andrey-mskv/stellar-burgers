import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrderBurger = createAsyncThunk(
  'order/placeOrder',
  async (items: string[]) => await orderBurgerApi(items)
);
