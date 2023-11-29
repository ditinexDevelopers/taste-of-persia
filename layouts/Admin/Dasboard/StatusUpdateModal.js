import React, { useEffect, useState } from 'react';
import { ButtonSecondary, Modal } from 'components';

const Section = ({ _this }) => {
  const display = () => {
    switch (_this.selectedOrder?.status) {
      case 'Pending':
        return (
          <PendingStatus
            updateOrderStatus={_this.updateOrderStatus}
            orderId={_this.selectedOrder._id}
            onClose={() => {
              _this.setIsUpdatingStatus(false);
              _this.setShowModal(false);
            }}
          />
        );
      case 'In Kitchen':
        return (
          <ReadyStatus
            updateOrderStatus={_this.updateOrderStatus}
            orderId={_this.selectedOrder._id}
            onClose={() => {
              _this.setIsUpdatingStatus(false);
              _this.setShowModal(false);
            }}
          />
        );
      case 'Ready To Pickup':
        return (
          <CompleteStatus
            updateOrderStatus={_this.updateOrderStatus}
            orderId={_this.selectedOrder._id}
            onClose={() => {
              _this.setIsUpdatingStatus(false);
              _this.setShowModal(false);
            }}
          />
        );
      default:
        return 'No further action needed.';
    }
  };

  return (
    <Modal
      modalVisibility={_this.showModal}
      onClose={() => {
        _this.setIsUpdatingStatus(false);
        _this.setShowModal(false);
      }}
    >
      {_this.selectedOrder && (
        <>
          <div id="header" className="text-2xl pb-1 border-b border-borderlight">
            Update Order Status
          </div>
          <div id="body" className="text-base">
            {display()}
          </div>
        </>
      )}
    </Modal>
  );
};

export default Section;

const PendingStatus = ({ updateOrderStatus, orderId, onClose }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  return (
    <div>
      <h6 className="text-lg mt-5 text-secondary">Food will be ready in : </h6>
      <div className="flex flex-row justify-between gap-10 mt-4 mb-10">
        <div>
          <label className="block text-sm text-gray-800">
            Hours <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-800">
            Minutes <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
      </div>
      <div
        id="footer"
        className="flex flex-row justify-center gap-2 p-3 border-t border-borderlight"
      >
        <ButtonSecondary
          label="Accept"
          className="text-center w-40"
          onClick={() =>
            updateOrderStatus({
              order_id: orderId,
              status: 'In Kitchen',
              hours: hours,
              minutes: minutes
            })
          }
        />{' '}
        <ButtonSecondary
          label="Deny"
          className="text-center w-40"
          onClick={() =>
            updateOrderStatus({
              order_id: orderId,
              status: 'Cancelled'
            })
          }
        />{' '}
        <ButtonSecondary label="Close" className="text-center w-40" onClick={() => onClose()} />
      </div>
    </div>
  );
};

const ReadyStatus = ({ updateOrderStatus, orderId, onClose }) => {
  return (
    <div>
      <div id="footer" className="flex flex-row justify-center gap-2 p-3">
        <ButtonSecondary
          label="Ready To Pickup"
          className="text-center w-64"
          onClick={() =>
            updateOrderStatus({
              order_id: orderId,
              status: 'Ready To Pickup'
            })
          }
        />{' '}
        <ButtonSecondary
          label="Close"
          className="text-center w-64 flex items-center justify-center"
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
};

const CompleteStatus = ({ updateOrderStatus, orderId, onClose }) => {
  return (
    <div>
      <div id="footer" className="flex flex-row justify-center gap-2 p-3">
        <ButtonSecondary
          label="Complete Order"
          className="text-center w-64"
          onClick={() =>
            updateOrderStatus({
              order_id: orderId,
              status: 'Completed'
            })
          }
        />{' '}
        <ButtonSecondary
          label="Close"
          className="text-center w-64 flex items-center justify-center"
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
};
