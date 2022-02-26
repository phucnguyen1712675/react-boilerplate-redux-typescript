import { Link, Title } from 'app/components/styled';
import { useAppSelector } from 'hooks';
import { Helmet } from 'react-helmet-async';
import { useRouteMatch } from 'react-router-dom';
import { selectAllUsers } from 'store/slices/usersSlice';

const UsersList = () => {
  const users = useAppSelector(selectAllUsers);
  const { url } = useRouteMatch();

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`${url}/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <>
      <Helmet>
        <title>Users List Page</title>
        <meta name='description' content='UserListsPage' />
      </Helmet>
      <section>
        <Title>Users</Title>
        <ul>{renderedUsers}</ul>
      </section>
    </>
  );
};

export default UsersList;
