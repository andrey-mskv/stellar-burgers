import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { fetchFeeds } from './thunks';
import { get } from 'http';

type TOrdersState = {
  data: TOrdersData;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TOrdersState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: true,
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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось загрузить заказы';
      });
  }
});

export const { getFeed, getFeedData, getFeedByNumber } = feedSlice.selectors;

export default feedSlice.reducer;
