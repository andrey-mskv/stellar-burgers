import { TIngredient } from '@utils-types';
import { ingredientsSlice, initialState } from './slice';
import { fetchIngredients } from './thunks';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

describe('ingredientsSlice', () => {
  it('should return the initial state', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should set isLoading to true when Request starts', () => {
    expect(
      ingredientsSlice.reducer(undefined, {
        type: fetchIngredients.pending.type
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should set items and set isLoading to false when fetchIngredients Succeeds', () => {

    const nextState = ingredientsSlice.reducer(undefined, {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      items: mockIngredients
    });
  });

  it('should set error and set isLoading to false when fetchIngredients Fails', () => {
    const nextState = ingredientsSlice.reducer(undefined, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка сервера' }
    });

    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка сервера'
    });
  });
  
});
