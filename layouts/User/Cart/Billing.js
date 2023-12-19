import React from 'react';
import { Card, ButtonSecondary } from 'components';
import { toast } from 'react-toastify';

const Section = ({ _this }) => {
  return (
    <Card
      title="Billing Details"
      footer={
        <ButtonSecondary
          className={`text-center ${
            _this.cartCount === 0 || _this.isResturantClosed
              ? 'cursor-not-allowed bg-secondaryhover'
              : ''
          }
          ${_this.userSession !== null ? 'mt-5' : 'mt-0'}`}
          style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
          label={`${_this.userSession === null ? 'Register &' : ''} Place Order`}
          onClick={
            _this.isResturantClosed
              ? () => {
                  toast.error('We are closed Today. Please order with us tomorrow.');
                }
              : _this.userSession === null
              ? () => _this.register()
              : // : () => _this.setPaymentModalShow(true)
                () => _this.placeOrderHandler('sample token')
          }
        />
      }
    >
      <div className="mx-4 text-sm">
        {_this.userSession === null ? (
          <p className="mt-8 mb-8 text-lg font-light text-center text-gray-700">
            Already have an account ?{' '}
            <span
              className="font-medium text-gray-500 hover:underline mr-2 cursor-pointer"
              onClick={() => _this.pleaseLoginHandler()}
            >
              {' '}
              Please Login
            </span>
          </p>
        ) : (
          ''
        )}
        <div className="flex sm:flex-row flex-col sm:justify-between gap-4 mt-4">
          <div className="sm:w-1/2 w-full">
            <label htmlFor="text" className="text-sm text-gray-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={_this.name}
              onChange={(e) => _this.setName(e.target.value)}
              className="w-full px-2 py-1.5 mt-2 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="sm:w-1/2 w-full">
            <label htmlFor="tel" className="text-sm text-gray-800">
              Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={_this.phone}
              onChange={(e) => _this.setPhone(e.target.value)}
              className="w-full px-2 py-1.5 mt-2 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm text-gray-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={_this.email}
              onChange={(e) => _this.setEmail(e.target.value)}
              className="block w-full px-2 py-1.5 mt-2 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="text" className="text-sm text-gray-800">
            Billing Address <span className="text-blue-500 font-medium">(optional)</span>
          </label>
          <textarea
            type="text"
            required
            value={_this.address}
            onChange={(e) => _this.setAddress(e.target.value)}
            className="block w-full px-2 py-1.5 mt-2 text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        {_this.userSession === null ? (
          <div className="flex sm:flex-row flex-col sm:justify-between gap-4 mt-4 mb-8">
            <div className="sm:w-1/2 w-full">
              <label htmlFor="text" className="text-sm text-gray-800">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={_this.password}
                onChange={(e) => _this.setPassword(e.target.value)}
                className="w-full px-2 py-1.5 mt-2 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="sm:w-1/2 w-full">
              <label htmlFor="tel" className="text-sm text-gray-800">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={_this.cpassword}
                onChange={(e) => _this.setCpassword(e.target.value)}
                className="w-full px-2 py-1.5 mt-2 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </Card>
  );
};

export default Section;
