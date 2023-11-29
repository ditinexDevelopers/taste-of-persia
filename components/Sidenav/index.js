import React from 'react';
import { useRouter } from 'next/router';
import {
  MdAnalytics,
  MdViewList,
  MdLayers,
  MdChevronRight,
  MdDashboardCustomize
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { navbarToggle } from 'redux/action';

const Component = () => {
  const router = useRouter();
  const { isNavbarExpanded } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`p-3 text-white bg-secondary transition-all duration-300 fixed z-20 ${
          isNavbarExpanded ? 'w-52' : 'w-12'
        } h-full`}
      >
        <div className="absolute top-3 -right-5">
          <div className="rounded-full p-1 bg-white border-2 border-secondary hover:scale-110 duration-200">
            {isNavbarExpanded ? (
              <MdChevronRight
                className="shrink-0 leading-6 text-secondary duration-300 rotate-180"
                size={25}
                onClick={() => dispatch(navbarToggle(false))}
              />
            ) : (
              <MdChevronRight
                className="shrink-0 leading-6 text-secondary duration-300"
                size={25}
                onClick={() => dispatch(navbarToggle(true))}
              />
            )}
          </div>
        </div>

        <div className="menulist mt-12">
          <MenuItem
            label={'Dashboard'}
            expanded={isNavbarExpanded}
            Icon={MdDashboardCustomize}
            clickAction={() => router.push('/admin/dashboard')}
          />
          <MenuItem
            label={'Orders'}
            expanded={isNavbarExpanded}
            Icon={MdViewList}
            clickAction={() => router.push('/admin/orders')}
          />
          <MenuItem
            label={'Menu Items'}
            expanded={isNavbarExpanded}
            Icon={MdLayers}
            clickAction={() => router.push('/admin/menus')}
          />
          {/*<MenuItem
              label={'Analytics'}
              expanded={isNavbarExpanded}
              Icon={MdAnalytics}
              clickAction={() => router.push('/admin/analytics')}
            />*/}
        </div>
      </div>
    </>
  );
};

export default Component;

const MenuItem = ({ label, expanded, Icon, clickAction }) => {
  return (
    <div className="flex h-8 items-center rounded-md py-1 cursor-pointer group mb-4">
      <Icon
        className="shrink-0 leading-6 group-hover:text-body-linkhovercolor duration-200"
        data-bs-toggle="tooltip"
        title="Orders"
        size={20}
        onClick={clickAction}
      />
      <div className="flex justify-between w-full items-center">
        {expanded ? (
          <a
            className="text-sm transition-opacity tracking-wide font-bold ml-4 group-hover:text-body-linkhovercolor duration-200 active:text-primary-dark"
            onClick={clickAction}
          >
            {label}
          </a>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
