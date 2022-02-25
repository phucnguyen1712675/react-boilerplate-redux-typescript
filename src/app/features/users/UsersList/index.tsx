import { Link, Title } from 'app/components/styled';
import { useAppSelector } from 'hooks';
import { selectAllUsers } from 'store/slices/usersSlice';

const UsersList = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
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
