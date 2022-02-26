import { ACCESS_TOKEN_KEY } from 'app_constants';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import type { LocationState } from 'types';

const PrivateRoute = (props: RouteProps) => {
  const isLoggedIn = !!localStorage.getItem(ACCESS_TOKEN_KEY);
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const pathname = locationState?.from?.pathname;

  if (!isLoggedIn) {
    return (
      <Route
        path={pathname}
        render={() => <Redirect to={ROUTE_PATHS.LOGIN} />}
      />
    );
  }

  return <Route {...props} />;
};

export default PrivateRoute;
