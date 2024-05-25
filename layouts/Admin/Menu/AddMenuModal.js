import React, { useState } from 'react';
import { ButtonSecondary, Dropdown, Modal } from 'components';
import { BiImageAdd, BiChevronDownCircle, BiChevronUpCircle } from 'react-icons/bi';
import Config from 'config';
import Image from 'next/image';
import { MdOutlineRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { FaAsterisk } from 'react-icons/fa';

const Section = ({ _this }) => {
  const [showdropdown, setShowdropdown] = useState(false);
  return (
    <Modal
      modalVisibility={_this.addMenuModalVisibility}
      onClose={() => {
        _this.setAddMenuModalVisibility(false);
      }}
    >
      <>
        <div id="header" className="text-2xl pb-1 border-b border-borderlight">
          Add New Item
        </div>
        <div className="flex flex-col space-y-3 py-5 px-3">
          <div className="w-32 h-32 relative rounded-full boxshadow border border-primary block mx-auto">
            <Image
              src={
                _this.addMenuData?.image_prev
                  ? _this.addMenuData?.image_prev
                  : '/images/default_menu.png'
              }
              alt="Menu Photo"
              layout="fill"
              objectFit="cover"
              objectPosition={'center'}
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-[-10px]">
              <label
                htmlFor="img_input"
                className="rounded-md hover:bg-primary/10 hover:text-primary bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                <BiImageAdd size={24} className="text-toggle-btn-bg" />
              </label>
              <input
                id="img_input"
                hidden
                type="file"
                onChange={(e) => {
                  _this.setAddMenuData((prev) => ({
                    ...prev,
                    image_data: e.target.files?.length > 0 ? e.target.files[0] : '',
                    image_prev:
                      e.target.files?.length > 0 ? URL.createObjectURL(e.target.files[0]) : ''
                  }));
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="flex items-center text-sm text-gray-800">
              Name
              <span className="text-lg text-red-700 ml-1.5">*</span>
            </label>
            <input
              type="text"
              placeholder="SHOFTA MACARONI"
              value={_this.addMenuData?.name}
              onChange={(e) =>
                _this.setAddMenuData((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
              className=" w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label htmlFor="password" className="flex items-center text-sm text-gray-800">
              Category
              <span className="text-lg text-red-700 ml-1.5">*</span>
            </label>

            <button
              type="button"
              onClick={() => setShowdropdown(!showdropdown)}
              className="flex items-center justify-between w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            >
              {_this.menuCategory?.name ?? 'Select Category'}
              {showdropdown ? <BiChevronUpCircle size={20} /> : <BiChevronDownCircle size={20} />}
            </button>
            <Dropdown showDropdown={showdropdown} list={[]}>
              <div className="h-64 overflow-auto">
                {_this.categories?.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => {
                      _this.setMenuCategory(item);
                      setShowdropdown(false);
                    }}
                    className="w-full py-2.5 px-3 text-sm font-medium text-gray-900 bg-white hover:bg-gray-200 border-b border-gray-200  flex items-center gap-3"
                  >
                    {_this.menuCategory?._id == item._id ? (
                      <MdRadioButtonChecked size={18} color="purple" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked size={18} color="purple" />
                    )}
                    {item.name}
                  </button>
                ))}
              </div>
            </Dropdown>
          </div>

          <div>
            <label htmlFor="password" className="flex items-center text-sm text-gray-800">
              Price
              <span className="text-lg text-red-700 ml-1.5">*</span>
            </label>
            <input
              type="number"
              placeholder="99.9"
              value={_this.addMenuData?.price}
              onChange={(e) =>
                _this.setAddMenuData((prev) => ({
                  ...prev,
                  price: e.target.value
                }))
              }
              className=" w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="pb-2">
            <label htmlFor="password" className="block text-sm text-gray-800">
              Description
            </label>
            <textarea
              value={_this.addMenuData?.currentPrice}
              placeholder="Very Delicious Shofta Macaroni..."
              onChange={(e) =>
                _this.setAddMenuData((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
              className=" w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <ButtonSecondary
            label="Add Item"
            className="text-center w-64 mx-auto"
            onClick={() => _this.AddNewMenuItem()}
          />
        </div>
      </>
    </Modal>
  );
};

export default Section;
