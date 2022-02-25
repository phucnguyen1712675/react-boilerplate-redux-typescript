/**
 * Asynchronously loads the component for NotFoundPage
 */

import { LoadingIndicator } from 'app/components';
import { lazyLoad } from 'utils';

const NotFoundPage = lazyLoad(
  () => import('app/features/auth'),
  (module) => module.NotFoundPage,
  {
    fallback: <LoadingIndicator />,
  }
);

export default NotFoundPage;
