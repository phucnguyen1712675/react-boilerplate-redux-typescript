import { Link, Title } from 'app/components/styled';
import { useAppSelector } from 'hooks';
import { selectAllUsers } from 'store/slices/usersSlice';
import { useRouteMatch } from 'react-router-dom';

const UsersList = () => {
  const users = useAppSelector(selectAllUsers);
  const match = useRouteMatch();

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`${match.url}/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <Title>Users</Title>
      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
