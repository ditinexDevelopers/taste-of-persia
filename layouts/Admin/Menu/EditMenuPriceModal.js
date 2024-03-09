import React from 'react';
import { ButtonSecondary, Modal } from 'components';

const Section = ({ _this }) => {
  return (
    <Modal
      modalVisibility={_this.editPriceModalVisibility}
      onClose={() => {
        _this.setEditPriceModalVisibility(false);
      }}
    >
      <>
        <div id="header" className="text-2xl pb-1 border-b border-borderlight">
          Update Order Status
        </div>
        <div className="flex flex-col space-y-5 py-5 px-3">
          <div>
            <label htmlFor="password" className="block text-sm text-gray-800">
              Menu Name
            </label>
            <input
              type="text"
              readOnly={true}
              value={_this.editPriceData?.menuName}
              className=" w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-800">
              Current Price
            </label>
            <input
              type="text"
              readOnly={true}
              value={_this.editPriceData?.currentPrice}
              className=" w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="pb-5">
            <label htmlFor="password" className="block text-sm text-gray-800">
              Edited Price
            </label>
            <input
              type="text"
              value={_this.editPriceData?.price}
              onChange={(e) =>
                _this.setEditPriceData((prev) => ({
                  ...prev,
                  price: e.target.value
                }))
              }
              className=" w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <ButtonSecondary
            label="Update Price"
            className="text-center w-64 mx-auto"
            onClick={() => _this.updateMenuPrice()}
          />
        </div>
      </>
    </Modal>
  );
};

export default Section;
