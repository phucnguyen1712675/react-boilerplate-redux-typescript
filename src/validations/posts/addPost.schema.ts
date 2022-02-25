import * as yup from 'yup';

import {
  EditPostPayload,
  editPostSchema,
} from 'validations/posts/editPost.schema';

export type AddPostPayload = EditPostPayload & {
  userId: number | string;
};

export const addPostSchema = editPostSchema.shape({
  userId: yup
    .number()
    .typeError('Please select a user')
    .required('Author is required'),
});
