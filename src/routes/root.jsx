import React from 'react';
import { Outlet, useNavigation, Link } from 'react-router-dom';
import Left from '../components/Left';

const Root = () => {
  const navigation = useNavigation();
  return (
    <div
      // TODO: add slide left for outlet
      className={`flex flex-col w-full h-full leading-6 font-myown md:flex-row `}
    >
      <Left />
      {/* title for mobile */}
      <h1
        id='title'
        className='before:content-[url("../../log_10.jpg")] before:w-5 before:h-3 before:scale-[0.4]  before:mr-10 before:mt-[-15px] order-1 border-t-[1px] md:hidden  flex justify-center items-center border-t-slate-200 pt-6 pb-10 px-8 text-xl font-semibold mt-5 tracking-wider text-[var(--base-color)] hover:text-blue-500 duration-300 dark:bg-slate-500'
      >
        <Link to='/'>Team Management</Link>
      </h1>
      {/* outlet */}
      <div
        id='right-panel'
        className={`${
          navigation.state === 'loading'
            ? 'flex-1 md:px-16 px-4 py-8 w-full opacity-25 duration-300'
            : 'flex-1 md:px-16 px-4  py-8 w-full'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
