import React, { useState } from 'react';
import { ButtonSecondary, Modal } from 'components';
import Config from 'config';
import { toast } from 'react-toastify';

const MenuOptionsModal = ({ _this }) => {
  const [choiceIndex, setChoiceIndex] = useState(null);

  return (
    <Modal
      modalVisibility={_this.optionsMenuModalVisibility}
      onClose={() => {
        _this.setOptionsMenuModalVisibility(false);
        _this.setSelectedItem(null);
        setChoiceIndex(null);
      }}
    >
      <>
        <div id="header" className="text-2xl pb-1 border-b border-borderlight">
          Select Options
        </div>
        <div className="flex flex-col space-y-5 py-5 px-3">
          <div className="w-full flex flex-row items-center bg-white border border-gray-200 rounded-lg">
            <img
              className="object-cover rounded-tl-lg rounded-bl-lg h-28 w-36"
              src={Config.STORAGE_URL + _this.selectedItem?.image}
              alt={_this.selectedItem?.name}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                {_this.selectedItem?.name}
              </h5>
              <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
                $ {_this.selectedItem?.price}
              </h5>
            </div>
          </div>

          <div className="px-2">
            <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
              Select One or more option
            </h5>
            {_this.selectedItem?.choices?.map((choice, ind) => (
              <div
                key={ind}
                className="flex items-center space-x-2 px-3 border border-gray-200 rounded-lg mb-1"
                onClick={() => {
                  setChoiceIndex(ind);
                }}
              >
                <input
                  id={ind}
                  checked={choiceIndex == ind}
                  type="radio"
                  name="list-radio"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />

                <label
                  htmlFor={ind}
                  className="w-full py-3 pl-1.5 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {choice}
                </label>
              </div>
            ))}
          </div>

          <ButtonSecondary
            label="Add to Cart"
            className="text-center w-64 mx-auto"
            onClick={() => {
              if (
                _this.selectedItem._id != '657d5a0f4ee5b6cea853c16c' &&
                _this.selectedItem._id != '657d59744ee5b6cea853c16b' &&
                choiceIndex == null
              )
                return toast.warn('Please select a type!');
              _this.addToCart(_this.selectedItem, choiceIndex);
              _this.setOptionsMenuModalVisibility(false);
              setChoiceIndex(null);
            }}
          />
        </div>
      </>
    </Modal>
  );
};

export default MenuOptionsModal;
