import React from 'react';
import Image from 'next/image';
import Config from 'config';
import Switch from './Switch';
import classNames from 'classnames';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import EditMenuPriceModal from './EditMenuPriceModal';

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
    <div className="bg-white shadow-dashboard-md rounded-xl">
      <div className="relative p-4 mt-10">
        <div className="relative bg-gradient-to-tr from-blue-500 to-blue-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-16 py-2 px-8 shadow-lg-blue text-2xl">
          Menu List
        </div>
        <div className="flex flex-row flex-wrap justify-evenly items-center my-4 max-w-7xl m-auto">
          <div
            onClick={() => _this.setSelectedCategory('')}
            className={`cursor-pointer py-2 px-3 sm:py-5 sm:px-8 ${
              _this.selectedCategory == '' ? 'bg-gray-700' : 'bg-primary'
            } hover:bg-black flex items-center flex-row gap-5 rounded transition m-3`}
          >
            <img className="h-8 w-8 invert-[75%]" src={CatIcon.ALL} alt="icon" />
            <h4 className="font-suranna text-sm sm:text-lg text-red-200">All</h4>
          </div>
          {_this.categories?.map((item, index) => {
            return (
              <div
                onClick={() => _this.setSelectedCategory(item._id)}
                key={index}
                className={`cursor-pointer py-2 px-3 sm:py-5 sm:px-8 ${
                  _this.selectedCategory == item._id ? 'bg-gray-700' : 'bg-primary'
                } hover:bg-black flex items-center flex-row gap-5 rounded transition m-3`}
              >
                <img className="h-8 w-8 invert-[75%]" src={CatIcon[`${item.name}`]} alt="icon" />
                <h4 className="font-suranna text-sm sm:text-lg text-red-200">{item.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pb-2 text-secondary font-medium overflow-x-auto text-xs sm:text-base">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-center">Image</th>
              <th className="text-center">Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {_this.menus?.map((item, index) => {
              return (
                <tr
                  key={index}
                  id="table-row"
                  className="px-2 py-2 border-t border-[rgb(238,238,238)]"
                >
                  <td className="flex justify-center px-2 py-1">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 relative rounded-full overflow-hidden boxshadow border border-primary block">
                      <Image
                        src={Config.STORAGE_URL + item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition={'center'}
                      />
                    </div>
                  </td>
                  <td className="text-center px-2">{item.name}</td>
                  <td className="text-center px-2">
                    <div className="flex gap-2 justify-center">
                      <p>$ {item.price.toFixed(2)}</p>
                      <FaRegEdit
                        size={18}
                        fill="#495D6A"
                        cursor={'pointer'}
                        onClick={() => {
                          _this.setEditPriceModalVisibility(true),
                            _this.setEditPriceData((prev) => ({
                              ...prev,
                              id: item._id,
                              menuName: item.name,
                              price: item.price,
                              currentPrice: item.price
                            }));
                        }}
                      />
                    </div>
                  </td>
                  <td className="text-center py-2">
                    <span
                      key={index}
                      onClick={() => _this.updateAvailability(item._id, !item.is_active)}
                      className="cursor-pointer inline-flex items-center bg-toggle-btn-bg rounded-full shadow py-1 sm:py-1.5 px-1 sm:px-4 text-white"
                    >
                      {!item.is_active ? (
                        <BsToggle2Off size={20} className="mr-2" />
                      ) : (
                        <BsToggle2On className="mr-2" size={20} />
                      )}
                      <p className="text-sm ">{item.is_active ? 'Enabled' : 'Disabled'}</p>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <EditMenuPriceModal _this={_this} />
    </div>
  );
};

export default Section;
