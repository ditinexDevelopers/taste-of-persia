import React from 'react';
import { Card, ButtonSecondary, OrderStatus } from 'components';
import { MdOutlineNoFood } from 'react-icons/md';
import Moment from 'moment';

const Section = ({ _this }) => {
  return (
    <Card title="Order History">
      {_this.orderHistory.length > 0 ? (
        <div className="flex flex-row bg-borderlight px-1 text-secondary">
          <div className="flex flex-1">Order</div>
          <div className="sm:flex hidden text-left flex-1">Billing Details</div>
          <div className="text-left w-48">Status</div>
          <div className="w-20 text-left">Amount</div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center text-borderlight py-3 mt-12">
          <MdOutlineNoFood size={50} />
          <div className="text-xl">Sorry! No orders yet.</div>
        </div>
      )}

      {_this.orderHistory?.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-row px-1 text-secondary border-b border-borderlight pb-1 mb-1"
          >
            <div
              className="flex flex-1 flex-col cursor-pointer"
              onClick={() => {
                _this.setSelectedOrder(item);
                _this.showModal();
              }}
            >
              <p className="text-blue-700 underline"># {parseInt(item._id.substring(0, 8), 16)}</p>
              <p className="text-xs">{Moment(item.createdAt).format('YYYY-MM-DD')}</p>
              <p className="text-xs">{Moment(item.createdAt).format('hh:mm a')}</p>
            </div>
            <div className="text-xs sm:flex hidden text-left flex-1 flex-col">
              <p>Name : {item.name}</p>
              <p>Mobile : {item.mobile}</p>
              <p>Email : {item.email}</p>
            </div>
            <div className="flex text-left w-48 items-center">
              <OrderStatus
                status={item.status}
                readyIn={Moment.duration(Moment(item.ready_for_pickup_at).diff(Moment()))}
              />
            </div>
            <div className="flex w-20 text-left items-center">$ {item.total_price.toFixed(2)}</div>
          </div>
        );
      })}
    </Card>
  );
};

export default Section;
