import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

const IsAdmin =
  (Component) =>
  ({ ...props }) => {
    const { userSession } = useSelector((state) => state.session);
    const router = useRouter();
    useEffect(() => {
      if (userSession !== '' && (userSession == null || userSession?.user_role !== 'admin')) {
        router.replace('/');
      }
    }, [userSession]);

    return (
      userSession !== '' &&
      userSession !== null &&
      userSession?.user_role == 'admin' && <Component {...props} />
    );
  };

export default IsAdmin;
