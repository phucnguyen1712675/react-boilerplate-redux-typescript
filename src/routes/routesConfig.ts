import EditPostForm from 'app/features/posts/EditPostForm/Loadable';
import PostsPage from 'app/features/posts/PostsPage/Loadable';
import SinglePostPage from 'app/features/posts/SinglePostPage/Loadable';
import UserPage from 'app/features/users/UserPage/Loadable';
import UsersList from 'app/features/users/UsersList/Loadable';
import { ROUTE_PATHS } from 'routes';

interface Route {
  path: string;
  component: (props: unknown) => JSX.Element;
  isPrivate: boolean;
  exact?: boolean;
}
const routes: Route[] = [
  {
    path: ROUTE_PATHS.HOME,
    component: PostsPage,
    isPrivate: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.POST,
    component: SinglePostPage,
    isPrivate: true,
  },
  {
    path: ROUTE_PATHS.EDIT_POST,
    component: EditPostForm,
    isPrivate: true,
  },
  {
    path: ROUTE_PATHS.USERS,
    component: UsersList,
    isPrivate: true,
  },
  {
    path: ROUTE_PATHS.USER,
    component: UserPage,
    isPrivate: true,
  },
];

export default routes;
