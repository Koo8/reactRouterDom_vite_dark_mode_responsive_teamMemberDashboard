import React from 'react';
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { updateContact } from '../utility';
import Button from '../components/Button';
import Input from '../components/Input';

export async function action({ request, params }) {
  const data = await request.formData();
  const update = Object.fromEntries(data); // the data is ['fn', 'ning'] format
  // console.log(update);
  await updateContact(update, params.contactId);
  return redirect(`/contact/${params.contactId}`);
}
const Edit = () => {
  const navigate = useNavigate();
  const { contact } = useLoaderData();
  return (
    <div>
      <Form method='post' className='flex flex-col gap-4 max-w-2xl'>
        {/* paragraph for fn and ln */}
        <label className='flex'>
          <span className='w-32'>Name</span>
          <div className='flex flex-1 gap-2'>
            <Input
              type='text'
              name='fn'
              placeholder='first name'
              defaultValue={contact.fn}
            />
            <Input
              type='text'
              name='ln'
              placeholder='last name'
              defaultValue={contact.ln}
            />
          </div>
        </label>
        <label className='flex'>
          <span className='w-32'>Twitter</span>
          <Input
            type='text'
            name='twitter'
            placeholder='@twitterHandler'
            defaultValue={contact.twitter}
          />
        </label>
        <label className='flex'>
          <span className='w-32'>Avatar</span>
          <Input
            type='text'
            name='avatar'
            placeholder='https://some.com/avatar.jpg'
            defaultValue={contact.avatar}
          />
        </label>
        <label className='flex'>
          <span className='w-32'>Notes</span>
          <textarea
            name='notes'
            id=''
            className='flex-grow-[2] h-28 border rounded-e-lg px-2 shadow-sm  hover:border-slate-400 duration-200 resize-none'
            defaultValue={contact.notes}
          ></textarea>
        </label>
        {/* buttons  */}
        <p className='ml-32 flex gap-2'>
          <Button type='submit'>Save</Button>
          {/* <button
            type='submit'
            className='flex-grow-[2] h-8 border rounded-e-lg px-2 text-cyan-700 font-semibold shadow-sm hover:text-white hover:bg-cyan-700 duration-200 transition-colors'
          >
            Save
          </button> */}
          <Button type='button' handleClick={() => navigate(-1)}>
            Cancel
          </Button>
          {/* <button
            type='button'
            className='flex-grow-[2] h-8 border rounded-e-lg px-2 text-slate-400 font-semibold shadow-sm hover:text-slate-200 hover:bg-cyan-100 duration-200 transition-colors'
            onClick={() => navigate(-1)}
          >
            Cancel
          </button> */}
        </p>
      </Form>
    </div>
  );
};

export default Edit;
