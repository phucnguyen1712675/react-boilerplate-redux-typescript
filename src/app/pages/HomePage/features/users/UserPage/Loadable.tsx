/**
 * Asynchronously loads the component for UserPage
 */

import { LoadingIndicator } from 'app/components';
import { lazyLoad } from 'utils';

const UserPage = lazyLoad(
  () => import('app/pages/HomePage/features/users'),
  (module) => module.UserPage,
  {
    fallback: <LoadingIndicator />,
  }
);

export default UserPage;
