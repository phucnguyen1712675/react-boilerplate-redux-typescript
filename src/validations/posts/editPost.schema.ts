import * as yup from 'yup';

export type EditPostPayload = {
  title: string;
  body: string;
  [key: string]: string;
};

export const editPostSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  body: yup
    .string()
    .required('Body is required')
    .min(8, 'Body must be at least 8 characters long'),
});
