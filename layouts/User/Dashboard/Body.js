import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Config from 'config';
import { Modal } from 'components';
import { MdRemoveShoppingCart, MdCancel } from 'react-icons/md';
import Billing from './Billing';
import Orders from './Orders';

function extractExtraCharge(text) {
  // Define a regular expression pattern to match "add extra $<number>"
  const regex = /add extra \$([\d.]+)/i;
  const match = text.match(regex);

  // If there's a match, return the number part (which is in the first capturing group)
  if (match) {
    return parseFloat(match[1]); // This will give you "10.00" or "25.00"
  }

  // If no match is found, return null or some default value
  return null;
}

const Section = ({ _this }) => {
  const router = useRouter();
  const item = _this.selectedOrder;

  return (
    <>
      <div className="bg-black">
        <div className="relative bg-home-bg fullbgsize bg-no-repeat bg-top min-h-[80px] min-w-full"></div>
        <div className="flex lg:flex-row flex-col py-2">
          <div className="flex flex-initial lg:w-2/3 px-2 py-2">
            <Orders _this={_this} />
          </div>
          <div className="flex flex-initial lg:w-1/3 px-2 py-2">
            <Billing _this={_this} />
          </div>
        </div>
      </div>
      {item && (
        <Modal modalVisibility={_this.modalVisibility} onClose={() => _this.hideModal()}>
          <div id="header" className="text-2xl pb-1 border-b border-borderlight">
            Order Details
          </div>
          <div id="body" className="text-base">
            <p className="mb-3">
              ID : <span className="font-semibold"># {parseInt(item._id.substring(0, 8), 16)}</span>
            </p>
            <p>ITEMS : </p>
            {item.items.map((food, i) => {
              let charges;
              if (food.ind != null) charges = extractExtraCharge(food?._id?.choices[food?.ind]);

              return (
                <div key={i} className="flex flex-row gap-2 mb-1">
                  <div className="flex flex-1 text-left">
                    {food._id.name}
                    {food.ind != null && (
                      <span className="truncate w-[120px]">({food._id?.choices[food?.ind]})</span>
                    )}
                  </div>
                  <div className="flex w-20 text-left">x {food.quantity}</div>
                  <div className={`flex ${charges ? 'w-32' : 'w-20'} text-left`}>
                    $ {food._id.price}
                    {food?.ind != null && charges && <span className="pl-0.5">+${charges}</span>}
                  </div>
                </div>
              );
            })}

            <div className="flex flex-row gap-2">
              <div className="flex flex-1 text-left">TOTAL : </div>
              <div className="flex w-20 text-left"></div>
              <div className="flex w-20 text-left">$ {item.total_price.toFixed(2)}</div>
            </div>
            <p className="mt-4">BILLING DETAILS : </p>
            <p>Name : {item.name}</p>
            <p>Email : {item.email}</p>
            <p>Mobile : {item.mobile}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Section;
