/**
 * Asynchronously loads the component for LoginPage
 */

import { LoadingIndicator } from 'app/components';
import { LoadingWrapper } from 'app/components/styled';
import { lazyLoad } from 'utils';

const LoginPage = lazyLoad(
  () => import('app/features/auth'),
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
