/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { EntityId } from '@reduxjs/toolkit';
import { Button, Title } from 'app/components/styled';
import { PostAuthor } from 'app/features/posts/components';
import { RequestStatus } from 'enums';
import {
  useAppDispatch,
  useAppSelector,
  usePathname,
  useRequestInfoWithErrorSwal,
} from 'hooks';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';
import {
  removePost,
  selectPostById,
  selectRemovePostInfo,
} from 'store/slices/postsSlice';
import { showConfirmSwal, showSuccessSwal } from 'utils/swal';

type RouteParam = {
  postId: string;
};

const SinglePostPage = () => {
  const { postId } = useParams<RouteParam>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    selectPostById(state, postId as EntityId)
  );
  const { status, loading } = useRequestInfoWithErrorSwal(selectRemovePostInfo);
  const pathname = usePathname();

  let from: string = ROUTE_PATHS.HOME;
  if (pathname && pathname !== `/editPost/${postId}`) {
    from = pathname;
  }

  useEffect(() => {
    const handleDeletePostSucceeded = async () => {
      await showSuccessSwal({
        title: 'Deleted!',
        text: 'Post edited successfully',
      });
      history.push(from);
    };

    if (status === RequestStatus.SUCCEEDED) {
      handleDeletePostSucceeded();
    }
  }, [from, history, status]);

  // if (postsStatus === RequestStatus.LOADING) {
  //   content = <LoadingIndicator small />;
  // } else if (postsStatus === RequestStatus.SUCCEEDED) {
  //   if (!post) {
  //     content = <Redirect to='/notfoundpage' />;
  //   } else {
  //     const handleEditPost = () => {
  //       history.push(`/editPost/${post.id}`);
  //     };

  //     const handleDeletePost = async () => {
  //       const { isConfirmed } = await showConfirmSwal();
  //       if (isConfirmed) {
  //         dispatch(removePost(post.id));
  //       }
  //     };

  //     content = (
  //       <section>
  //         <article
  //           css={css`
  //             display: flex;
  //             flex-direction: column;
  //             row-gap: 1.5rem;
  //           `}
  //         >
  //           <div>
  //             <Title
  //               css={css`
  //                 margin-bottom: 5px;
  //                 line-height: 2.5rem;
  //                 font-size: 2.5rem;
  //               `}
  //             >
  //               {post.title}
  //             </Title>
  //             <PostAuthor userId={post.userId} />
  //           </div>
  //           <p>{post.body}</p>
  //           <div
  //             css={css`
  //               display: flex;
  //               column-gap: 1rem;
  //             `}
  //           >
  //             <Button color='primary' onClick={handleEditPost}>
  //               Edit Post
  //             </Button>
  //             <Button
  //               color='error'
  //               variant='outline'
  //               onClick={handleDeletePost}
  //             >
  //               Delete Post
  //             </Button>
  //           </div>
  //         </article>
  //       </section>
  //     );
  //   }
  // } else if (postsStatus === RequestStatus.FAILED) {
  //   content = <div>{postsError}</div>;
  // }

  if (!post) {
    return <Redirect to='/notfoundpage' />;
  }
  const handleEditPost = () => {
    history.push(`/editPost/${post.id}`);
  };

  const handleDeletePost = async () => {
    const { isConfirmed } = await showConfirmSwal();
    if (isConfirmed) {
      dispatch(removePost(post.id));
    }
  };

  const canEdit = !loading;

  return (
    <>
      <Helmet>
        <title>Single Post Page</title>
        <meta name='description' content='SinglePostPage' />
      </Helmet>
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
            <Button
              color='primary'
              disabled={!canEdit}
              onClick={handleEditPost}
            >
              Edit Post
            </Button>
            <Button
              color='error'
              variant='outline'
              disabled={!canEdit}
              onClick={handleDeletePost}
            >
              {loading ? 'Deleting Post' : 'Delete Post'}
            </Button>
          </div>
        </article>
      </section>
    </>
  );
};

export default SinglePostPage;
