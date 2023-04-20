import React, { useEffect } from 'react';
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { createNewContact, getContacts } from '../utility';
import Contact from './Contact';
import Input from './Input';
import Button from './Button';

import useTheme from '../useTheme';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

// for Get request, get query thru new URL(request.url).searchParams.get('q'), q is the 'name' of the search input field
export async function loader({ request }) {
  // request has a url property
  const url = new URL(request.url);
  // url has searchParams key value pairs
  const query = url.searchParams.get('search');
  const contacts = await getContacts(query);
  return { contacts, query };
}

export async function action({ request }) {
  // console.log(`adding new contact..`);
  const contact = await createNewContact();
  const id = contact.id;
  return redirect(`contact/${id}/edit`);
}

const Left = () => {
  const { contacts, query } = useLoaderData();
  const navigation = useNavigation(); // loading indicator
  const submit = useSubmit(); // to force a submit on a form without a button click
  const { theme, toggleTheme } = useTheme();

  // for search spinning
  const isSearching = navigation.location;
  // &&
  // new URLSearchParams(navigation.location.search).has('search');

  return (
    <div
      className='md:w-96 w-full md:h-full  bg-slate-100 border-r-2 flex flex-col box-content dark:text-zinc-200 dark:bg-slate-500'
      id='left-sidebar'
    >
      <h1
        id='title'
        className='before:content-[url("../../log_10.jpg")] before:w-5 before:h-3 before:scale-[0.4]  before:mr-10 before:mt-[-15px] order-1 border-t-[1px] md:flex  hidden justify-center items-center border-t-slate-200 pt-6 pb-10 px-8 text-xl font-semibold mt-5 tracking-wider text-[var(--base-color)] hover:text-blue-500 duration-300'
      >
        <Link to='/'>Team Management</Link>
      </h1>
      <div
        id='search-and-new'
        className=' flex gap-2 items-center md:justify-between justify-around px-3 border-b-slate-200 border-b-[1px] py-3 '
      >
        {/* Search Form is a GET, it has request.url.searchParams as request data.  no action needed */}
        <Form id='search-form' className='relative '>
          {/* Search Icon */}
          {/* the following two div work together to create the search icon at front of the input field */}
          <div
            className='w-3 h-3 border-[color:var(--base-color)] border-[3px] rounded-full absolute top-[20px] left-2'
            hidden={isSearching}
          ></div>
          <div
            className='w-2 border-[2px] border-[color:var(--base-color)] absolute top-[30px] left-4 rotate-45 rounded-e-md bg-slate-400'
            hidden={isSearching}
          ></div>
          <Input
            type='search'
            name='search'
            id='serach'
            extra='pl-8 outline-none'
            placeholder='search'
            defaultValue={query}
            className='dark:bg-slate-700'
            onChange={(e) => {
              // submit(e.currentTarget.form);// every change will be submitted and updated immediately
              // submit(e.currentTarget.form, { replace: true }); // replace: true, will not
              submit(e.currentTarget.form, { replace: !(query === null) }); //https://www.jsdocs.io/package/react-router-dom#SubmitOptions
            }}
          />
          {/* This is spinning image */}
          <svg
            className='border-[color:var(--base-color)] border-4 rounded-full border-l-0 border-r-0 w-3 h-3 absolute top-[18px] left-2 animate-spin duration-100'
            hidden={!isSearching}
          ></svg>
        </Form>
        {/* Add new Form is a post method, needs action*/}
        <Form method='post'>
          <Button type='submit' extra='text-red-300'>
            New
          </Button>
        </Form>
        {/* toggle dark/light mode */}
        <div>
          {/* {console.log(`theme in left is ${theme}`)} */}
          {theme === 'dark' ? (
            <MdDarkMode className='text-slate-200' onClick={toggleTheme} />
          ) : (
            <MdOutlineLightMode
              onClick={toggleTheme}
              className='text-slate-900'
            />
          )}
        </div>
      </div>
      {/* use RRD's loader to pass the contacts data instead of useContext from React */}
      {/* Contacts list display  */}
      <div id='list-contact' className='md:flex-1 h-48 md:h-auto overflow-auto'>
        {contacts.length ? (
          <ul className='pt-4 px-4 overflow-auto'>
            {contacts.map((item) => {
              return (
                <li key={item.id} className='my-1'>
                  <Contact item={item} className='w-auto' />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className='pt-4 px-4 text-start font-light'>
            <strong className='text-orange-500'>Oops!</strong>
            <br /> No member matches your search term "{query}".
            <br /> Please try again.
          </p>
        )}
      </div>
      {/*  */}
    </div>
  );
};

export default Left;
