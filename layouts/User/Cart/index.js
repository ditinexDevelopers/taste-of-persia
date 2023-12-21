import { Footer, Header } from 'components';
import React, { useEffect, useState } from 'react';
import Body from './Body';
import apiPool from 'api';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  loadingStart,
  loadingStop,
  isCartPageRedirect,
  clearCart,
  signup
} from 'redux/action';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import moment from 'moment';

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart } = useSelector((state) => state.cart);
  const { userSession } = useSelector((state) => state.session);
  const cartCount = cart.length;
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [items, setItems] = useState([]);
  const [additionalComment, setAdditionalComment] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [order, setOrder] = useState([]);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [isResturantClosed, setIsResturantClosed] = useState(false);

  useEffect(() => {
    // To check whether today is Tuesday or not
    apiPool.getResturantStatus().then((response) => {
      if (response) {
        let tempStatus = response.value === 'true';
        const today = moment().format('dddd');
        if (today === 'Monday') tempStatus = true;
        setIsResturantClosed(tempStatus);
      }
    });
  }, []);

  useEffect(() => {
    const total = cart.reduce((a, b) => a + b['quantity'] * b['price'], 0);
    setTotal(total);
    let list = [];
    cart.map((element) => {
      list.push({ id: element._id, quantity: element.quantity });
    });
    setItems(list);
  }, [cart]);

  useEffect(() => {
    if (userSession !== null) {
      setName(userSession.name);
      setEmail(userSession.email);
      setPhone(userSession.mobile);
    }
  }, [userSession]);

  const pleaseLoginHandler = () => {
    dispatch(isCartPageRedirect());
    router.push('/user/login');
  };

  const placeOrderHandler = (paymentToken) => {
    if (cartCount > 0) {
      dispatch(loadingStart());
      apiPool
        .placeOrder({
          name: name,
          email: email,
          mobile: phone,
          billing_address: address,
          items: items,
          payment_token: paymentToken,
          additional_comment: additionalComment
        })
        .then((response) => {
          if (response) {
            setOrder(response);
            dispatch(clearCart());
            setModalShow(true);
          }
        })
        .finally(() => {
          dispatch(loadingStop());
        });
    }
  };

  const register = () => {
    if (cartCount > 0) {
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
            toast.success('Registration Successfull !');
            return true;
          }
          return false;
        })
        .then((isRegistered) => {
          if (isRegistered) setPaymentModalShow(true);
        })
        .finally(() => {
          dispatch(loadingStop());
        });
    }
  };

  return (
    <>
      <Header />
      <Body
        _this={{
          cart,
          cartCount,
          total,
          dispatch,
          incrementQuantity,
          decrementQuantity,
          removeItem,
          userSession,
          name,
          setName,
          email,
          setEmail,
          phone,
          setPhone,
          additionalComment,
          setAdditionalComment,
          address,
          setAddress,
          password,
          setPassword,
          cpassword,
          setCpassword,
          placeOrderHandler,
          pleaseLoginHandler,
          register,
          modalShow,
          setModalShow,
          order,
          paymentModalShow,
          setPaymentModalShow,
          isResturantClosed
        }}
      />
      <Footer />
    </>
  );
};

export default Index;
