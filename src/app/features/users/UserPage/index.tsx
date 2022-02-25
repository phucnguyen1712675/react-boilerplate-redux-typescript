import { EntityId } from '@reduxjs/toolkit';
import { Link, Title } from 'app/components/styled';
import { useAppSelector } from 'hooks';
import { Redirect, Route, useLocation, useParams } from 'react-router-dom';
import { selectPostsByUser } from 'store/slices/postsSlice';
import { selectUserById } from 'store/slices/usersSlice';
import type { LocationState } from 'types';

type RouteParam = {
  userId: string;
};

const UserPage = () => {
  const { userId } = useParams<RouteParam>();
  const user = useAppSelector((state) =>
    selectUserById(state, userId as EntityId)
  );
  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId as EntityId)
  );
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const pathname = locationState?.from?.pathname;

  if (!user) {
    return (
      <Route path={pathname} render={() => <Redirect to='/notFoundPage' />} />
    );
  }

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <Title>{user.name}</Title>
      <ul>{postTitles}</ul>
    </section>
  );
};

export default UserPage;
