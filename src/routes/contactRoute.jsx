import React from 'react';
import {
  useLoaderData,
  Form,
  redirect,
  Link,
  useFetcher,
} from 'react-router-dom';
import {
  capFirstLetter,
  getContact,
  deleteContact,
  updateContact,
} from '../utility';
import Button from '../components/Button';

export async function loader({ params }) {
  // console.log('contact loading...');
  const id = params.contactId;
  const contact = await getContact(id);
  // console.log(contact.favorite);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return { contact };
}

export async function destroyAction({ params }) {
  // console.log('triggered destroy action.');
  // throw new Error('oh dang!');
  await deleteContact(params.contactId);
  return redirect('/');
}

export async function starAction({ request, params }) {
  // console.log('star clicked.');
  const data = await request.formData();
  const update = Object.fromEntries(data);
  // console.log(update.favorite);
  await updateContact(
    { favorite: update.favorite === 'true' },
    params.contactId
  );
  return null;
}

const ContactRoute = () => {
  const { contact } = useLoaderData();

  return (
    // <div className='w-full h-full flex justify-start'>
    <div
      id='contact-box'
      className='flex md:flex-row flex-col max-w-2xl gap-8 md:justify-start justify-center items-center'
    >
      <div className='overflow-hidden '>
        <img
          className='object-fill md:w-48 w-36 md:h-48 h-36 rounded-md p-2 md:border-r-[0.5px] border-b-[0.5px] md:border-b-0'
          src={contact.avatar || null}
          alt=''
        />
      </div>
      <div className='flex flex-col max-w-[400px] '>
        <div className='flex items-start mb-3'>
          {contact.fn || contact.ln ? (
            <h2 className='font-semibold md:text-3xl text-xl'>
              {capFirstLetter(contact.fn)} {capFirstLetter(contact.ln)}
            </h2>
          ) : (
            <h2>No Name</h2>
          )}
          <span className='ml-[20px]'>
            <Star contact={contact} />
          </span>
        </div>
        {contact.twitter && (
          <p className='flex items-baseline'>
            Twitter:{' '}
            <a
              href={`https://twitter.com/${contact.twitter}`}
              className='font-light text-3xl text-[color:var(--base-color)] hover:text-blue-500 hover:font-normal'
            >
              {contact.twitter}
            </a>
          </p>
        )}
        <p className='mb-3'>Notes: {contact.notes}</p>
        <div className='flex gap-4'>
          {/* <Form> */}
          <Link to='edit'>
            <Button type='submit'>Edit</Button>
          </Link>
          {/* </Form> */}
          {/* <Form> with action attr will go to the new url with /destroy only with method=post */}
          <Form
            action='destroy'
            method='post'
            onSubmit={(event) => {
              if (!confirm('Do you really want to delete this member?'))
                event.preventDefault();
            }}
          >
            <Button type='submit'>Delete</Button>
          </Form>
        </div>
      </div>
    </div>
    // </div>
  );
};

const Star = ({ contact }) => {
  // mutate data, so use Form; don't need navigation, use fetcher.Form
  const fetcher = useFetcher();
  // define a variable favorite
  let isFav = contact.favorite;
  // optimistic UI => grab formData for UI b4 action is updated
  if (fetcher.formData) {
    isFav = fetcher.formData.get('favorite') === 'true';
  }
  // console.log(`isFav from formData is ${isFav}`);

  return (
    <fetcher.Form method='post'>
      {' '}
      {/* the formData will go to 'request' of action when 'post'ed */}
      <button type='submit' name='favorite' value={isFav ? 'false' : 'true'}>
        {/* {console.log(`isFav inside button ${isFav}`)} */}
        {isFav ? (
          <div className='hover:-translate-y-[1px] duration-300 text-yellow-500 '>
            {'\u2605'}
          </div>
        ) : (
          <div className='bg-transparent hover:-translate-y-[1px] duration-300n hover:text-yellow-400'>
            {'\u2606'}
          </div>
        )}
      </button>
    </fetcher.Form>
  );
};

export default ContactRoute;
