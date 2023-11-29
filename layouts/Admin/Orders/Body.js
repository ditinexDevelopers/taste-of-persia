import React from 'react';
import { Card, Modal, OrderStatus } from 'components';
import Moment from 'moment';
import { MdOutlineNoFood, MdEast, MdWest } from 'react-icons/md';
import classNames from 'classnames';

const Section = ({ _this }) => {
  const activePageClass = 'text-secondary border-t border-secondary pt-3 mr-4 px-2';
  const inactivePageClass =
    'text-secondarylight hover:text-secondary border-t border-transparent hover:border-secondary pt-3 mr-4 px-2';

  return (
    <div className="relative bg-white shadow-dashboard-md p-4 rounded-xl mt-10">
      <div className="relative bg-gradient-to-tr from-blue-500 to-blue-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-full h-16 py-2 px-8 shadow-lg-blue text-2xl">
        Order History
      </div>
      {_this.orderData.length > 0 ? (
        <div className="flex flex-row gap-2 pb-2 px-1 text-secondary font-medium">
          <div className="w-28">Order ID</div>
          <div className="w-28">Ordered At</div>
          <div className="flex flex-1 flex-col items-center">Items</div>
          <div className="flex flex-1">Billed To</div>
          <div className="w-28">Amount</div>
          <div className="flex text-left w-48 items-center">Status</div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center text-borderlight py-3">
          <MdOutlineNoFood size={50} />
          <div className="text-xl">Sorry! No orders yet.</div>
        </div>
      )}

      {_this.orderData?.map((item, index) => {
        return (
          <div
            key={index}
            id="table-row"
            className="flex flex-row gap-2 px-1 py-2 border-t border-[rgb(238,238,238)]"
          >
            <div className="w-28">{`#${parseInt(item._id.substring(0, 8), 16).toString()}`}</div>
            <div className="w-28">{Moment(item.createdAt).format('YYYY-MM-DD hh:mm A')}</div>
            <div className="flex flex-1 flex-col">
              <code className="text-xs">
                {item.items.map((food, i) => {
                  return (
                    <div
                      key={i}
                      className={classNames(
                        'flex flex-row gap-2 items-center pb-1 mb-1 border-secondarylight',
                        i !== item.items.length - 1 && 'border-b'
                      )}
                    >
                      <div className="flex flex-1 text-left">{food._id?.name}</div>
                      <div className="flex w-20 text-left">x {food?.quantity}</div>
                      <div className="flex w-20 text-left">$ {food?._id?.price}</div>
                    </div>
                  );
                })}
              </code>
              {item.additional_comment && (
                <code className="text-xs text-red-400">
                  Additional comment : {item.additional_comment}
                </code>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <p>Name : {item.name}</p>
              <p>Email : {item.email}</p>
              <p>Mobile : {item.mobile}</p>
            </div>
            <div className="w-28">$ {item.total_price.toFixed(2)}</div>
            <div className="text-left w-48 pt-1">
              <OrderStatus
                status={item.status}
                readyIn={Moment.duration(Moment(item.ready_for_pickup_at).diff(Moment()))}
              />
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
        <div className="lg:w-4/5 w-full flex items-center justify-between border-t border-secondary">
          <div
            className={`flex ${
              _this.page === 1
                ? 'cursor-not-allowed bg-secondarylight'
                : 'bg-primarylight hover:text-white hover:bg-secondary'
            } items-center justify-center w-32 py-2 mt-2 rounded-md text-secondary duration-300 cursor-pointer`}
            onClick={() => _this.pageDecrement()}
          >
            <MdWest />
            <p className="text-sm ml-3 font-semibold">Previous</p>
          </div>

          <div className="sm:flex hidden text-sm font-semibold cursor-pointer">
            {Array.from({ length: _this.totalPages }, (_, i) => i + 1)?.map((item, index) => {
              return (
                <p
                  key={index}
                  className={item === _this.page ? activePageClass : inactivePageClass}
                  onClick={() => _this.setPage(item)}
                >
                  {item}
                </p>
              );
            })}
          </div>

          <div
            className={`flex ${
              _this.page === _this.totalPages
                ? 'cursor-not-allowed bg-secondarylight'
                : 'bg-primarylight hover:text-white hover:bg-secondary'
            } items-center justify-center w-32 py-2 mt-2 rounded-md text-secondary duration-300 cursor-pointer`}
            onClick={() => _this.pageIncrement()}
          >
            <p className="text-sm font-semibold mr-3">Next</p>
            <MdEast />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
