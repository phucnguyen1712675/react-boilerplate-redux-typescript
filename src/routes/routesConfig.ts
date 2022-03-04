import EditPostForm from 'app/features/posts/EditPostForm/Loadable';
import PostsPage from 'app/features/posts/PostsPage/Loadable';
import SinglePostPage from 'app/features/posts/SinglePostPage/Loadable';
import UserPage from 'app/features/users/UserPage/Loadable';
import UsersList from 'app/features/users/UsersList/Loadable';
import { ROUTE_PATHS } from 'routes';

interface IRoute {
  path: string;
  children: (props: unknown) => JSX.Element;
  isPrivate: boolean;
  exact?: boolean;
}
const routes: IRoute[] = [
  {
    path: ROUTE_PATHS.HOME,
    children: PostsPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.POST,
    children: SinglePostPage,
    isPrivate: true,
  },
  {
    path: ROUTE_PATHS.EDIT_POST,
    children: EditPostForm,
    isPrivate: true,
  },
  {
    path: ROUTE_PATHS.USERS,
    children: UsersList,
    isPrivate: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.USER,
    children: UserPage,
    isPrivate: true,
  },
];

export default routes;
