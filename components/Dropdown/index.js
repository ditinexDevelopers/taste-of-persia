import React from 'react';
import PropTypes from 'prop-types';

const Component = ({ showDropdown, list, children }) => {
  return (
    <>
      <div
        className={`origin-top-right absolute right-2 mt-2 w-fit rounded-md shadow-md shadow-secondary bg-white ring-1 ring-black 
              ring-opacity-5 focus:outline-none transition duration-300 z-50 ${
                showDropdown ? 'scale-100' : 'scale-0'
              }`}
      >
        <div className="py-1">
          <div>
            {list.map((item, index) => (
              <a
                href="#"
                key={index}
                className="block px-4 py-2 text-sm font-semibold text-secondary hover:bg-primarylight"
              >
                {item}
              </a>
            ))}
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  showDropdown: PropTypes.bool,
  list: PropTypes.array
};

export default Component;
