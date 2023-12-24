import React from 'react';
import { Card, OrderStatus, ToggleButton, Modal, ButtonSecondary } from 'components';
import { MdRefresh, MdOutlineNoFood } from 'react-icons/md';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import Moment from 'moment';
import Analytics from './Analytics';
import StatusUpdateModal from './StatusUpdateModal';
import classNames from 'classnames';
import moment from 'moment';

const Section = ({ _this }) => {
  return (
    <>
      <div
        className={`relative bg-gradient-to-tr ${
          _this.isResturantClosed
            ? 'from-pink-500 to-pink-700 shadow-lg-pink'
            : 'from-blue-500 to-blue-700 shadow-lg-blue'
        } mt-6 mb-4 rounded-xl text-white flex justify-between items-center w-full h-16 py-2 px-8 shadow-lg-purple text-2xl`}
      >
        {moment().format('YYYY/MM/DD')} - {moment().format('dddd')}
        <span
          onClick={() => _this.onToggle()}
          className="cursor-pointer flex items-center bg-toggle-btn-bg rounded-full shadow py-1.5 px-4"
        >
          {_this.isResturantClosed ? (
            <BsToggle2Off size={22} className="mr-1.5" />
          ) : (
            <BsToggle2On className="mr-1.5" size={22} />
          )}
          <p className="text-sm">{!_this.isResturantClosed ? 'Open' : 'Closed'}</p>
        </span>
      </div>

      <Analytics _this={_this} />

      <div className="relative bg-white shadow-dashboard-md p-4 rounded-xl">
        <div className="relative bg-gradient-to-tr from-purple-500 to-purple-700 -mt-10 mb-4 rounded-xl text-white flex justify-between items-center w-full h-16 py-2 px-8 shadow-lg-purple text-2xl">
          Pending Orders
          <span
            className="cursor-pointer hover:text-primarylight"
            onClick={() => _this.onRefresh()}
          >
            <MdRefresh />
          </span>
        </div>
        <div className="overflow-x-scroll lg:overflow-hidden">
          {_this.orderHistory.length > 0 ? (
            <div className="flex flex-row gap-3 pb-2 px-1 text-secondary font-medium min-w-[1000px]">
              <div className="w-28">Order ID</div>
              <div className="w-28">Order At</div>
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
          {_this.orderHistory?.map((item, index) => {
            return (
              <div
                key={index}
                id="table-row"
                className="flex flex-row gap-2 px-1 py-2 border-t border-[rgb(238,238,238)] min-w-[1000px]"
              >
                <div className="w-28">
                  {`#${parseInt(item._id.substring(0, 8), 16).toString()}`}{' '}
                </div>
                <div className="w-28">{Moment(item.createdAt).format('YYYY-MM-DD hh:mm A')}</div>
                <div className="flex flex-1 flex-col">
                  <code
                    className={`text-sm ${
                      item.status == 'Pending' ? 'text-red-400' : 'text-secondary'
                    }`}
                  >
                    {item.items.map((food, i) => {
                      return (
                        <div
                          key={i}
                          className={classNames(
                            'flex flex-row gap-3 items-center pb-1 mb-1 border-red-200',
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
                <div className="flex flex-1 flex-col text-sm">
                  <p>Name : {item.name}</p>
                  <p>Email : {item.email}</p>
                  <p>Mobile : {item.mobile}</p>
                </div>
                <div className="w-28">$ {item.total_price.toFixed(2)}</div>
                <div className="text-left w-48 pt-1">
                  <OrderStatus
                    status={item.status}
                    readyIn={Moment.duration(Moment(item.ready_for_pickup_at).diff(Moment()))}
                    onClick={() => {
                      _this.setIsUpdatingStatus(true);
                      _this.setSelectedOrder(item);
                      _this.setShowModal(true);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <StatusUpdateModal _this={_this} />

      <Modal
        modalVisibility={_this.permissionModal}
        onClose={() => {
          _this.setPermissionModal(false);
        }}
      >
        <div>
          <p className="mb-5 mt-5">Please Push Allow Notification Permission.</p>
          <ButtonSecondary
            onClick={() => _this.onPermissionButtonClick()}
            label="Request Permission"
            className="mb-5"
          />
        </div>
      </Modal>
    </>
  );
};

export default Section;
