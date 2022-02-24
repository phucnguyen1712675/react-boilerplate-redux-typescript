import LoginPage from 'app/pages/LoginPage/Loadable';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import { Route, Switch } from 'react-router-dom';
import { PublicRoute, ROUTE_PATHS } from 'routes';

const AuthLayout = () => {
  return (
    <Switch>
      <PublicRoute exact path={ROUTE_PATHS.LOGIN}>
        <LoginPage />
      </PublicRoute>
      <Route path={`${ROUTE_PATHS.LOGIN}/*`}>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default AuthLayout;
