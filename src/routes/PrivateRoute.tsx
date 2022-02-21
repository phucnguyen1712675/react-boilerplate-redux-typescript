import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { useAuthState } from 'services/auth';

const PrivateRoute = () => {
  const authenticated = useAuthState();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
