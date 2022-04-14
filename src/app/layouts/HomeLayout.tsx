import styled from '@emotion/styled/macro';
import { LoadingIndicator, NavBar } from 'app/components';
import { LoadingWrapper, PageWrapper } from 'app/components/styled';
import { RequestStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute, routes, ROUTE_PATHS } from 'routes';
import { fetchPosts, selectFetchPostsInfo } from 'store/posts/postsSlice';

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

  switch (status) {
    case RequestStatus.SUCCEEDED:
      return (
        <>
          <NavBar />
          <HomeLayoutWrapper>
            <Switch>
              {routes.map((route) => (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                >
                  {route.children}
                </PrivateRoute>
              ))}
              <Route
                path={ROUTE_PATHS.ROOT}
                render={() => <Redirect to={ROUTE_PATHS.HOME} />}
              />
            </Switch>
          </HomeLayoutWrapper>
        </>
      );
    case RequestStatus.FAILED:
      return <div>{`Error: ${error}`}</div>;
    default:
      return (
        <LoadingWrapper>
          <LoadingIndicator />
        </LoadingWrapper>
      );
  }
};

export default HomeLayout;
