import { useTheme, Global } from '@emotion/react/macro';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import { history } from 'utils';
import { AuthLayout, HomeLayout } from 'routes/layouts';
import { globalStyles } from 'styles';

const App = () => {
  const theme = useTheme();
  const appGlobalStyles = globalStyles(theme);

  return (
    <>
      <Global styles={appGlobalStyles} />
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
    </>
  );
};

export default App;
