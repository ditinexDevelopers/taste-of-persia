import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Config from 'config';
import { Card, Modal, ButtonSecondary } from 'components';
import { MdRemoveShoppingCart, MdCancel } from 'react-icons/md';
import Billing from './Billing';
import Payment from './Payment';

const Section = ({ _this }) => {
  const router = useRouter();

  return (
    <div className="bg-black">
      <div className="relative bg-home-bg fullbgsize bg-no-repeat bg-top min-h-[80px] min-w-full"></div>
      {_this.isResturantClosed && (
        <div className="px-2 py-2 m-2 text-center bg-red-100 rounded-md border-red-500 text-red-600 font-bold text-base">
          We are not accepting online order as of now. Please call the restaurant to place the
          order.{' '}
        </div>
      )}
      <div className="flex sm:flex-row flex-col py-4">
        <div className="flex flex-1 px-2 py-2">
          <Card
            title={`Order Summary ${_this.cartCount > 0 ? '( ' + _this.cartCount + ' )' : ''}`}
            footer={
              <>
                <div className="w-full p-2">
                  <label htmlFor="text" className="text-sm text-gray-800">
                    Additional Comment
                  </label>
                  <textarea
                    type="text"
                    value={_this.additionalComment}
                    onChange={(e) => _this.setAdditionalComment(e.target.value)}
                    className="w-full px-2 py-1.5 mt-2 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="flex flex-row bg-titlebg px-2 py-4 text-secondary">
                  <div className="flex flex-1 text-lg font-bold">TOTAL</div>
                  <div className="w-20 text-left text-lg font-bold">$ {_this.total.toFixed(2)}</div>
                </div>
              </>
            }
          >
            {_this.cartCount < 1 && (
              <div className="flex-1 flex flex-col justify-center items-center text-borderlight py-3">
                <MdRemoveShoppingCart size={50} />
                <div className="text-xl">Sorry! Your cart is empty.</div>
              </div>
            )}
            {_this.cartCount > 0 && (
              <>
                <div className="flex flex-row bg-borderlight px-1 text-secondary">
                  <div className="flex flex-1">Name</div>
                  <div className="text-left w-28">Quantity</div>
                  <div className="w-20 text-left">Price</div>
                </div>
                {_this.cart.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row items-center border-b border-borderlight px-1 py-2"
                    >
                      <div className="flex flex-1 sm:flex-row flex-col sm:items-center">
                        <div className="w-[80px] h-[80px] relative rounded-full overflow-hidden boxshadow border border-primary sm:block hidden">
                          <Image
                            src={Config.STORAGE_URL + item.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            objectPosition={'center'}
                          />
                        </div>
                        <div className="sm:ml-3 flex-1 pr-2">
                          <div className="sm:text-xl text-base text-left">{item.name}</div>
                          <div className="sm:block hidden text-base text-left truncate w-[300px]">
                            {(item?.choices?.length && item?.ind != null) > 0
                              ? item?.choices[item?.ind]
                              : item.description}
                          </div>
                          <div
                            className="text-red-500 inline-flex flex-row items-center text-sm cursor-pointer hover:underline mt-1"
                            onClick={() =>
                              _this.dispatch(_this.removeItem({ id: item._id, ind: item.ind }))
                            }
                          >
                            <MdCancel className="mr-1" /> Remove
                          </div>
                        </div>
                      </div>
                      <div className="text-left w-28">
                        <div className="flex flex-row items-center ">
                          <div
                            className="w-8 h-8 transition-all duration-300 bg-backgroundlight hover:bg-primarylight flex justify-center items-center font-bold text-lg rounded-tl-full rounded-bl-full border border-primarylight cursor-pointer text-secondary"
                            onClick={() =>
                              _this.dispatch(
                                _this.decrementQuantity({ id: item._id, ind: item?.ind })
                              )
                            }
                          >
                            {' '}
                            -{' '}
                          </div>
                          <div className="w-8 h-8 flex justify-center items-center border-y border-primarylight text-secondary">
                            {item.quantity}
                          </div>
                          <div
                            className="w-8 h-8 transition-all duration-300 bg-backgroundlight hover:bg-primarylight flex justify-center items-center font-bold text-lg rounded-tr-full rounded-br-full border border-primarylight cursor-pointer text-secondary"
                            onClick={() =>
                              _this.dispatch(
                                _this.incrementQuantity({ id: item._id, ind: item?.ind })
                              )
                            }
                          >
                            {' '}
                            +{' '}
                          </div>
                        </div>
                      </div>
                      <div className="w-20 text-left font-medium">
                        $ {(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </Card>
        </div>
        <div className="flex flex-1 px-2 py-2">
          <Billing _this={_this} />
        </div>
      </div>

      <Payment _this={_this} />
      <Modal
        modalVisibility={_this.modalShow}
        closeOnBackdropClick={true}
        onClose={() => _this.setModalShow(false)}
      >
        <div className="">
          <div id="header" className="text-2xl font-medium pb-1 mb-6 border-b border-borderlight">
            Order Confirmation
          </div>
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '80px', height: '80px' }}
            viewBox="0 0 52 52"
          >
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>

          <div className="text-center text-lg font-medium pt-3 pb-4">
            Hey! Your order is successfully placed.
          </div>
          <div className="flex justify-between">
            <div className="font-semibold">Order ID :</div>
            <div className="text-secondary">
              # {parseInt(_this.order?._id?.substring(0, 8), 16)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-semibold">Order status :</div>
            <div className="text-secondary">Waiting to accept</div>
          </div>

          <div className="flex gap-4 justify-end">
            <ButtonSecondary
              label="Close"
              className="text-center mt-5"
              style={{ borderRadius: '6px' }}
              onClick={() => _this.setModalShow(false)}
            />
            <ButtonSecondary
              label="Dashboard"
              className="text-center mt-5"
              style={{ borderRadius: '6px' }}
              onClick={() => router.push('/user/dashboard')}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Section;
