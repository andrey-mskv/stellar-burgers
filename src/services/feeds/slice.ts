import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { fetchFeeds } from './thunks';
import { get } from 'http';

type TOrdersState = {
  data: TOrdersData;
  loading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: true,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state.data.orders,
    getFeedData: (state) => state.data,
    getFeedByNumber: (state) => (number: number) =>
      state.data.orders.find((order) => order.number === number) || null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Не удалось загрузить заказы';
      });
  }
});

export const { getFeed, getFeedData, getFeedByNumber } = feedSlice.selectors;

export default feedSlice.reducer;
