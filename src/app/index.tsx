import { useTheme, Global } from '@emotion/react/macro';
import { ConnectedRouter } from 'connected-react-router';
import { Helmet } from 'react-helmet-async';
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
        <Helmet titleTemplate='%s - Week 2' defaultTitle='Week 2'>
          <meta name='description' content='A React application' />
        </Helmet>
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
