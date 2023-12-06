import React, { useState, useEffect } from 'react';

const Section = ({ _this }) => {
  return (
    <div className="relative bg-hero-bg bg-no-repeat bg-center bg-cover h-[400px]">
      <div className="absolute bg-[rgba(0,0,0,0.6)] left-0 top-0 h-[400px] p-5 sm:pt-28 pt-14 w-full">
        <h4 className="tracking-wider font-montez sm:text-6xl text-4xl text-primarylight text-center mb-8">
          For your special day
        </h4>
        <h3 className="font-suranna sm:text-3xl text-xl text-white text-center capitalize tracking-wide mx-10 sm:mx-28">
          A Moments of Delicious On Right Time & Place
        </h3>
      </div>
    </div>
  );
};

export default Section;
