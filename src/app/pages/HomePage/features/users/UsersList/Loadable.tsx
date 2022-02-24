/**
 * Asynchronously loads the component for UsersList
 */

import { LoadingIndicator } from 'app/components';
import { lazyLoad } from 'utils';

const UsersList = lazyLoad(
  () => import('app/pages/HomePage/features/users'),
  (module) => module.UsersList,
  {
    fallback: <LoadingIndicator />,
  }
);

export default UsersList;
