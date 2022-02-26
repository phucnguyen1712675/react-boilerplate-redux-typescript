/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { EntityId } from '@reduxjs/toolkit';
import { LoadingIndicator } from 'app/components';
import { Button, Title } from 'app/components/styled';
import { PostAuthor } from 'app/features/posts/components';
import { RequestStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Redirect,
  Route,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import {
  removePost,
  selectPostById,
  selectPostsError,
  selectPostsStatus,
} from 'store/slices/postsSlice';
import type { LocationState } from 'types';
import { showConfirmSwal, showErrorSwal, showSuccessSwal } from 'utils/swal';

type RouteParam = {
  postId: string;
};

const SinglePostPage = () => {
  const { postId } = useParams<RouteParam>();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    selectPostById(state, postId as EntityId)
  );
  const postsStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);
  const history = useHistory();
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const pathname = locationState?.from?.pathname;

  let from: string;
  if (pathname && pathname !== `/editPost/${postId}`) {
    from = pathname;
  } else {
    from = ROUTE_PATHS.HOME;
  }

  let content: ReactElement | null;

  if (postsStatus === RequestStatus.LOADING) {
    content = <LoadingIndicator small />;
  } else if (postsStatus === RequestStatus.SUCCEEDED) {
    if (!post) {
      content = (
        <Route path={pathname} render={() => <Redirect to='/notFoundPage' />} />
      );
    } else {
      const handleEditPost = () => {
        history.push(`/editPost/${post.id}`);
      };

      const handleDeletePost = async () => {
        const { isConfirmed } = await showConfirmSwal();
        if (isConfirmed) {
          dispatch(removePost(post.id));
          if (postsStatus === RequestStatus.SUCCEEDED) {
            await showSuccessSwal({
              title: 'Deleted!',
              text: 'Post edited successfully',
            });
            history.push(from);
          } else if (postsStatus === RequestStatus.FAILED) {
            showErrorSwal(postsError || 'Something went wrong');
          }
        }
      };

      content = (
        <section>
          <article
            css={css`
              display: flex;
              flex-direction: column;
              row-gap: 1.5rem;
            `}
          >
            <div>
              <Title
                css={css`
                  margin-bottom: 5px;
                  line-height: 2.5rem;
                  font-size: 2.5rem;
                `}
              >
                {post.title}
              </Title>
              <PostAuthor userId={post.userId} />
            </div>
            <p>{post.body}</p>
            <div
              css={css`
                display: flex;
                column-gap: 1rem;
              `}
            >
              <Button color='primary' onClick={handleEditPost}>
                Edit Post
              </Button>
              <Button
                color='error'
                variant='outline'
                onClick={handleDeletePost}
              >
                Delete Post
              </Button>
            </div>
          </article>
        </section>
      );
    }
  } else if (postsStatus === RequestStatus.FAILED) {
    content = <div>{postsError}</div>;
  } else {
    content = null;
  }

  return (
    <>
      <Helmet>
        <title>Single Post Page</title>
        <meta name='description' content='SinglePostPage' />
      </Helmet>
      {content}
    </>
  );
};

export default SinglePostPage;
