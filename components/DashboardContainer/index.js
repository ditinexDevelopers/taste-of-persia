import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Sidenav, Topbar } from 'components';

const Component = ({ children }) => {
  const { isNavbarExpanded } = useSelector((state) => state.session);

  return (
    <>
      <div className="flex bg-gray-100 min-h-screen">
        <div
          className={`bg-gray-400 transition-all duration-300 flex-none ${
            isNavbarExpanded ? 'w-52' : 'w-12'
          }`}
        >
          <Sidenav />
        </div>
        <div className="flex-auto ease-in-out transition-all duration-300 overflow-hidden">
          <Topbar />
          <div className="pt-16 pb-6 pr-8 pl-8">{children}</div>
        </div>
      </div>
    </>
  );
};

Component.propTypes = {
  children: PropTypes.node
};

export default Component;
