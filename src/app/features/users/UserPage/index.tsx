import { EntityId } from '@reduxjs/toolkit';
import { Link, Title } from 'app/components/styled';
import { useAppSelector } from 'hooks';
import { Helmet } from 'react-helmet-async';
import { Redirect, useParams } from 'react-router-dom';
import { selectPostsByUser } from 'store/posts/postsSlice';
import { selectUserById } from 'store/users/usersSlice';

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

  if (!user) {
    return <Redirect to='/notfoundpage' />;
  }

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <>
      <Helmet>
        <title>User Page</title>
        <meta name='description' content='UserPage' />
      </Helmet>
      <section>
        <Title>{user.name}</Title>
        <ul>{postTitles}</ul>
      </section>
    </>
  );
};

export default UserPage;
