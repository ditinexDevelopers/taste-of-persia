import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, ButtonSecondary } from 'components';
import styles from 'styles/Header.module.css';
import { useRouter } from 'next/router';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Image from 'next/image';

const Component = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const [navStyle, setNavStyle] = useState(styles.headerBgScroll);
  const [mobileMenu, setMobileMenu] = useState('h-0');
  const { cart } = useSelector((state) => state.cart);
  const { userSession } = useSelector((state) => state.session);

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  const listenScrollEvent = (e) => {
    if (window.scrollY > 50) setNavStyle(styles.headerBgScroll + ' ' + styles.headerBgBlack);
    else setNavStyle(styles.headerBgScroll);
  };

  const menuClassName =
    'text-white hover:text-primarylight text-base uppercase cursor-pointer transition-all duration-700';
  const menuActiveClassName = menuClassName + ' text-primarylight';
  const liClassName = 'sm:float-left px-6 py-1';
  return (
    <header>
      <div className={navStyle}>
        <div className="flex flex-row justify-between max-w-6xl m-auto min-h-[80px] items-center sm:px-0 px-2">
          <Link href={'/'}>
            <img
              src="/images/small_logo.png"
              className="cursor-pointer rounded-lg h-16 w-24"
              alt="logo"
            />
          </Link>

          <div
            className="float-left py-1 sm:hidden block cursor-pointer"
            onClick={() => setMobileMenu(mobileMenu == 'h-0' ? 'h-auto' : 'h-0')}
          >
            <FaBars className="text-primarylight text-4xl" />
          </div>
          <div
            className={classNames(
              'sm:static absolute overflow-hidden top-20 left-0 sm:bg-transparent bg-black sm:w-auto w-full transition-all duration-500 sm:h-auto z-50',
              mobileMenu
            )}
          >
            <ul onClick={() => setMobileMenu('h-0')}>
              <li className={liClassName + ' sm:px-0 pr-6 sm:pr-6'}>
                <Link href="/">
                  <span className={currentRoute === '/' ? menuActiveClassName : menuClassName}>
                    Home
                  </span>
                </Link>
              </li>
              <li className={liClassName}>
                <Link href="/?#menu">
                  <span className={menuClassName}>Menu</span>
                </Link>
              </li>
              <li className={liClassName}>
                <Link href="/about-us">
                  <span
                    className={currentRoute === '/about-us' ? menuActiveClassName : menuClassName}
                  >
                    About Us
                  </span>
                </Link>
              </li>
              <li className={liClassName}>
                <Link href="/contact-us">
                  <span
                    className={currentRoute === '/contact-us' ? menuActiveClassName : menuClassName}
                  >
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className="flex items-center">
            <div className="relative">
              <span className="h-6 w-6 text-center rounded-full text-white bg-red-700 absolute overflow-hidden ml-8 mt-[-12px]">
                {cart.length}
              </span>
              <FaShoppingCart
                className=" fill-buttonbg h-10 w-12 mr-10 hover:fill-primarylight cursor-pointer"
                onClick={() => router.push('/user/cart')}
              />
            </div>

            {userSession === null ? (
              <ButtonSecondary onClick={() => router.push('/user/login')} label="Login" />
            ) : (
              <ButtonSecondary onClick={() => router.push('/user/dashboard')} label="My Account" />
            )}
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Component;
