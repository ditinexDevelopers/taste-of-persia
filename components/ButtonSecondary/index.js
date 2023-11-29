import React from 'react';
import classNames from 'classnames';

const Component = ({ label = '', className = 'text-center', ...props }) => {
  return (
    <div
      className={classNames(
        'cursor-pointer bg-secondary text-primarylight rounded-sm shadow-md transition-all duration-300 tracking-wider uppercase px-6 py-2 text-lg hover:bg-secondaryhover',
        className
      )}
      {...props}
    >
      {label}
    </div>
  );
};

export default Component;
