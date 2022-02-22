import * as yup from 'yup';

export interface IEditPostFormValues {
  title: string;
  body: string;
}

export const editPostSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  body: yup
    .string()
    .required('Body is required')
    .min(8, 'Body must be at least 8 characters long'),
});
