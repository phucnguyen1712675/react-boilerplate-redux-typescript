import { InferType, object, string } from 'yup';

export const editPostSchema = object({
  title: string().required('Title is required'),
  body: string()
    .required('Body is required')
    .min(8, 'Body must be at least 8 characters long'),
}).required();

export type EditPostSchema = typeof editPostSchema;

export type EditPostValues = InferType<typeof editPostSchema>;
