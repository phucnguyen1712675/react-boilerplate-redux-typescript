/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components';

const NotFoundPage = lazyLoad(
  () => import('app/pages'),
  (module) => module.NotFoundPage,
  {
    fallback: <LoadingIndicator />,
  }
);

export default NotFoundPage;
