import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrders } from '../../services/orders/slice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/orders/thunks';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrders) || [];

  return <ProfileOrdersUI orders={orders} />;
};
