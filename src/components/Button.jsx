import React, { Children } from 'react';

const Button = ({ type, handleClick, children, extra }) => {
  return (
    <button
      type={type}
      className={`h-8 border rounded-e-lg px-2 text-blue-500 font-semibold shadow-sm hover:text-yellow-300 hover:bg-[var(--base-color)] duration-200 transition-colors ${extra} font-open-sans`}
      onClick={handleClick}
    >
      {children}{' '}
    </button>
  );
};

export default Button;

// flex-grow-[2]
