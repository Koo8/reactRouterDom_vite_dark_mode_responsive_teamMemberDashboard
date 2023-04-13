import React from 'react';
import { NavLink } from 'react-router-dom';
import { capFirstLetter } from '../utility';

const Contact = ({ item }) => {
  let firstName, lastName;
  if (item.fn) {
    firstName = capFirstLetter(item.fn);
  }
  if (item.ln) {
    lastName = capFirstLetter(item.ln);
  }
  return (
    <NavLink
      to={`contact/${item.id}`}
      className={({ isActive }) =>
        isActive
          ? 'w-auto flex bg-blue-500 text-white flex-grow-[2] h-8 border rounded-e-lg font-semibold shadow-sm hover:text-yellow-300 hover:bg-[var(--base-color)] duration-200 transition-colors border-l-0 border-t-0 justify-between pt-1 px-2'
          : ' flex justify-between w-auto flex-grow-[2] h-8 border rounded-e-lg text-slate-400 font-semibold shadow-sm hover:text-yellow-300 hover:bg-[var(--base-color)] duration-200 transition-colors border-l-0 border-t-0 pt-1 px-2'
      }
    >
      <div>
        <span>{(item.fn && firstName) || 'No  '}</span>
        <span> </span>
        <span>{(item.ln && lastName) || 'Name'}</span>
      </div>
      <span className='pl-5 text-yellow-500'>
        {item.favorite ? '\u2605' : ''}
      </span>
    </NavLink>
  );
};

export default Contact;
