import React from 'react';
import Image from 'next/image';
import Config from 'config';
import Switch from './Switch';
import classNames from 'classnames';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import EditMenuModal from './EditMenuModal';
import AddMenuModal from './AddMenuModal';

const Section = ({ _this }) => {
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
    <div className="bg-white shadow-dashboard-md p-4 mt-10 rounded-xl">
      <div className="relative bg-gradient-to-tr from-blue-500 to-blue-700 -mt-10 mb-4 rounded-xl text-white flex justify-between items-center w-full h-16 py-2 px-8 shadow-lg-blue text-2xl">
        Menu List
        <span
          onClick={() => _this.setAddMenuModalVisibility(true)}
          className="cursor-pointer flex items-center bg-toggle-btn-bg hover:bg-gray-700 rounded-full shadow py-2 px-4 transition"
        >
          <IoMdAddCircleOutline className="mr-2" size={20} />
          <p className="text-base">Add New Item</p>
        </span>
      </div>
      <div className="sm:flex items-center flex-wrap">
        <div
          onClick={() => _this.setSelectedCategory('')}
          className={`cursor-pointer py-5 px-8 ${
            _this.selectedCategory == '' ? 'bg-gray-700' : 'bg-primary'
          } hover:bg-black flex items-center flex-row gap-5 rounded transition m-3`}
        >
          <img className="h-8 w-8 invert-[75%]" src={CatIcon['ALL']} alt="icon" />
          <h4 className="font-suranna text-lg text-red-200">All</h4>
        </div>

        {_this.categories?.map((item, index) => {
          return (
            <div
              onClick={() => _this.setSelectedCategory(item._id)}
              key={index}
              className={`cursor-pointer py-5 px-8 ${
                _this.selectedCategory == item._id ? 'bg-gray-700' : 'bg-primary'
              } hover:bg-black flex items-center flex-row gap-5 rounded transition m-3`}
            >
              <img className="h-8 w-8 invert-[75%]" src={CatIcon[`${item.name}`]} alt="icon" />
              <h4 className="font-suranna text-lg text-red-200">{item.name}</h4>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-row gap-2 pb-2 px-1 text-secondary font-medium">
        <div className="sm:inline hidden w-1/5">Image</div>
        <div className="w-2/5">Name</div>
        <div className="flex flex-1 flex-col">Price</div>
        <div className="flex flex-1">Edit</div>
        <div className="flex text-left w-1/5 items-center">Status</div>
      </div>

      <div className="overflow-x-scroll lg:overflow-hidden">
        {_this.menus?.map((item, index) => {
          return (
            <div
              key={index}
              id="table-row"
              className="flex items-center flex-row gap-2 px-1 py-2 border-t border-[rgb(238,238,238)]"
            >
              <div className="w-1/5 sm:block hidden">
                <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden boxshadow border border-primary">
                  <Image
                    src={Config.STORAGE_URL + item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition={'center'}
                  />
                </div>
              </div>
              <div className="w-2/5">{item.name}</div>
              <div className="flex flex-1 flex-col">$ {item.price.toFixed(2)}</div>
              <div className="flex flex-1">
                <FaRegEdit
                  size={17}
                  fill="#495D6A"
                  cursor={'pointer'}
                  onClick={() => {
                    _this.setEditMenuModalVisibility(true),
                      _this.setEditMenuData((prev) => ({
                        ...prev,
                        id: item._id,
                        menuName: item.name,
                        menuDescription: item.description,
                        price: item.price,
                        currentPrice: item.price,
                        image: item.image,
                        image_data: '',
                        image_prev: ''
                      }));
                  }}
                />
              </div>
              <div className="text-left w-1/5 pt-1">
                <span
                  key={index}
                  onClick={() => _this.updateAvailability(item._id, !item.is_active)}
                  className="cursor-pointer inline-flex items-center bg-toggle-btn-bg rounded-full shadow py-1.5 px-4 text-white"
                >
                  {!item.is_active ? (
                    <BsToggle2Off size={22} className="mr-2" />
                  ) : (
                    <BsToggle2On className="mr-2" size={22} />
                  )}
                  <p className="text-sm ">{item.is_active ? 'Enabled' : 'Disabled'}</p>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <EditMenuModal _this={_this} />
      <AddMenuModal _this={_this} />
    </div>
  );
};

export default Section;
