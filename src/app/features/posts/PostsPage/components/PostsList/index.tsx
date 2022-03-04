import styled from '@emotion/styled/macro';
import { Title } from 'app/components/styled';
import { PostExcerpt } from 'app/features/posts/PostsPage/components/PostsList/components';
import styles from 'app/features/posts/PostsPage/components/PostsList/index.module.css';
import { useAppSelector } from 'hooks';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { selectPostIds } from 'store/slices/postsSlice';

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const POST_PER_PAGE = 10;

type OnPageChangeParam = {
  selected: number;
};

const PostsList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const orderedPostIds = useAppSelector(selectPostIds);

  const handlePageChange = ({ selected }: OnPageChangeParam) => {
    setPageNumber(selected);
  };

  const postsVisited = pageNumber * POST_PER_PAGE;
  const displayedPosts = orderedPostIds
    .slice(postsVisited, postsVisited + POST_PER_PAGE)
    .map((postId) => <PostExcerpt key={postId} postId={postId} />);
  const pageCount = Math.ceil(orderedPostIds.length / POST_PER_PAGE);

  return (
    <section>
      <Title as='h2'>Posts</Title>
      <div>
        <PostsWrapper>{displayedPosts}</PostsWrapper>
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
      </div>
    </section>
  );
};

export default PostsList;
