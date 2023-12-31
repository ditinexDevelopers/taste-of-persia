import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Section = ({ _this }) => {
  return (
    <div className="bg-primary sm:flex block flex-row md:mx-5 rounded-lg p-1">
      <div className="sm:basis-1/2 sm:py-5 py-2 px-5">
        <div className="sm:h-full h-72 w-full flex justify-center items-center">
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Middle Eastern Food"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className="flex sm:basis-1/2 items-center justify-center">
        <div className="sm:py-10 py-8 sm:px-0 px-4 max-w-lg">
          <h4 className="tracking-wider font-montez sm:text-5xl text-4xl text-primarylight sm:text-left text-center">
            Fresh Taste at a Great Price, only for Hungry People.
          </h4>
          <p className="text-lightgray mt-8 text-lg sm:text-left text-center">
            Taste of Persia is a restaurant well known for their famous recipes. You can order your
            favourite food and pickup when order is ready.{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
