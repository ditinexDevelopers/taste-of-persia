import React from 'react';
import Image from 'next/image';
import { SpoonIcon, Button, ButtonSecondary } from 'components';
import classNames from 'classnames';
import Config from 'config';
import { useRouter } from 'next/router';

const Section = ({ _this }) => {
  const router = useRouter();

  const menus = [
    {
      img: require('public/images/hero_bak.png'),
      name: 'Bolani',
      description: `Fried flatbread filled with your choice of veggie,
      potato, or butter squash with a side of chutney
      (traditional spicy sauce)`,
      price: '9.99'
    },
    {
      img: require('public/images/hero_bak.png'),
      name: 'Shami Kabob',
      description: `Marinated mixed ground meat (beef & lamb) with basmati rice
      and house salad.`,
      price: '22.99'
    },
    {
      img: require('public/images/hero_bak.png'),
      name: 'Chicken Biryani',
      description: `Steamed basmati rice with marinated chicken and traditional
      Afghan hot spices. Only available on Friday, Saturday and Sunday`,
      price: '20.99'
    }
  ];

  return (
    <div className="py-4 mb-14" id="menu">
      <h4 className="font-montez sm:text-6xl text-4xl text-secondary tracking-wide text-center">
        Popular Menu
      </h4>
      <div className="flex justify-center items-center">
        <div className="flex relative w-[22em] justify-center items-center">
          <span className="hr-double-left after:bg-secondary before:bg-secondary"></span>
          <SpoonIcon color="#2a435d" className="w-[3em] h-[3em] relative top-2" />
          <span className="hr-double-right after:bg-secondary before:bg-secondary"></span>
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
      <div className="flex flex-row flex-wrap justify-center items-center my-4">
        {menus?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-between w-[250px] h-[380px] border-borderlight border rounded-md m-3 overflow-hidden"
            >
              <div className="flex flex-col justify-start items-center">
                <div className="bg-borderlight w-full p-1">
                  <div className="w-full h-[150px] relative rounded-md overflow-hidden m-auto">
                    <Image
                      // src={Config.STORAGE_URL + item.image}
                      src={item.img}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      objectPosition={'center'}
                    />
                  </div>
                </div>
                <h2 className="text-2xl text-secondary pt-3 pb-2 text-center">{item.name}</h2>
                <p className="text-sm text-secondarylight text-center px-2">{item.description}</p>
              </div>

              <div className="relative">
                <h5 className="absolute text-sm text-white font-bold bg-secondary border-2 border-white w-16 h-16 rounded-full flex justify-center items-center -top-8 right-2">
                  $ {item.price}
                </h5>

                <ButtonSecondary
                  className="rounded-none rounded-b-md"
                  label="ADD TO CART"
                  onClick={() => _this.addToCart(item)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-20">
        <ButtonSecondary label="Proceed To Checkout" onClick={() => router.push('/user/cart')} />
      </div>
    </div>
  );
};

export default Section;
