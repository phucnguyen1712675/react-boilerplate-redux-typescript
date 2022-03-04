import { ACCESS_TOKEN_KEY } from 'app_constants';
import { usePathname } from 'hooks';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';

const PublicRoute = (props: RouteProps) => {
  const isLoggedIn = !!localStorage.getItem(ACCESS_TOKEN_KEY);
  const pathname = usePathname();

  if (isLoggedIn) {
    return (
      <Route
        render={() => (
          <Redirect
            to={{
              pathname: ROUTE_PATHS.HOME,
              state: {
                from: {
                  pathname,
                },
              },
            }}
          />
        )}
      />
    );
  }

  return <Route {...props} />;
};

export default PublicRoute;
