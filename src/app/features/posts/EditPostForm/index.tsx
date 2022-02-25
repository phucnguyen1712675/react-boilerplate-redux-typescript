/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import { EntityId } from '@reduxjs/toolkit';
import { FormGroup, FormInput, FormTextArea } from 'app/components/Form';
import { Button, Title } from 'app/components/styled';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { editPost, selectPostById } from 'store/slices/postsSlice';
import { showSuccessSwal } from 'utils/swal';
import {
  EditPostPayload,
  editPostSchema,
} from 'validations/posts/editPost.schema';

type RouteParam = {
  postId: string;
};

const EditPostForm = () => {
  const { postId } = useParams<RouteParam>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    selectPostById(state, postId as EntityId)
  );
  const methods = useForm<EditPostPayload>({
    resolver: yupResolver(editPostSchema),
    defaultValues: {
      title: post?.title ?? '',
      body: post?.body ?? '',
    },
  });
  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    if (Object.values(getValues).every((value) => value === '') && post) {
      reset({
        title: post.title,
        body: post.body,
      });
    }
  }, [getValues, post, reset]);

  const onSubmit = async (data: EditPostPayload) => {
    dispatch(editPost({ ...data, id: +postId }));
    await showSuccessSwal({
      title: 'Edited!',
      text: 'Post edited successfully',
    });
    history.push(`/posts/${postId}`, {
      state: {
        from: {
          pathname: `/editPost/${postId}`,
        },
      },
    });
  };

  return (
    <section>
      <Title>Edit Post</Title>
      <FormProvider {...methods}>
        <FormGroup onSubmit={handleSubmit(onSubmit)}>
          <FormInput<EditPostPayload>
            id='title'
            label='Post Title'
            placeholder='Title'
          />
          <FormTextArea<EditPostPayload> id='body' label='Body' />
          <Button
            color='primary'
            type='submit'
            css={css`
              margin-top: 0.5rem;
              align-self: flex-start;
            `}
          >
            Save Post
          </Button>
        </FormGroup>
      </FormProvider>
    </section>
  );
};

export default EditPostForm;