import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

const IsAuthenticated =
  (Component) =>
  ({ ...props }) => {
    const { userSession } = useSelector((state) => state.session);
    const router = useRouter();
    useEffect(() => {
      if (userSession == null) router.replace('/');
    }, [userSession]);

    return userSession !== '' && userSession !== null && <Component {...props} />;
  };

export default IsAuthenticated;
