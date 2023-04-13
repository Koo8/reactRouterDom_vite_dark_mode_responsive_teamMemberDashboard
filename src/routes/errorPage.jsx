import React from 'react';
import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';
import Button from '../components/Button';

const ErrorPage = () => {
  const error = useRouteError();
  // if (isRouteErrorResponse(error)) {
  return (
    <div className='h-full w-full text-center py-10 flex flex-col gap-5 bg-blue-200'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to='/'>
        <Button type='button'>Go to Home page</Button>
      </Link>
    </div>
  );
  // } else {
  //   return <p>Some errors other than Route Error occured</p>;
  // }
};

export default ErrorPage;
