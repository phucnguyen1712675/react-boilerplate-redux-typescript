import { LoadingIndicator } from 'app/components';
import { LoadingWrapper } from 'app/components/styled';
import { AuthLayout, HomeLayout } from 'app/layouts';
import { ConnectedRouter } from 'connected-react-router';
import { RequestStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { fetchUsers, selectFetchUsersInfo } from 'store/slices/usersSlice';
import { history } from 'utils';

const App = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectFetchUsersInfo);

  useEffect(() => {
    if (status === RequestStatus.IDLE) {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  switch (status) {
    // case RequestStatus.LOADING:
    //   return (
    //     <LoadingWrapper>
    //       <LoadingIndicator />
    //     </LoadingWrapper>
    //   );
    case RequestStatus.SUCCEEDED:
      return (
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={ROUTE_PATHS.LOGIN}>
              <AuthLayout />
            </Route>
            <Route path={ROUTE_PATHS.ROOT}>
              <HomeLayout />
            </Route>
          </Switch>
        </ConnectedRouter>
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

export default App;
