import { Layout } from 'app/components';
import { RequestStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { PrivateRoute, routes, ROUTE_PATHS } from 'routes';
import { fetchPosts, selectPostsStatus } from 'store/slices/postsSlice';
import type { LocationState } from 'types';

const HomeLayout = () => {
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const pathname = locationState?.from?.pathname;
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector(selectPostsStatus);

  useEffect(() => {
    if (postStatus === RequestStatus.IDLE) {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <Layout>
      <Switch>
        {routes.map((route) => (
          <PrivateRoute
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
        <Route
          path={pathname}
          render={() => <Redirect to={ROUTE_PATHS.HOME} />}
        />
      </Switch>
    </Layout>
  );
};

export default HomeLayout;
