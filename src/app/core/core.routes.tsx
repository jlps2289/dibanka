import { lazy, Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';

// Component Routes
import { PublicRoute } from 'app/shared/components/router/public.route';
import { PrivateRoute } from 'app/shared/components/router/private.route';

// Antd
import Spin from 'antd/es/spin';

// Pages
const LoginPage = lazy(() => import('./pages/login.page'));
const ModuleLayout = lazy(() => import('../modules/module.layout'));

export const CoreRoutes = () => {
  return (
    <Suspense fallback={<Spin className='fadeIn app-loading' tip='Cargando Componentes...' />}>
      <Switch>
        <PublicRoute path='/login' exact component={LoginPage} />
        <PrivateRoute path='/' component={ModuleLayout} />
        <Redirect to='/login' />
      </Switch>
    </Suspense>
  );
};
