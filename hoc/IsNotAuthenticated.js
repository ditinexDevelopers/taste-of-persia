import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

const IsNotAuthenticated =
  (Component) =>
  ({ ...props }) => {
    const { userSession } = useSelector((state) => state.session);
    const router = useRouter();
    useEffect(() => {
      if (userSession !== '' && userSession) router.replace('/');
    }, [userSession]);

    return userSession !== '' && userSession == null && <Component {...props} />;
  };

export default IsNotAuthenticated;
