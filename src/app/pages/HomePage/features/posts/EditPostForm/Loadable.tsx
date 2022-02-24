/**
 * Asynchronously loads the component for EditPostForm
 */

import { LoadingIndicator } from 'app/components';
import { lazyLoad } from 'utils';

const EditPostForm = lazyLoad(
  () => import('app/pages/HomePage/features/posts'),
  (module) => module.EditPostForm,
  {
    fallback: <LoadingIndicator />,
  }
);

export default EditPostForm;
