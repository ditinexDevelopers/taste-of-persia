import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer } from 'components';
import Body from './Body';
import { useRouter } from 'next/router';
import apiPool from 'api';
import { toast } from 'react-toastify';
import { loadingStart, loadingStop, signup } from 'redux/action';
import IsNotAuthenticated from 'hoc/IsNotAuthenticated';

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const onSignup = (e) => {
    e.preventDefault();
    dispatch(loadingStart());
    apiPool
      .userSignup({
        name: name,
        email: email,
        mobile: phone,
        password: password,
        cpassword: cpassword
      })
      .then((response) => {
        if (response) {
          dispatch(signup(response));
          router.push('/');
          toast.success('Successful Signup');
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
          name,
          setName,
          phone,
          setPhone,
          email,
          setEmail,
          password,
          setPassword,
          cpassword,
          setCpassword,
          onSignup
        }}
      />
    </>
  );
};

export default IsNotAuthenticated(Index);
