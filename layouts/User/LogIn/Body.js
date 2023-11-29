import React from 'react';
import Link from 'next/link';
import { ButtonSecondary } from 'components';

const Section = ({ _this }) => {
  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white border-t-4 border-secondary rounded-md shadow-md border-top lg:max-w-md">
          <h1 className="font-Suranna sm:text-3xl text-2xl text-secondary uppercase mb-6 text-center">
            The Goodness Land
          </h1>
          <form className="mt-6">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-800">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={_this.email}
                onChange={(e) => _this.setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <div>
                <label htmlFor="password" className="block text-sm text-gray-800">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={_this.password}
                  onChange={(e) => _this.setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <a href="#" className="text-xs text-gray-500 hover:underline">
                Forget Password?
              </a>
              <div className="mt-6">
                <ButtonSecondary
                  label="LOGIN"
                  style={{ borderRadius: '6px' }}
                  onClick={(e) => _this.onLogin(e)}
                />
              </div>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {' '}
            Don't have an account?{' '}
            <Link href="signup">
              <span className="font-medium text-gray-500 hover:underline mr-2 cursor-pointer">
                {' '}
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
