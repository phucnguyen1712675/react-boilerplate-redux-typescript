import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'hooks';
import { selectUserById } from 'store/slices/usersSlice';

type Props = {
  userId: EntityId;
};

const PostAuthor = ({ userId }: Props) => {
  const author = useAppSelector((state) => selectUserById(state, userId));

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;
