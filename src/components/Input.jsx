import React from 'react';

const Input = ({
  type,
  name,
  placeholder,
  defaultValue,
  id,
  extra,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`flex-grow-[2] border h-12 rounded-e-lg px-2 shadow-sm  hover:border-slate-400 duration-200 ${extra}`}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default Input;
