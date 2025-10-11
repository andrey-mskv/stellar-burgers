import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUser, getIsAuthChecked } from '../../services/user/slice';
import { Preloader } from '@ui';

type ProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: ProtectedProps): React.JSX.Element => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();

  // url == /profile, onlyUnAuth = false, user == null
  // url == /login, from == /profile, onlyUnAuth = true, user == null
  // url == /login, from == /profile, onlyUnAuth = true, user != null
  // url == /profile, onlyUnAuth = false, user != null
  // url == /profile, onlyUnAuth = false, user == null

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // для авторизованного, но неавторизован
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // для неавторизованного и авторизован
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // onlyUnAuth && !user для неавторизованного и неавторизован
  // !onlyUnAuth && user для авторизованного и авторизован

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected onlyUnAuth component={component} />;
