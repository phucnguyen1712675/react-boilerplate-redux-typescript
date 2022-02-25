/**
 * Asynchronously loads the component for EditPostForm
 */

import { LoadingIndicator } from 'app/components';
import { lazyLoad } from 'utils';

const EditPostForm = lazyLoad(
  () => import('app/features/posts'),
  (module) => module.EditPostForm,
  {
    fallback: <LoadingIndicator />,
  }
);

export default EditPostForm;
