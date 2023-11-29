import React from 'react';
import { Card, ButtonSecondary } from 'components';
import { useRouter } from 'next/router';

const Section = ({ _this }) => {
  const router = useRouter();
  return (
    <Card title="User Details">
      <div className="mx-4 text-sm">
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
              type="text"
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
        <ButtonSecondary
          label="Update Profile"
          className="text-center mt-5 mb-10"
          style={{ borderRadius: '6px' }}
          onClick={() => _this.onUpdate()}
        />
        <hr className="mb-10" />

        <div className="flex sm:flex-row flex-col sm:justify-between gap-4 mt-4 mb-8">
          <div className="sm:w-1/2 w-full">
            <label htmlFor="text" className="text-sm text-gray-800">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={_this.password}
              onChange={(e) => _this.setPassword(e.target.value)}
              required
              className="w-full px-2 py-1.5 mt-2 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="sm:w-1/2 w-full">
            <label htmlFor="tel" className="text-sm text-gray-800">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={_this.cpassword}
              onChange={(e) => _this.setcpassword(e.target.value)}
              required
              className="w-full px-2 py-1.5 mt-2 tracking-wider text-xs font-semibold text-secondary bg-white border rounded-md focus:border-secondary focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        <ButtonSecondary
          className="text-center mt-5"
          style={{ borderRadius: '6px' }}
          label="Change Password"
          onClick={(e) => _this.changePassword(e)}
        />
        {_this.userSession?.user_role == 'admin' && (
          <ButtonSecondary
            className="text-center mt-5"
            style={{ borderRadius: '6px' }}
            label="Admin Dashboard"
            onClick={(e) => router.push('/admin/dashboard')}
          />
        )}
        <ButtonSecondary
          className="text-center mt-5 mb-5"
          style={{ borderRadius: '6px' }}
          label="Log out"
          onClick={(e) => _this.onLogout()}
        />
      </div>
    </Card>
  );
};

export default Section;
