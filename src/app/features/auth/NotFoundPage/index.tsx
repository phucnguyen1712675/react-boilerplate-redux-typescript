import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from 'routes';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 Page not found</title>
        <meta name='description' content='Page not found' />
      </Helmet>
      <div>Not Found Page</div>
      <Link to={ROUTE_PATHS.HOME}>Go to Home</Link>
    </>
  );
};

export default NotFoundPage;
