import { ingredientsSlice } from './ingredients/slice';
import { feedSlice } from './feeds/slice';
import { userSlice } from './user/slice';
import { burgerConstructorSlice } from './burger-construcrot/slice';
import { orderSlice } from './orders/slice';
import { rootReducer } from './store';

it('initial rootReducer', () => {
  expect(rootReducer(undefined, { type: '' })).toEqual({
    ingredients: ingredientsSlice.getInitialState(),
    feed: feedSlice.getInitialState(),
    user: userSlice.getInitialState(),
    burgerConstructor: burgerConstructorSlice.getInitialState(),
    order: orderSlice.getInitialState()
  });
});
