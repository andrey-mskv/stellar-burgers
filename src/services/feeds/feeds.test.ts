import { TOrdersData } from '@utils-types';
import { feedSlice, initialState } from './slice';
import { fetchFeeds } from './thunks';
import { OrderCard } from '@components';

const mockOrders: TOrdersData = {
  orders: [
    {
      _id: 'o1',
      number: 101,
      name: 'Order 101',
      status: 'done',
      ingredients: [],
      createdAt: '2025-10-31T00:00:00.000Z',
      updatedAt: '2025-10-31T00:00:00.000Z'
    }
  ],
  total: 100,
  totalToday: 3
};

describe('feedSlice', () => {
  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should set isLoading to true when Request starts', () => {
    expect(
      feedSlice.reducer(undefined, {
        type: fetchFeeds.pending.type
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set items and set isLoading to false when fetchFeeds Succeeds', () => {
    const nextState = feedSlice.reducer(undefined, {
      type: fetchFeeds.fulfilled.type,
      payload: mockOrders
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      data: mockOrders
    });
  });

  it('should set error and set isLoading to false when fetchFeeds Fails', () => {
    const nextState = feedSlice.reducer(undefined, {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка сервера' }
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка сервера'
    });
  });
});
