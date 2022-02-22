import * as yup from 'yup';

import {
  IEditPostFormValues,
  editPostSchema,
} from 'validations/posts/editPost.schema';

export interface IAddPostFormValues extends IEditPostFormValues {
  userId: number | string;
}

export const addPostSchema = editPostSchema.shape({
  userId: yup
    .number()
    .typeError('Please select a user')
    .required('Author is required'),
});
