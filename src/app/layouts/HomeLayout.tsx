import styled from '@emotion/styled/macro';
import { NavBar } from 'app/components';
import { PageWrapper } from 'app/components/styled';
import { RequestStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute, routes, ROUTE_PATHS } from 'routes';
import { fetchPosts, selectFetchPostsInfo } from 'store/slices/postsSlice';

const HomeLayoutWrapper = styled(PageWrapper)`
  padding-top: 4rem;
`;

const HomeLayout = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectFetchPostsInfo);

  useEffect(() => {
    if (status === RequestStatus.IDLE) {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (error) {
    return <div>{error}</div>;
  }

  const privateRoutes = routes.map((route) => (
    <PrivateRoute key={route.path} path={route.path} exact={route.exact}>
      {route.children}
    </PrivateRoute>
  ));

  return (
    <>
      <NavBar />
      <HomeLayoutWrapper>
        <Switch>
          {privateRoutes}
          <Route
            path={ROUTE_PATHS.ROOT}
            render={() => <Redirect to={ROUTE_PATHS.HOME} />}
          />
        </Switch>
      </HomeLayoutWrapper>
    </>
  );
};

export default HomeLayout;
