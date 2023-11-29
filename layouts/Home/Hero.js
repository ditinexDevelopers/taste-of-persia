import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Section = ({ _this }) => {
  return (
    <div className="bg-backgroundlight sm:flex block flex-row">
      <div className="sm:basis-1/2 sm:py-5 py-2 px-5">
        <div className="sm:h-full h-72 w-full flex justify-center items-center">
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full overflow-hidden boxshadow">
            <Image
              src="/images/hero.jpg"
              alt="Middle Eastern Food"
              layout="fill"
              objectFit="cover"
              objectPosition={'center'}
            />
          </div>
        </div>
      </div>
      <div className="flex sm:basis-1/2 items-center justify-center">
        <div className="sm:py-10 py-8 sm:px-0 px-4 max-w-lg">
          <h4 className="font-montez sm:text-6xl text-4xl text-primary tracking-wide sm:text-left text-center">
            Fresh Taste at a Great Price, only for{' '}
            <span className="text-secondary font-bold">Hungry People.</span>
          </h4>
          <p className="text-secondary mt-4 text-lg sm:text-left text-center">
            The Goodness Land is a restaurant located on a busy corner site in Farringdon's Exmouth
            Market. You can order your favourite food and pickup when order is ready.{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
