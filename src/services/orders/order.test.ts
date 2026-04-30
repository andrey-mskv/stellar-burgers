import { TOrdersData } from '@utils-types';
import { orderSlice, initialState } from './slice';
import { fetchOrders } from './thunks';

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

describe('orderSlice', () => {
  it('should return the initial state', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should set isLoading to true when Request starts', () => {
    expect(
      orderSlice.reducer(undefined, {
        type: fetchOrders.pending.type
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set items and set isLoading to false when fetchFeeds Succeeds', () => {
    const nextState = orderSlice.reducer(undefined, {
      type: fetchOrders.fulfilled.type,
      payload: mockOrders.orders
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      ordersData: {
        ...initialState.ordersData,
        orders: mockOrders.orders
      }
    });
  });

  it('should set error and set isLoading to false when fetchFeeds Fails', () => {
      const nextState = orderSlice.reducer(undefined, {
        type: fetchOrders.rejected.type,
        error: { message: 'Ошибка сервера' }
      });
  
      expect(nextState).toEqual({
        ...initialState,
        isLoading: false,
        error: 'Ошибка сервера'
      });
    });
});
