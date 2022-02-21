/**
 * Asynchronously loads the component for LoginPage
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components';
import { LoadingWrapper } from 'app/components/styled';

const LoginPage = lazyLoad(
  () => import('app/pages'),
  (module) => module.LoginPage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);

export default LoginPage;
