/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { LoadingIndicator } from 'app/components';
import { Title } from 'app/components/styled';
import { PostExcerpt } from 'app/features/posts/PostsPage/components/PostsList/components';
import styles from 'app/features/posts/PostsPage/components/PostsList/index.module.css';
import { RequestStatus } from 'enums';
import { useAppSelector } from 'hooks';
import { ReactNode, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
  selectPostIds,
  selectPostsError,
  selectPostsStatus,
} from 'store/slices/postsSlice';

const POST_PER_PAGE = 10;

type OnPageChangeParam = {
  selected: number;
};

const PostsList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const orderedPostIds = useAppSelector(selectPostIds);
  const postsStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);

  let content: ReactNode;

  if (postsStatus === RequestStatus.LOADING) {
    content = <LoadingIndicator small />;
  } else if (postsStatus === RequestStatus.SUCCEEDED) {
    const postsVisited = pageNumber * POST_PER_PAGE;
    const displayedPosts = orderedPostIds
      .slice(postsVisited, postsVisited + POST_PER_PAGE)
      .map((postId) => <PostExcerpt key={postId} postId={postId} />);
    const pageCount = Math.ceil(orderedPostIds.length / POST_PER_PAGE);

    const handlePageChange = ({ selected }: OnPageChangeParam) => {
      setPageNumber(selected);
    };

    content = (
      <>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
          `}
        >
          {displayedPosts}
        </div>
        <ReactPaginate
          previousLabel='Previous'
          nextLabel='Next'
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={styles.paginationBtns}
          previousLinkClassName={styles.previousBtn}
          nextLinkClassName={styles.nextBtn}
          disabledClassName={styles.paginationDisabled}
          activeClassName={styles.paginationActive}
        />
      </>
    );
  } else if (postsStatus === RequestStatus.FAILED) {
    content = <div>{postsError}</div>;
  }

  return (
    <section>
      <Title as='h2'>Posts</Title>
      {content}
    </section>
  );
};

export default PostsList;
