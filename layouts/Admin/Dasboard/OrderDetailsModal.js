import React from 'react';
import { ButtonSecondary, Modal } from 'components';

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

const OrderDetailsModal = ({ _this }) => {
  return (
    <Modal
      modalVisibility={_this.modalVisibility}
      onClose={() => {
        _this.setModalVisibility(false);
      }}
    >
      <>
        <div id="header" className="text-2xl pb-1 border-b border-borderlight">
          Order Details
        </div>

        <div id="body" className="text-base">
          <p className="mb-3">
            ID :{' '}
            <span className="font-semibold">
              # {parseInt(_this.orderDetails?._id.substring(0, 8), 16)}
            </span>
          </p>
          <p className="font-semibold">ITEMS : </p>
          {_this.orderDetails?.items?.map((food, i) => {
            let charges;
            if (food.ind != null) charges = extractExtraCharge(food?._id?.choices[food?.ind]);

            return (
              <div key={i} className="mb-2">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-1 text-left">{food._id.name}</div>
                  <div className="flex w-20 text-left">x {food.quantity}</div>
                  <div className={`flex ${charges ? 'w-32' : 'w-20'} text-left`}>
                    $ {food._id.price}
                    {food?.ind != null && charges && <span className="pl-0.5">+${charges}</span>}
                  </div>
                </div>
                {food.ind != null && (
                  <span className="pl-3 text-sm truncate w-full">
                    &bull; {food._id?.choices[food?.ind]}
                  </span>
                )}
              </div>
            );
          })}

          <div className="flex flex-row gap-2">
            <div className="flex flex-1 text-left font-semibold">TOTAL : </div>
            <div className="flex w-20 text-left"></div>
            <div className="flex w-20 text-left">
              $ {_this.orderDetails?.total_price.toFixed(2)}
            </div>
          </div>
          <p className="mt-4 font-semibold">BILLING DETAILS : </p>
          <p>Name : {_this.orderDetails?.name}</p>
          <p>Email : {_this.orderDetails?.email}</p>
          <p>Mobile : {_this.orderDetails?.mobile}</p>
        </div>
      </>
    </Modal>
  );
};

export default OrderDetailsModal;
