import { TIngredient, TOrdersData } from '@utils-types';
import {
  http, // модуль для мокирования сетевых запросов
  HttpResponse // класс ответа на запрос
} from 'msw';

export const mockIngredients: TIngredient[] = [
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
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  }
];

const mockOrders: TOrdersData = {
  orders: [
    {
      _id: 'o1',
      number: 101,
      name: 'Order 101',
      status: 'done',
      ingredients: [mockIngredients[0]._id, mockIngredients[1]._id],
      createdAt: '2025-10-31T00:00:00.000Z',
      updatedAt: '2025-10-31T00:00:00.000Z'
    }
  ],
  total: 100,
  totalToday: 3
};

export const handlers = [
  http.get('/api/orders/all', () => {
    return HttpResponse.json(mockOrders);
  })
];
