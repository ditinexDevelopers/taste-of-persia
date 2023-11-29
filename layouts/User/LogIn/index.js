import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer } from 'components';
import Body from './Body';
import { useRouter } from 'next/router';
import apiPool from 'api';
import { toast } from 'react-toastify';
import { loadingStart, loadingStop, login } from 'redux/action';
import IsNotAuthenticated from 'hoc/IsNotAuthenticated';

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isCartPage } = useSelector((state) => state.session);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(loadingStart());
    apiPool
      .userLogin({ email: email, password: password })
      .then((response) => {
        if (response) {
          // Set token expiry to 23 hours
          response.token_expiry = new Date().getTime() + 23 * 60 * 60 * 1000;
          dispatch(login(response));
          toast.success('Successful Login');
          if (response.user_role == 'admin') {
            router.push('/admin/dashboard');
          } else if (isCartPage) {
            router.push('/user/cart');
          } else {
            router.push('/');
          }
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  return (
    <>
      <Body
        _this={{
          email,
          setEmail,
          password,
          setPassword,
          onLogin
        }}
      />
    </>
  );
};

export default IsNotAuthenticated(Index);
