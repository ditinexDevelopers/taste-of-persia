import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { MdCancel } from 'react-icons/md';

const Component = ({
  modalVisibility,
  onClose,
  closeOnBackdropClick = true,
  children,
  width = 'lg:w-1/3 w-full'
}) => {
  const [display, setDisplay] = useState({ display: 'none' });

  useEffect(() => {
    if (modalVisibility) setDisplay({ display: 'flex' });
  }, [modalVisibility]);

  const onAnimationEnd = () => {
    if (!modalVisibility) setDisplay({ display: 'none' });
  };

  const onBackDropClick = (e) => {
    e.preventDefault();
    if (e.target == e.currentTarget && closeOnBackdropClick) onClose();
  };

  return (
    <div
      className={classNames(
        'flex justify-center items-center overflow-hidden overflow-y-auto fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full',
        modalVisibility == true ? 'fade-enter' : 'fade-leave'
      )}
      style={{ zIndex: 900, ...display }}
      onAnimationEnd={onAnimationEnd}
      onClick={onBackDropClick}
      id="parentshadow"
    >
      <div
        className={classNames(
          'relative mx-2 max-w-full border-0 rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none p-6',
          width
        )}
      >
        <span className="absolute top-1 right-1 cursor-pointer" onClick={onClose}>
          <MdCancel size={20} />
        </span>
        {children}
      </div>
    </div>
  );
};

export default Component;
