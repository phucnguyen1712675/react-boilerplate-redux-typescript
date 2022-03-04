import { EntityId } from '@reduxjs/toolkit';
import {
  Form,
  FormInput,
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
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import {
  editPost,
  selectPostById,
  selectEditPostInfo,
} from 'store/slices/postsSlice';
import { showSuccessSwal } from 'utils/swal';
import {
  EditPostPayload,
  EditPostSchema,
  editPostSchema,
} from 'validations/posts/editPost.schema';

type RouteParam = {
  postId: string;
};

const EditPostForm = () => {
  const { postId } = useParams<RouteParam>();
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    selectPostById(state, postId as EntityId)
  );
  const { status, loading } = useRequestInfoWithErrorSwal(selectEditPostInfo);
  const methods = useFormWithSchema(editPostSchema, {
    defaultValues: {
      title: post?.title ?? '',
      body: post?.body ?? '',
    },
  });
  const { reset, getValues } = methods;

  useEffect(() => {
    const formValues = getValues();
    const isEmptyForm = Object.values(formValues).every(
      (value) => value === ''
    );

    if (isEmptyForm && post) {
      const resetValues = {
        title: post.title,
        body: post.body,
      };
      reset(resetValues);
    }
  }, [getValues, post, reset]);

  useEffect(() => {
    const handleEditPostSucceeded = async () => {
      await showSuccessSwal({
        title: 'Edited!',
        text: 'Post edited successfully',
      });

      const state = {
        from: {
          pathname: url,
        },
      };
      history.push(`/posts/${postId}`, state);
    };

    if (status === RequestStatus.SUCCEEDED) {
      handleEditPostSucceeded();
    }
  }, [history, postId, status, url]);

  const onSubmit = (data: EditPostPayload) => {
    const editedValues = { ...data, id: +postId };
    dispatch(editPost(editedValues));
  };

  return (
    <>
      <Helmet>
        <title>Edit Post Form Page</title>
        <meta name='description' content='EditPostFormPage' />
      </Helmet>
      <section>
        <Title>Edit Post</Title>
        <Form<EditPostSchema> methods={methods} onSubmit={onSubmit}>
          <FormInput<EditPostPayload>
            id='title'
            label='Post Title'
            placeholder='Title'
          />
          <FormTextArea<EditPostPayload> id='body' label='Body' />
          <FormSubmitButton color='primary'>
            {loading ? 'Saving Post' : 'Save Post'}
          </FormSubmitButton>
        </Form>
      </section>
    </>
  );
};

export default EditPostForm;
