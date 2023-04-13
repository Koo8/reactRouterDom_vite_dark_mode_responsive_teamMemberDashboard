import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Left from '../components/Left';

const Root = () => {
  const navigation = useNavigation();
  return (
    <div
      // className='grid grid-cols-[1fr,1fr] md:grid-cols-[1fr,3fr] mx-auto px-4 md:px-1 pt-2'
      className='flex w-full h-full leading-6 font-sans'
    >
      <Left />
      {/* TODO: w-full may not needed */}
      <div
        id='right-panel'
        className={`${
          navigation.state === 'loading'
            ? 'flex-1 px-16 py-8 w-full opacity-25 duration-300'
            : 'flex-1 px-16 py-8 w-full'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
