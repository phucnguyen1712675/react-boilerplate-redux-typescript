/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { EntityId } from '@reduxjs/toolkit';
import {
  FormGroup,
  FormInput,
  FormSelect,
  FormTextArea,
} from 'app/components/Form';
import { Button, Title } from 'app/components/styled';
import { RequestStatus } from 'enums';
import { useAppDispatch, useAppSelector, useFormWithSchema } from 'hooks';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import {
  addNewPost,
  selectPostsError,
  selectPostsStatus,
} from 'store/slices/postsSlice';
import { selectAllUsers } from 'store/slices/usersSlice';
import { showErrorSwal, showSuccessSwal } from 'utils/swal';
import {
  AddPostPayload,
  addPostSchema,
} from 'validations/posts/addPost.schema';

const DEFAULT_VALUE_USER_ID = 'DEFAULT_VALUE_USER_ID';

const AddPostForm = () => {
  const [loading, setLoading] = useState(false);
  const methods = useFormWithSchema(addPostSchema);
  const { handleSubmit, reset } = methods;
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const postsStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);

  useEffect(() => {
    if (loading && postsStatus === RequestStatus.SUCCEEDED) {
      reset();
      showSuccessSwal({
        title: 'Added!',
        text: 'Post added successfully',
      });
      setLoading(false);
    } else if (loading && postsStatus === RequestStatus.FAILED) {
      showErrorSwal(postsError || 'Something went wrong');
      setLoading(false);
    }
  }, [loading, postsError, postsStatus, reset]);

  const onSubmit = (data: AddPostPayload) => {
    dispatch(
      addNewPost({
        ...data,
        userId: data.userId as EntityId,
      })
    );
    setLoading(true);
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
      <FormProvider {...methods}>
        <FormGroup onSubmit={handleSubmit(onSubmit)}>
          <FormInput<AddPostPayload>
            id='title'
            label='Title'
            placeholder='Title'
          />
          <FormSelect<AddPostPayload>
            id='userId'
            label='Author'
            defaultValue={DEFAULT_VALUE_USER_ID}
          >
            <option disabled hidden value={DEFAULT_VALUE_USER_ID}>
              Choose a user
            </option>
            {usersOptions}
          </FormSelect>
          <FormTextArea<AddPostPayload> id='body' label='Body' />
          <Button
            color='primary'
            type='submit'
            css={css`
              align-self: flex-start;
              margin-top: 0.5rem;
            `}
            disabled={!canSave}
          >
            {postsStatus === RequestStatus.LOADING ? 'Loading' : 'Save post'}
          </Button>
        </FormGroup>
      </FormProvider>
    </section>
  );
};

export default AddPostForm;
