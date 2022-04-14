/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import { EntityId } from '@reduxjs/toolkit';
import { Button } from 'app/components';
import { PostAuthor } from 'app/features/posts/components';
import { useAppSelector } from 'hooks';
import { useHistory } from 'react-router-dom';
import { selectPostById } from 'store/posts/postsSlice';

const StyledPostExcerpt = styled.article`
  border: 1px solid rgb(177, 174, 174);
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  border-radius: 7px;
  padding: 1rem;
  width: 60%;
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
`;

type Props = {
  postId: EntityId;
};

const PostExcerpt = ({ postId }: Props) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  const history = useHistory();

  if (!post) {
    return null;
  }

  const handleViewPost = () => {
    history.push(`/posts/${postId}`);
  };

  return (
    <StyledPostExcerpt key={post.id}>
      <div>
        <PostTitle>{post.title}</PostTitle>
        <PostAuthor userId={post.userId} />
      </div>
      <p>{post.body.substring(0, 100)}</p>
      <Button
        css={css`
          align-self: flex-start;
        `}
        onClick={handleViewPost}
      >
        View Post
      </Button>
    </StyledPostExcerpt>
  );
};

export default PostExcerpt;
