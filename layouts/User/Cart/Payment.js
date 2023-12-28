import React, { useEffect, useState } from 'react';
import { Modal, ButtonSecondary } from 'components';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import Config from 'config';
import { toast } from 'react-toastify';

const Section = ({ _this }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    setName(_this.name);
    setAddress(_this.address);
  }, [_this.name, _this.address]);

  return (
    <Modal
      modalVisibility={_this.paymentModalShow}
      closeOnBackdropClick={true}
      onClose={() => _this.setPaymentModalShow(false)}
    >
      <div className="text-2xl font-medium pb-1 mb-6 border-b border-borderlight">
        Pay And Place Order
      </div>
      <div className="w-full mb-2">
        <label htmlFor="text" className="text-sm text-gray-800">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mt-1 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div className="w-full mb-2">
        <label htmlFor="text" className="text-sm text-gray-800">
          Billing Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mt-1 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div className="w-full mb-4">
        <label htmlFor="text" className="text-sm text-gray-800">
          City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 mt-1 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <PaymentForm
        applicationId={Config.SQUARE_APPLICATION_ID}
        locationId={Config.SQUARE_LOCATION_ID}
        cardTokenizeResponseReceived={(response, buyer) => {
          // console.log('response of payment card', response);
          _this.setPaymentModalShow(false);
          if (response.status == 'OK') _this.placeOrderHandler(response.token);
          else toast.error(response);
        }}
        createVerificationDetails={() => ({
          /* collected from the buyer */
          billingContact: {
            addressLines: [address],
            familyName: name,
            givenName: name,
            countryCode: 'US',
            city: city
          },
          currencyCode: 'USD',
          intent: 'STORE'
        })}
      >
        <CreditCard />
      </PaymentForm>
    </Modal>
  );
};

export default Section;
