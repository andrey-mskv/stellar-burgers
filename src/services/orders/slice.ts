import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrders } from './thunks';
import { TOrder, TOrdersData } from '@utils-types';

type OrderState = {
  ordersData: TOrdersData;
  isLoading: boolean;
  error: string | null;
};

export const initialState: OrderState = {
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: true,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.ordersData.orders = action.payload;
    }
  },
  selectors: {
    getOrdersData: (state) => state.ordersData,
    getOrders: (state) => state.ordersData.orders,
    orderLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getOrderByNumber: (state) => (number: number) =>
      state.ordersData.orders.find((order) => order.number === number) || null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersData.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось получить заказы';
      });
  }
});

export const { getOrders, orderLoading, getError, getOrderByNumber } =
  orderSlice.selectors;
