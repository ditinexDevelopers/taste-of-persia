import React, { useState, useEffect } from 'react';
import { SpoonIcon, Button } from 'components';
import { SiDoordash } from 'react-icons/si';
import Hero from './Hero';
import Hero2 from './Hero2';
import Menu from './Menu';
import Link from 'next/link';
import CheckoutButton from './CheckoutButton';
import MenuOptionsModal from './MenuOptionsModal';

const Section = ({ _this }) => {
  return (
    <div className="bg-[#101010]">
      <CheckoutButton _this={_this} />
      <div className="sm:mt-6 relative bg-home-bg bg-cover bg-no-repeat bg-center sm:min-h-screen min-h-[500px] min-w-full">
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
          <h3 className="font-suranna tracking-wide sm:text-4xl text-2xl text-white uppercase">
            OR
          </h3>
          <a
            href="https://www.doordash.com/store/taste-of-persia-boise-28655340/?event_type=autocomplete&pickup=false"
            target="_blank"
          >
            <button className="text-2xl tracking-widest font-bold text-[#ea580c] hover:text-[#c2410c] flex gap-2">
              <SiDoordash size={30} />
              DOORDASH
            </button>
          </a>
        </div>
      </div>
      <Hero />
      <Menu _this={_this} />
      <Hero2 _this={_this} />
      <MenuOptionsModal _this={_this} />
    </div>
  );
};

export default Section;
