import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/action';
import { Dropdown } from 'components';

const Component = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isNavbarExpanded } = useSelector((state) => state.session);
  const [showdropdown, setShowdropdown] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  return (
    <>
      <nav className="py-4 pr-4 pl-10 fixed bg-secondary duration-700 left-0 top-0 w-full z-10">
        <div className="flex">
          <div
            className={`transition-all duration-300 ${isNavbarExpanded ? 'w-52' : 'w-12'}`}
          ></div>
          <div className="brandsection shrink-0">
            <div className="flex items-center gap-4">
              <div className="">
                <img src="/images/small_logo.png" className="rounded-full w-8" alt="Avatar" />
              </div>
              <div className="grow hidden md:block">
                <a onClick={() => router.push('/')}>
                  <p className="text-2xl font-bold text-white cursor-pointer">Taste of Persia</p>{' '}
                </a>
              </div>
            </div>
          </div>

          <div className="grow justify-right mx-1 duration-300 ml-16">
            <ul className="flex justify-between">
              <li className="grow-0"></li>
              <li className="flex justify-end gap-2">
                {/*<div className="w-fit self-center text-white">
                  <MdNotifications size={25} />
                </div>*/}
                <div className="w-fit" onClick={() => setShowdropdown(!showdropdown)}>
                  <img
                    src="/images/avatar.png"
                    className="cursor-pointer rounded-full w-8 hover:border border-primary duration-75"
                    alt="Avatar"
                  />
                </div>
              </li>
            </ul>

            <Dropdown showDropdown={showdropdown} list={[]}>
              <button
                type="button"
                className="block w-full text-left px-4 py-2 text-sm font-semibold text-secondary hover:bg-primarylight"
                onClick={() => onLogout()}
              >
                Sign out
              </button>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Component;
