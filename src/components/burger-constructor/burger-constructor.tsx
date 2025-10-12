import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  clearConstructor,
  clearOrderModalData,
  getConstructorItems,
  getOrderModalData,
  getOrderRequest
} from '../../services/burger-construcrot/slice';
import { useDispatch } from '../../services/store';
import { fetchOrderBurger } from '../../services/burger-construcrot/thunks';
import { useNavigate } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/user/slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const { bun, ingredients } = useSelector(getConstructorItems);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  // Ожидание оформления заказа
  const orderRequest = useSelector(getOrderRequest);

  // Данные заказа для модального окна?
  const orderModalData = useSelector(getOrderModalData);

  // Нажатие на кнопку оформления заказа
  const onOrderClick = () => {
    // ждём завершения первичной проверки авторизации
    if (!isAuthChecked) return;

    // если не авторизован — уводим на /login и запоминаем, откуда пришли
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(fetchOrderBurger(ingredientIds));
  };

  // Закрытие модального окна с заказом
  const closeOrderModal = () => {
    if (orderModalData) {
      dispatch(clearOrderModalData());
      dispatch(clearConstructor());
    } else {
      // отменить заказ?
    }
  };

  // Общая стоимость заказа
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
