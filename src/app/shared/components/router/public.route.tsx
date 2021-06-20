import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

// Tools & Interface
import { keys, getStorage } from 'app/shared/tools/storage.tool';
import { IUser } from 'app/services/auth.service';

export const PublicRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...routeProps } = props;
  const user = getStorage<IUser>(keys.token);

  return !user?.accessToken ? <Route {...routeProps} component={Component} /> : <Redirect to='/' />;
};
