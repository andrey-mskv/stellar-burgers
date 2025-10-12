import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';

import { getFeed } from '../../services/feeds/slice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/feeds/thunks';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  // Загрузка ленты заказов при монтировании компонента
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeed);

  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
