import React, { useState, useEffect } from 'react';
import { SpoonIcon, Button } from 'components';
import Hero from './Hero';
import Hero2 from './Hero2';
import Menu from './Menu';
import Link from 'next/link';
import CheckoutButton from './CheckoutButton';

const Section = ({ _this }) => {
  return (
    <div className="bg-[#101010]">
      {/* <CheckoutButton _this={_this} /> */}
      <div className="relative bg-home-bg bg-cover bg-no-repeat bg-center sm:min-h-screen min-h-[500px] min-w-full">
        <div className="sm:pl-20 h-screen flex items-center sm:items-stretch gap-10 justify-center flex-col">
          <h4 className="tracking-wider font-montez sm:text-5xl text-2xl text-primarylight mb-2">
            Welcome to, Afgan Kitchen
          </h4>
          <h3 className="font-suranna sm:text-6xl text-2xl text-white uppercase ">
            Taste of Persia
          </h3>

          <Link href="/?#menu" className="bg-sky-500">
            <button className="w-44 sm:w-60 px-8 py-4 text-white bg-red-800 font-medium sm:text-lg cursor-pointer hover:bg-red-700 transition">
              Order Now
            </button>
          </Link>
        </div>
      </div>
      <Hero />
      <Menu _this={_this} />
      <Hero2 />
    </div>
  );
};

export default Section;
