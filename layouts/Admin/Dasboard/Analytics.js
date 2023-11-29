import React from 'react';
import { Card, Modal } from 'components';
import { FiTrendingUp } from 'react-icons/fi';
import { BsArrowUp, BsCartCheckFill } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import Moment from 'moment';

const Section = ({ _this }) => {
  return (
    <div className="flex flex-row flex-wrap justify-between mt-10 mb-20 gap-3">
      {/* third one */}

      <div className=" w-52 h-52 relative bg-white shadow-md rounded-xl my-4">
        <div className=" flex justify-center items-center h-24 w-24 absolute -top-6 left-6 mb-4 bg-gradient-to-tr text-white from-purple-500 to-purple-700 shadow-lg-purple rounded-md">
          <BsCartCheckFill className="h-12 w-12" />
        </div>
        <div className="mt-20 mx-4">
          <div className="flex flex-wrap border-b border-gray-200">
            <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right">
              <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">Orders</h5>
              <span className="text-3xl text-gray-900">{_this.stats?.orders_daily}</span>
            </div>
          </div>
        </div>
        <div className="justify-between text-sm text-gray-700 pt-2 flex items-center mb-8 mx-4">
          <span className="text-green-500 ml-1 mr-2">{_this.stats?.orders_monthly}</span>
          <span className="font-light whitespace-nowrap">Since {Moment().format('MMM-Y')}</span>
        </div>
      </div>

      {/* fourth one  */}
      <div className=" w-52 h-52 relative bg-white shadow-md rounded-xl my-4">
        <div className=" flex justify-center items-center h-24 w-24 absolute -top-6 left-6 mb-4 bg-gradient-to-tr text-white from-blue-500 to-blue-700 shadow-lg-blue rounded-md">
          <AiFillDollarCircle className="h-12 w-12" />
        </div>
        <div className="mt-20 mx-4">
          <div className="flex flex-wrap border-b border-gray-200">
            <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
              <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">Revenue</h5>
              <span className="text-3xl text-gray-900">
                $ {_this.stats?.revenue_daily?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="justify-between text-sm text-gray-700 pt-2 flex items-center mb-8 mx-4">
          <span className="text-green-500 ml-1 mr-2">
            $ {_this.stats?.revenue_monthly?.toFixed(2)}
          </span>
          <span className="font-light whitespace-nowrap">Since {Moment().format('MMM-Y')}</span>
        </div>
      </div>

      {/* first one */}
      <div className=" w-52 h-52 relative bg-white shadow-md rounded-xl my-4">
        <div className=" flex justify-center items-center h-24 w-24 absolute -top-6 left-6 mb-4 bg-gradient-to-tr text-white from-pink-500 to-pink-700 shadow-lg-pink rounded-md">
          <FiTrendingUp className="h-12 w-12" />
        </div>
        <div className="mt-20 mx-4">
          <div className="flex flex-wrap border-b border-gray-200">
            <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
              <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">
                Transactions
              </h5>
              <span className="text-3xl text-gray-900">{_this.stats?.daily_transaction}</span>
            </div>
          </div>
        </div>
        <div className="justify-between text-sm text-gray-700 pt-2 flex items-center mb-8 mx-4">
          <span className="text-green-500 ml-1 mr-2">{_this.stats?.monthly_transaction}</span>
          <span className="font-light whitespace-nowrap">Since {Moment().format('MMM-Y')}</span>
        </div>
      </div>

      {/* second one */}

      <div className=" w-52 h-52 relative bg-white shadow-md rounded-xl my-4">
        <div className=" flex justify-center items-center h-24 w-24 absolute -top-6 left-6 mb-4 bg-gradient-to-tr text-white from-orange-500 to-orange-700 shadow-lg-orange rounded-md">
          <FaUsers className="h-12 w-12" />
        </div>
        <div className=" mt-20 mx-4">
          <div className="flex flex-wrap border-b border-gray-200">
            <div className="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right undefined">
              <h5 className="text-gray-500 font-light tracking-wide text-base mb-1">New Users</h5>
              <span className="text-3xl text-gray-900">{_this.stats?.signup_daily}</span>
            </div>
          </div>
        </div>
        <div className="justify-between text-sm text-gray-700 pt-2 flex items-center mb-8 mx-4">
          <span className="text-green-500 ml-1 mr-2">{_this.stats?.signup_monthly}</span>
          <span className="font-light whitespace-nowrap">Since {Moment().format('MMM-Y')}</span>
        </div>
      </div>
    </div>
  );
};

export default Section;
