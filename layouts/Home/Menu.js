import React from 'react';
import Image from 'next/image';
import { SpoonIcon, Button, ButtonSecondary } from 'components';
import {
  MdOutlineFastfood,
  MdOutlineFoodBank,
  MdOutlineSupervisedUserCircle
} from 'react-icons/md';

import classNames from 'classnames';
import Config from 'config';
import { useRouter } from 'next/router';

const Section = ({ _this }) => {
  const router = useRouter();

  const menus = [
    {
      img: '/images/bolani.jpg',
      name: 'Bolani',
      description: `Fried flatbread filled with your choice of veggie,
      potato, or butter squash with a side of chutney
      (traditional spicy sauce)`,
      price: '9.99'
    },
    {
      img: '/images/shami_kabab.webp',
      name: 'Shami Kabob',
      description: `Marinated mixed ground meat (beef & lamb) with basmati rice
      and house salad.`,
      price: '22.99'
    },
    {
      img: '/images/chicken_biryani.jpg',
      name: 'Chicken Biryani',
      description: `Steamed basmati rice with marinated chicken and traditional
      Afghan hot spices. Only available on Friday, Saturday and Sunday`,
      price: '20.99'
    },
    {
      img: '/images/mantu.jpeg',
      name: 'Mantu',
      description: `Steamed dumplings filled with ground beef and onions topped
      with chaka (traditional yogurt sauce), tomato sauce and
      sprinkled with dried mint.`,
      price: '20.99'
    }
  ];

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

      <div className="flex items-center justify-between py-5 flex-wrap">
        <div className="cursor-pointer py-5 px-8 bg-primary hover:bg-black flex items-stretch flex-col gap-5 w-40 md:w-60 rounded transition my-3">
          <MdOutlineFastfood className="text-red-400 text-4xl" />
          <h4 className="font-suranna text-xl text-red-200">Appetizers</h4>
        </div>
        <div className="cursor-pointer py-5 px-8 bg-primary hover:bg-black flex items-stretch flex-col gap-5 w-40  md:w-60 rounded transition my-3">
          <MdOutlineSupervisedUserCircle className="text-red-400 text-4xl" />
          <h4 className="font-suranna text-xl text-red-200">Kabob</h4>
        </div>
        <div className="cursor-pointer py-5 px-8 bg-primary hover:bg-black flex items-stretch flex-col gap-5 w-40 md:w-60 rounded transition my-3">
          <MdOutlineFoodBank className="text-red-400 text-4xl" />
          <h4 className="font-suranna text-xl text-red-200">Traditional</h4>
        </div>

        <div className="cursor-pointer py-5 px-8 bg-primary hover:bg-black flex items-stretch flex-col gap-5 w-40 md:w-60 rounded transition my-3">
          <MdOutlineFastfood className="text-red-400 text-4xl" />
          <h4 className="font-suranna text-xl text-red-200">Desserts</h4>
        </div>
      </div>

      {/* MENU Category */}
      {/* <div className="flex flex-row flex-wrap justify-center items-center my-4 max-w-7xl m-auto">
        <div
          onClick={() => _this.setSelectedCategory('')}
          className={classNames(
            _this.selectedCategory == ''
              ? 'text-primarylight bg-secondary'
              : 'text-secondary bg-transparent',
            'flex justify-center items-center w-40 h-24 border-borderlight border rounded-md m-3 cursor-pointer text-xl font-medium hover:text-primarylight hover:bg-secondary transition-all duration-300 font-suranna tracking-wider'
          )}
        >
          All
        </div>
        {_this.categories?.map((item, index) => {
          return (
            <div
              onClick={() => _this.setSelectedCategory(item._id)}
              key={index}
              className={classNames(
                item._id == _this.selectedCategory
                  ? 'text-primarylight bg-secondary'
                  : 'text-secondary bg-transparent',
                'flex justify-center items-center w-40 h-24 border-borderlight border rounded-md m-3 cursor-pointer text-xl font-medium hover:text-primarylight hover:bg-secondary transition-all duration-300 font-suranna tracking-wider'
              )}
            >
              {item.name}
            </div>
          );
        })}
      </div> */}
      {/* MENU Items */}
      <div className="flex flex-row flex-wrap justify-between items-stretch my-4 gap-5 mb-12">
        {menus?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex xs:flex-col xs:w-auto mx-auto w-11/12 items-stretch lg:w-[450px] sm:h-[200px] bg-primary rounded-lg p-1"
            >
              <img
                className="xs:w-full xs:h-[200px] w-1/3 aspect-square object-cover"
                src={item.img}
                alt={item.name}
              />
              <div className="xs:p-2 xs:mt-3 p-5">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-2xl text-red-300">{item.name}</h4>
                  <h5 className="text-lg text-red-300">$ {item.price}</h5>
                </div>
                <p className="text-base text-gray-300">{item.description}</p>
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
