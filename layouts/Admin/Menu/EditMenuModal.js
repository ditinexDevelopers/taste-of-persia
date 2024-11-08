import React from 'react';
import { ButtonSecondary, Modal } from 'components';
import Image from 'next/image';
import Config from 'config';
import { BiImageAdd } from 'react-icons/bi';

const EditMenuModal = ({ _this }) => {
  return (
    <Modal
      modalVisibility={_this.editMenuModalVisibility}
      onClose={() => {
        _this.setEditMenuModalVisibility(false);
      }}
    >
      <>
        <div id="header" className="text-2xl pb-1 border-b border-borderlight">
          Update Menu
        </div>
        <div className="flex flex-col space-y-5 py-5 px-3">
          {_this.editMenuData?.image && (
            <div className="w-32 h-32 relative rounded-full boxshadow border border-primary block mx-auto">
              <Image
                src={
                  _this.editMenuData?.image_prev
                    ? _this.editMenuData?.image_prev
                    : Config.STORAGE_URL + _this.editMenuData?.image
                }
                alt={_this.editMenuData?.name}
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
                    _this.setEditMenuData((prev) => ({
                      ...prev,
                      image_data: e.target.files?.length > 0 ? e.target.files[0] : '',
                      image_prev:
                        e.target.files?.length > 0 ? URL.createObjectURL(e.target.files[0]) : ''
                    }));
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm text-gray-800">
              Menu Name
            </label>
            <input
              type="text"
              // readOnly={true}
              value={_this.editMenuData?.menuName}
              className=" w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-gray-100 focus:ring-gray-100 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => {
                _this.setEditMenuData((prev) => ({
                  ...prev,
                  menuName: e.target.value
                }));
              }}
            />
          </div>
          {/* <div>
            <label htmlFor="password" className="block text-sm text-gray-800">
              Current Price
            </label>
            <input
              type="text"
              readOnly={true}
              value={_this.editMenuData?.currentPrice}
              className=" w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-gray-100 focus:ring-gray-100 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div> */}
          <div className="">
            <label htmlFor="password" className="block text-sm text-gray-800">
              Price
            </label>
            <input
              type="text"
              value={_this.editMenuData?.price}
              onChange={(e) =>
                _this.setEditMenuData((prev) => ({
                  ...prev,
                  price: e.target.value
                }))
              }
              className=" w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-800">
              Description
            </label>
            <textarea
              type="text"
              // readOnly={true}
              value={_this.editMenuData?.menuDescription}
              onChange={(e) =>
                _this.setEditMenuData((prev) => ({
                  ...prev,
                  menuDescription: e.target.value
                }))
              }
              className=" w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-gray-100 focus:ring-gray-100 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <ButtonSecondary
            label="Update Menu"
            className="text-center w-64 mx-auto"
            onClick={() => _this.updateMenu()}
          />
        </div>
      </>
    </Modal>
  );
};

export default EditMenuModal;
