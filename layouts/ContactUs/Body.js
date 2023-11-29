import React, { useState, useEffect } from 'react';
import { SpoonIcon } from 'components';
import Image from 'next/image';

const Section = ({ _this }) => {
  return (
    <div>
      <div className="relative bg-home-bg fullbgsize bg-no-repeat bg-top sm:min-h-[67vh] min-h-[400px] min-w-full">
        <div className="absolute w-full h-full flex justify-center items-center flex-col z-10">
          <h3 className="font-suranna sm:text-6xl text-4xl text-white uppercase">Contact us</h3>
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
          <div className="grid lg:grid-cols-3 md:grid-cols-1 my-20">
            <div className=" flex items-center justify-around flex-col lg:flex-row mb-6 rounded-md border border-gray-300 p-2 mx-4 w-62 bg-white sm:bg-transparent transform transition duration-500 hover:scale-110">
              <div className="py-5 mb-2">
                <img src="images/contact1.png" alt="" />
              </div>
              <div className="50">
                <h5 className=" font-bold m-2 text-secondary text-2xl text-center">Give A Call</h5>
                <p className="text-sm m-2.5 text-[#2a435d] text-center">208-377-7900</p>
              </div>
            </div>

            <div className=" flex items-center justify-around flex-col lg:flex-row mb-6 rounded-md border border-gray-300 p-2 mx-4 w-62 bg-white sm:bg-transparent transform transition duration-500 hover:scale-110">
              <div className="py-5 mb-2">
                <img src="images/contact2.png" alt="" />
              </div>
              <div className="50">
                <h5 className=" font-bold m-2 text-secondary text-2xl text-center">
                  Get Direction
                </h5>
                <p className="text-sm m-2.5 text-[#2a435d] text-center">
                  6555 W Overland Rd Unit 110,
                  <br />
                  Boise, ID 83709
                </p>
              </div>
            </div>

            <div className=" flex items-center justify-around flex-col lg:flex-row mb-6 rounded-md border border-gray-300 p-2 mx-4 w-62 bg-white sm:bg-transparent transform transition duration-500 hover:scale-110">
              <div className="py-5 mb-2">
                <img src="images/about2.png" alt="" />
              </div>
              <div className="w-50">
                <h5 className=" font-bold m-2 text-secondary text-2xl text-center">
                  Opening Hours
                </h5>
                <p className="text-sm m-2.5 text-[#2a435d] text-center">
                  Monday : 11AM - 9PM <br />
                  Tuesday : Closed
                  <br /> Wed - Sat : 11AM - 9PM
                  <br /> Sunday : 12PM - 8PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;
