import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, Global } from '@emotion/react';

import 'index.css';
import App from 'app';
import store from 'store';
import * as serviceWorker from 'serviceWorker';
import { theme, globalStyles } from 'styles';
import { fetchUsers } from 'store/usersSlice';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

store.dispatch(fetchUsers());

render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>,
  MOUNT_NODE
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
