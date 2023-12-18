import React from 'react';
import Image from 'next/image';
import { SpoonIcon, Button, ButtonSecondary } from 'components';
import { MdOutlineFoodBank } from 'react-icons/md';

import classNames from 'classnames';
import Config from 'config';
import { useRouter } from 'next/router';

const Section = ({ _this }) => {
  const router = useRouter();

  const CatIcon = {
    ALL: '/images/category/all.png',
    APPETIZERS: '/images/category/appetizer.png',
    SOUPS: '/images/category/soup.png',
    'KABOB PLATES': '/images/category/kabob.png',
    'TRADITIONAL MEAL PLATES': '/images/category/traditional.png',
    'MEAL PLATTERS': '/images/category/meal.png',
    'KIDS MEAL': '/images/category/kids.png',
    DRINKS: '/images/category/drinks.png',
    SIDES: '/images/category/sides.png',
    DESSERTS: '/images/category/desserts.png'
  };

  return (
    <div className="bg-[#101010] py-20 px-3 md:px-16 pb-4" id="menu">
      <h4 className="font-montez sm:text-6xl text-4xl text-primarylight tracking-wide text-center">
        Today's Menu
      </h4>
      <div className="flex justify-center items-center">
        <div className="flex relative w-[22em] justify-center items-center">
          <span className="hr-double-left after:bg-primarylight before:bg-primarylight"></span>
          <SpoonIcon color="yellow" className="w-[3em] h-[3em] relative top-2" />
          <span className="hr-double-right after:bg-primarylight before:bg-primarylight"></span>
        </div>
      </div>

      {/* MENU Category */}
      <div className="flex flex-row flex-wrap justify-evenly items-center my-4 max-w-7xl m-auto">
        <div
          onClick={() => _this.setSelectedCategory('')}
          className={`cursor-pointer py-5 px-8 ${
            _this.selectedCategory == '' ? 'bg-black' : 'bg-primary'
          } hover:bg-black flex items-center flex-row gap-5 rounded transition m-3`}
        >
          <img className="h-8 w-8 invert-[75%]" src={CatIcon.ALL} alt="icon" />
          <h4 className="font-suranna text-lg text-red-200">All</h4>
        </div>
        {_this.categories?.map((item, index) => {
          return (
            <div
              onClick={() => _this.setSelectedCategory(item._id)}
              key={index}
              className={`cursor-pointer py-5 px-8 ${
                _this.selectedCategory == item._id ? 'bg-black' : 'bg-primary'
              } hover:bg-black flex items-center flex-row gap-5 rounded transition m-3`}
            >
              <img className="h-8 w-8 invert-[75%]" src={CatIcon[`${item.name}`]} alt="icon" />
              <h4 className="font-suranna text-lg text-red-200">{item.name}</h4>
            </div>
          );
        })}
      </div>

      {/* MENU Items */}
      <div className="flex flex-row flex-wrap justify-between items-stretch my-4 gap-5 mb-12">
        {_this.menus?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex xs:flex-col xs:w-[95%] xs:min-h-[28rem] mx-auto w-11/12 items-stretch lg:w-[450px] xl:w-[500px] sm:h-[220px] bg-primary rounded-lg p-1"
            >
              <img
                className="xs:w-full xs:h-[200px] w-1/3 aspect-square object-cover rounded-lg"
                src={Config.STORAGE_URL + item.image}
                alt={item.name}
              />
              <div className="relative xs:p-2 xs:mt-3 p-5 flex-grow">
                <h4 className="text-2xl text-red-300">{item.name}</h4>
                <p className="text-base text-gray-300 my-3">{item.description}</p>
                <div className="absolute bottom-1 flex items-center justify-between w-11/12">
                  <h5 className="text-lg text-red-300">$ {item.price}</h5>
                  <button className="ml-6 px-5 py-1.5 rounded text-white bg-red-800 font-medium text-base cursor-pointer hover:bg-red-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="flex justify-center mt-20">
        <ButtonSecondary label="Proceed To Checkout" onClick={() => router.push('/user/cart')} />
      </div> */}
    </div>
  );
};

export default Section;
