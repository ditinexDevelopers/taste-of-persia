import React from 'react';
import { ButtonSecondary, Modal } from 'components';

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

        <ol className="pt-3 space-y-4 text-gray-500 list-decimal list-inside">
          {_this.orderDetails?.items?.map((item) => (
            <li>
              {item._id?.name} <span className="px-2"> x </span> {item?.quantity}
              {item.ind != null && (
                <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                  <li>{item._id?.choices[item.ind]}</li>
                </ul>
              )}
            </li>
          ))}
        </ol>
      </>
    </Modal>
  );
};

export default OrderDetailsModal;
