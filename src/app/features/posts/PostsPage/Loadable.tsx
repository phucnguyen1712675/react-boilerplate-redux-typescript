/**
 * Asynchronously loads the component for PostsPage
 */

import { LoadingIndicator } from 'app/components';
import { lazyLoad } from 'utils';

const PostsPage = lazyLoad(
  () => import('app/features/posts'),
  (module) => module.PostsPage,
  {
    fallback: <LoadingIndicator />,
  }
);

export default PostsPage;
