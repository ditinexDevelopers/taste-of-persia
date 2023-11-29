import React from 'react';
import Image from 'next/image';
import Config from 'config';
import Switch from './Switch';
import classNames from 'classnames';

const Section = ({ _this }) => {
  return (
    <div className="relative bg-white shadow-dashboard-md p-4 rounded-xl mt-10">
      <div className="relative bg-gradient-to-tr from-blue-500 to-blue-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-16 py-2 px-8 shadow-lg-blue text-2xl">
        Menu List
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center mb-6 max-w-7xl m-auto">
        <div
          onClick={() => _this.setSelectedCategory('')}
          className={classNames(
            _this.selectedCategory == ''
              ? 'text-primarylight bg-secondary'
              : 'text-secondary bg-transparent',
            'flex justify-center items-center w-32 h-10 border-borderlight border rounded-md m-2 cursor-pointer text-lg font-medium hover:text-primarylight hover:bg-secondary transition-all duration-300 font-suranna tracking-wider'
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
                'flex justify-center items-center w-32 h-10 border-borderlight border rounded-md m-2 cursor-pointer text-lg font-medium hover:text-primarylight hover:bg-secondary transition-all duration-300 font-suranna tracking-wider'
              )}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-2 pb-2 px-1 text-secondary font-medium">
        <div className="w-1/5">Image</div>
        <div className="w-2/5">Name</div>
        <div className="flex flex-1 flex-col">Price</div>
        <div className="flex text-left w-1/5 items-center">Status</div>
      </div>

      {_this.menus?.map((item, index) => {
        return (
          <div
            key={index}
            id="table-row"
            className="flex items-center flex-row gap-2 px-1 py-2 border-t border-[rgb(238,238,238)]"
          >
            <div className="w-1/5">
              <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden boxshadow border border-primary sm:block hidden">
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
            <div className="text-left w-1/5 pt-1">
              <Switch
                key={index}
                switchState={item.is_active}
                menuId={item._id}
                onClickHandler={_this.updateAvailability}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Section;
