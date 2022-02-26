import {
  AddPostForm,
  PostsList,
} from 'app/features/posts/PostsPage/components';
import { Helmet } from 'react-helmet-async';

const PostsPage = () => {
  return (
    <>
      <Helmet>
        <title>Posts Page</title>
        <meta name='description' content='PostsPage' />
      </Helmet>
      <AddPostForm />
      <PostsList />
    </>
  );
};

export default PostsPage;
