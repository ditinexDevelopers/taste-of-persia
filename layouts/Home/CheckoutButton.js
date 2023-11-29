import React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

const Section = ({ _this }) => {
  const router = useRouter();
  return (
    _this.cart.length > 0 && (
      <div
        onClick={() => router.push('/user/cart')}
        className="fixed bg-primary sm:w-[300px] w-[200px] sm:h-[100px] h-[70px] z-50 bottom-1 right-1 rounded-xl border-2 border-primarylight cursor-pointer flex items-center"
      >
        <p className="uppercase sm:w-[200px] w-[130px] text-center text-primarylight sm:text-2xl text-lg font-medium">
          Proceed To Checkout
        </p>
        <img
          src="/images/checkout.png"
          className="sm:h-[200px] h-[150px] w-auto absolute right-1 bottom-1"
        />
      </div>
    )
  );
};

export default Section;
