import React, { useState, useEffect } from 'react';
import { SpoonIcon } from 'components';
import Image from 'next/image';

const Section = ({ _this }) => {
  return (
    <div>
      <div className="relative bg-home-bg fullbgsize bg-no-repeat bg-top sm:min-h-[67vh] min-h-[400px] min-w-full">
        <div className="absolute w-full h-full flex justify-center items-center flex-col z-50">
          <h3 className="font-suranna sm:text-6xl text-4xl text-white uppercase">about us</h3>
          <div className="flex relative w-[22em] justify-center items-center mt-8">
            <span className="hr-double-left"></span>
            <SpoonIcon className="w-[3em] h-[3em] relative top-2" />
            <span className="hr-double-right"></span>
          </div>
        </div>
      </div>

      {/* 2nd item 4 boxes */}

      <section className="text-blackcenter bg-white sm:mx-24 flex justify-center">
        <div className="container">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 relative md:mt-[-64px]  ">
            <div className="mb-6 rounded-md shadow-lg shadow-slate-200 p-2 mx-4 w-62 bg-white  transform transition duration-1000 hover:translate-y-10">
              <div className="py-5 mb-8">
                <img src="images/about1.png" alt="" />
              </div>
              <h5 className=" font-bold m-2 text-secondary text-lg">Fresh food</h5>
              <p className="text-sm m-2.5 mb-8 text-[#2a435d]">Fresh organic food near you.</p>
            </div>

            <div className="mb-6 rounded-md shadow-xl shadow-slate-200 p-2 mx-4 w-62 bg-white  transform transition duration-1000 hover:translate-y-10">
              <div className="py-5 mb-8">
                <img src="images/about2.png" alt="" />
              </div>
              <h5 className=" font-bold m-2 text-secondary text-lg">100% Best Quality</h5>
              <p className="text-sm m-2.5 mb-8 text-[#2a435d]">We Provide Best Quality Food</p>
            </div>

            <div className="mb-6 rounded-md shadow-xl shadow-slate-200 p-2 mx-4 w-62 bg-white  transform transition duration-1000 hover:translate-y-10">
              <div className="py-5 mb-8">
                <img src="images/about3.png" alt="" />
              </div>
              <h5 className=" font-bold m-2 text-secondary text-lg">Money Back Guarantee</h5>
              <p className="text-sm m-2.5 mb-8 text-[#2a435d]">100% Money Back Guarantee</p>
            </div>

            <div className="mb-6 rounded-md shadow-xl shadow-slate-200 p-2 mx-4 w-62 bg-white  transform transition duration-1000 hover:translate-y-10">
              <div className="py-5 mb-8">
                <img src="images/about4.png" alt="" />
              </div>
              <h5 className=" font-bold m-2 text-secondary text-lg">Delicious Food Menu</h5>
              <p className="text-sm m-2.5 mb-8 text-[#2a435d]">Goodness Provides Best Food</p>
            </div>
          </div>
        </div>
      </section>

      {/* third item picture description */}

      <div className="bg-backgroundlight sm:flex block flex-row mt-20 pb-10">
        <div className="sm:basis-1/2 p-5">
          <div className="sm:h-full h-72 w-full flex justify-center items-center">
            <div className="relative w-[500px] h-[300px] rounded-lg overflow-hidden boxshadow">
              <Image
                src="/images/collage.jpg"
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
              The Goodness Land is a family owned business located at Overland Rd, Boise. We cook
              our food with love. You can order your favorite food and pickup when order is ready.{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
