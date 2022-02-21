/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components';
import { LoadingWrapper } from 'app/components/styled';

const HomePage = lazyLoad(
  () => import('app/pages'),
  (module) => module.HomePage,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  }
);

export default HomePage;
