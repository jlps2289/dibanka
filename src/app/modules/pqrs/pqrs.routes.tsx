import { lazy } from 'react';

// Interfaces
import { IRouteProps } from 'app/shared/components/router/access.route';

/** Path principal del modulo. */
export const pqrsPath = '/pqrs';

// LazyLoad Pages
const TramitesPage = lazy(() => import('./pages/tramites/tramites.page'));

export const PqrsRoutes: IRouteProps[] = [
  {
    path: `${pqrsPath}/tramites`,
    component: TramitesPage
  }
];
