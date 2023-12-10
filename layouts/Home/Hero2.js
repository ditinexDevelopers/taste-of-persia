import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Styles from '../../styles/Home.module.css';

const Section = ({ _this }) => {
  return (
    <div className={`${Styles.sevice_bg} relative h-[680px] sm:h-[480px]`}>
      <div className="absolute left-0 top-0 h-[480px] p-5 sm:pt-28 pt-14 w-full">
        <div className="flex flex-col justify-center sm:flex-row items-center sm:justify-around">
          <img src="/images/hero.png" className="h-52 md:h-72 animate-spin-slow" alt="kabab" />
          <div className="mt-10 sm:mt-0 xs:p-6 sm:p-9 p-14 bg-primary rounded flex items-stretch gap-4 flex-col w-11/12 sm:w-[400px] md:w-[500px]">
            <p className="text-sm text-lightgray text-center">CALL FOR RESERVATIONS</p>
            <h3 className="text-4xl text-red-400 tracking-wide font-montez text-center">
              Opening Hours
            </h3>
            <div className="h-[0.7px] my-3 bg-red-200" />
            <div className="flex items-stretch justify-evenly xs:flex-col">
              <div className="flex flex-col gap-3">
                <h3 className="text-lightgray tracking-wide">Monday</h3>
                <p className="text-3xl text-red-400 font-montez">Closed</p>
              </div>
              <div className="xs:mt-5 flex flex-col gap-3">
                <h3 className="text-lightgray tracking-wide">Tuesday to Sunday</h3>
                <p className="text-3xl text-red-400 font-montez">12 PM</p>
                <p className="text-3xl text-red-400 font-montez">9 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
