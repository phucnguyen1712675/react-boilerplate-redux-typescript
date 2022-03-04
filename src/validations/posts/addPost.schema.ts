import {
  EditPostPayload,
  editPostSchema,
} from 'validations/posts/editPost.schema';
import { InferType, number } from 'yup';

export const addPostSchema = editPostSchema
  .shape({
    userId: number()
      .typeError('Please select a user')
      .required('Author is required'),
  })
  .required();

export type AddPostSchema = typeof addPostSchema;

export type AddPostPayload = EditPostPayload & InferType<typeof addPostSchema>;

// export type AddPostPayload = EditPostPayload & {
//   userId: number | string;
// };
