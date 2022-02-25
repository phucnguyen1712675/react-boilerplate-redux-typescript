/**
 * Asynchronously loads the component for SinglePostPage
 */

import { LoadingIndicator } from 'app/components';
import { lazyLoad } from 'utils';

const SinglePostPage = lazyLoad(
  () => import('app/features/posts'),
  (module) => module.SinglePostPage,
  {
    fallback: <LoadingIndicator />,
  }
);

export default SinglePostPage;
