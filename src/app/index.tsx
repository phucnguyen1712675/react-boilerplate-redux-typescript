import { AuthLayout, HomeLayout } from 'app/layouts';
import { ConnectedRouter } from 'connected-react-router';
import { RequestStatus } from 'enums';
import { useAppSelector } from 'hooks';
import { Route, Switch } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { selectFetchUsersInfo } from 'store/users/usersSlice';
import { history } from 'utils';

const App = () => {
  const { status, error } = useAppSelector(selectFetchUsersInfo);
  // const pathname = usePathname();
  // console.log(pathname);

  switch (status) {
    case RequestStatus.FAILED:
      return <div>{`Error: ${error}`}</div>;
    default:
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
  }
};

export default App;
