import { EntityId } from '@reduxjs/toolkit';
import {
  Form,
  FormInput,
  FormSelect,
  FormSubmitButton,
  FormTextArea,
} from 'app/components/Form';
import { Title } from 'app/components/styled';
import { RequestStatus } from 'enums';
import {
  useAppDispatch,
  useAppSelector,
  useFormWithSchema,
  useRequestInfoWithErrorSwal,
} from 'hooks';
import { useEffect } from 'react';
import { addNewPost, selectAddPostInfo } from 'store/slices/postsSlice';
import { selectAllUsers } from 'store/slices/usersSlice';
import { showSuccessSwal } from 'utils/swal';
import {
  AddPostPayload,
  AddPostSchema,
  addPostSchema,
} from 'validations/posts/addPost.schema';

const DEFAULT_VALUE_USER_ID = 0;

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const { status, loading } = useRequestInfoWithErrorSwal(selectAddPostInfo);
  const methods = useFormWithSchema(addPostSchema);
  const { reset } = methods;

  useEffect(() => {
    if (status === RequestStatus.SUCCEEDED) {
      reset();
      showSuccessSwal({
        title: 'Added!',
        text: 'Post added successfully',
      });
    }
  }, [status, reset]);

  const onSubmit = (data: AddPostPayload) => {
    const newPost = {
      ...data,
      userId: data.userId as EntityId,
    };
    dispatch(addNewPost(newPost));
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave = !loading;

  return (
    <section>
      <Title as='h2'>Add new post</Title>
      <Form<AddPostSchema> methods={methods} onSubmit={onSubmit}>
        <FormInput<AddPostPayload>
          id='title'
          label='Title'
          placeholder='Title'
        />
        <FormSelect<AddPostPayload>
          id='userId'
          label='Author'
          defaultValue={`${DEFAULT_VALUE_USER_ID}`}
        >
          <option disabled hidden value={DEFAULT_VALUE_USER_ID}>
            Choose a user
          </option>
          {usersOptions}
        </FormSelect>
        <FormTextArea<AddPostPayload> id='body' label='Body' />
        <FormSubmitButton color='primary' disabled={!canSave}>
          {loading ? 'Saving Post' : 'Save Post'}
        </FormSubmitButton>
      </Form>
    </section>
  );
};

export default AddPostForm;
