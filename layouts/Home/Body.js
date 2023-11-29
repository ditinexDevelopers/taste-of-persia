import React, { useState, useEffect } from 'react';
import { SpoonIcon, Button } from 'components';
import Hero from './Hero';
import Hero2 from './Hero2';
import Menu from './Menu';
import Link from 'next/link';
import CheckoutButton from './CheckoutButton';
import { SiDoordash } from 'react-icons/si';

const Section = ({ _this }) => {
  return (
    <>
      <CheckoutButton _this={_this} />
      <div className="relative bg-home-bg fullbgsize bg-no-repeat bg-center sm:min-h-screen min-h-[500px] min-w-full">
        <div className="sm:block hidden absolute w-full h-full bg-home-bg-overlay fullbgsize bg-no-repeat bg-center z-0"></div>
        <div className="absolute w-full h-full flex justify-center items-center flex-col z-10">
          <h4 className="font-montez sm:text-5xl text-2xl text-primarylight mb-2 text-center">
            Middle Eastern & Mediterranean
          </h4>
          <h3 className="font-suranna sm:text-6xl text-2xl text-white uppercase text-center">
            The &nbsp; Goodness &nbsp; Land
          </h3>
          <div className="flex relative w-[22em] justify-center items-center mt-8">
            <span className="hr-double-left"></span>
            <SpoonIcon className="w-[3em] h-[3em] relative top-2" />
            <span className="hr-double-right"></span>
          </div>
          <div className="flex flex-col gap-10 justify-center items-center mt-12">
            <Link href="/?#menu">
              <Button label="ORDER NOW" className="text-xl px-8 py-4" />
            </Link>
            <h3 className="font-suranna sm:text-6xl text-2xl text-white uppercase text-center">
              OR
            </h3>
            <a
              href="https://order.online/store/the-goodness-land-boise-24999993/?hideModal=true&pickup=true"
              target="_blank"
            >
              <button className="text-2xl tracking-widest font-bold text-[#ea580c] hover:text-[#c2410c] px-8 py-4 flex gap-2">
                <SiDoordash size={30} />
                DOORDASH
              </button>
            </a>
          </div>
        </div>
      </div>
      <Hero />
      <Menu _this={_this} />
      <Hero2 />
    </>
  );
};

export default Section;
