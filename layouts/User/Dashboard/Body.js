import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Config from 'config';
import { Modal } from 'components';
import { MdRemoveShoppingCart, MdCancel } from 'react-icons/md';
import Billing from './Billing';
import Orders from './Orders';

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
              return (
                <div key={i} className="flex flex-row gap-2">
                  <div className="flex flex-1 text-left">{food._id.name}</div>
                  <div className="flex w-20 text-left">x {food.quantity}</div>
                  <div className="flex w-20 text-left">$ {food._id.price}</div>
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
