import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice, initialState } from './slice';
import { TIngredient } from '@utils-types';

const { reducer, actions } = burgerConstructorSlice;

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

describe('burgerConstructor', () => {
  it('add ingredient', () => {
    const payload = { ...mockIngredients[0], id: 'a' };
    const nextState = reducer(initialState, actions.addIngredient(payload));

    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual(payload);
    expect(nextState.ingredients).toContainEqual(
      expect.objectContaining({ id: 'a' })
    );
  });

  it('remove ingredient', () => {
    const newState = {
      ...initialState,
      ingredients: [
        { ...mockIngredients[0], id: 'a' },
        { ...mockIngredients[1], id: 'b' }
      ]
    };
    const nextState = reducer(newState, actions.removeIngredient('a'));

    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0]).toEqual({
      ...mockIngredients[1],
      id: 'b'
    });
  });

  describe('shold change the order of ingredients', () => {
    const newState = {
      ...initialState,
      ingredients: [
        { ...mockIngredients[0], id: 'a' },
        { ...mockIngredients[1], id: 'b' },
        { ...mockIngredients[2], id: 'c' }
      ]
    };
    it('should move ingredient up', () => {
      const nextState = reducer(
        newState,
        actions.moveIngredient({ fromIndex: 2, toIndex: 1 })
      );

      const ids = nextState.ingredients.map((i) => i.id);

      expect(ids).toEqual(['a', 'c', 'b']);
    });

    it('shold move ingredient down', () => {
      const nextState = reducer(
        newState,
        actions.moveIngredient({ fromIndex: 0, toIndex: 1 })
      );

      const ids = nextState.ingredients.map((i) => i.id);

      expect(ids).toEqual(['b', 'a', 'c']);
    });
  });
});
