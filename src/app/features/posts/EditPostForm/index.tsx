import styled from '@emotion/styled/macro';
import { EntityId } from '@reduxjs/toolkit';
import { Button } from 'app/components';
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
  selectEditPostInfo,
  selectPostById,
} from 'store/posts/postsSlice';
import { showSuccessSwal } from 'utils/swal';
import {
  EditPostSchema,
  editPostSchema,
  EditPostValues,
} from 'validations/posts/editPost.schema';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;

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
  const {
    reset,
    getValues,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    const formValues = getValues();
    const hasValues = Object.values(formValues).every(Boolean);

    if (!hasValues && post) {
      const resetValues = {
        title: post.title,
        body: post.body,
      };
      reset(resetValues);
    }
  }, [getValues, post, reset]);

  useEffect(() => {
    if (status === RequestStatus.SUCCEEDED) {
      showSuccessSwal({
        title: 'Edited!',
        text: 'Post edited successfully',
      });
    }
  }, [history, postId, status, url]);

  const onSubmit = (data: EditPostValues) => {
    const editPostPayload = { ...data, id: postId as EntityId };
    dispatch(editPost(editPostPayload));
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const canSave = isDirty && !loading;

  return (
    <>
      <Helmet>
        <title>Edit Post Form Page</title>
        <meta name='description' content='EditPostFormPage' />
      </Helmet>
      <section>
        <Title>Edit Post</Title>
        <Form<EditPostSchema> methods={methods} onSubmit={onSubmit}>
          <FormInput<EditPostValues>
            id='title'
            label='Post Title'
            placeholder='Title'
          />
          <FormTextArea<EditPostValues> id='body' label='Body' />
          <ButtonWrapper>
            <FormSubmitButton color='primary' disabled={!canSave}>
              {loading ? 'Saving Post' : 'Save Post'}
            </FormSubmitButton>
            <Button variant='outline' onClick={handleGoBack}>
              Go Back
            </Button>
          </ButtonWrapper>
        </Form>
      </section>
    </>
  );
};

export default EditPostForm;
