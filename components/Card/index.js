import React from 'react';

const Component = ({ children = '', title = '', footer = '' }) => {
  return (
    <div className="flex flex-col w-full h-full falcon-boxshadow bg-white rounded-md overflow-hidden">
      <div className="rounded-t-md bg-titlebg text-left p-4 text-secondary text-xl">{title}</div>
      <div className="flex-1">{children}</div>
      {footer}
    </div>
  );
};

export default Component;
