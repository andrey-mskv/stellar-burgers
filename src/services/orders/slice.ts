import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrders } from './thunks';
import { TOrder, TOrdersData } from '@utils-types';

type OrederState = {
  ordersData: TOrdersData;
  loading: boolean;
  error: string | null;
};

const initialState: OrederState = {
  ordersData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: true,
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
    orderLoading: (state) => state.loading,
    getError: (state) => state.error,
    getOrderByNumber: (state) => (number: number) =>
      state.ordersData.orders.find((order) => order.number === number) || null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersData.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось получить заказы';
      });
  }
});

export const { getOrders, orderLoading, getError, getOrderByNumber } =
  orderSlice.selectors;
