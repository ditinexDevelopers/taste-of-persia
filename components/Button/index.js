import React from 'react';
const Component = ({ label = '', className = 'text-lg px-2 py-1', ...props }) => {
  return (
    <div
      className={
        'cursor-pointer text-white bg-primary rounded-lg uppercase border-2 border-primarylight hover:bg-transparent transition-all duration-500 ' +
        className
      }
      {...props}
    >
      {label}
    </div>
  );
};

export default Component;
