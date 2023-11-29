import { Footer, Header } from 'components';
import React, { useEffect, useState } from 'react';
import Body from './Body';
import { useSelector, useDispatch } from 'react-redux';
import { loadingStart, loadingStop, login, logout } from 'redux/action';
import apiPool from 'api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import IsAuthenticated from 'hoc/IsAuthenticated';

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userSession } = useSelector((state) => state.session);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [password, setPassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [orderHistory, setorderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (userSession !== null) {
      setName(userSession.name);
      setEmail(userSession.email);
      setPhone(userSession.mobile);
    }
  }, [userSession]);

  useEffect(() => {
    fetchOrderList();
  }, []);

  const onUpdate = () => {
    dispatch(loadingStart());
    apiPool
      .userUpdate({
        id: userSession._id,
        name: name,
        email: email,
        mobile: phone
      })
      .then((response) => {
        if (response) {
          dispatch(login(response));
          toast.success('Profile Updated Successfully.');
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };
  const fetchOrderList = () => {
    dispatch(loadingStart());
    apiPool
      .getMyOrder()
      .then((response) => {
        if (response) {
          setorderHistory(response);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const showModal = () => setModalVisibility(true);
  const hideModal = () => setModalVisibility(false);

  const onLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  const changePassword = () => {
    dispatch(loadingStart());
    apiPool
      .updatePassword({
        password: password,
        cpassword: cpassword
      })
      .then((response) => {
        if (response) {
          toast.success('Password Changed Successfully.');
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  return (
    <>
      <Header />
      <Body
        _this={{
          name,
          setName,
          email,
          setEmail,
          phone,
          setPhone,
          modalVisibility,
          password,
          setPassword,
          cpassword,
          setcpassword,
          onUpdate,
          changePassword,
          showModal,
          hideModal,
          onLogout,
          orderHistory,
          selectedOrder,
          setSelectedOrder,
          userSession
        }}
      />
      <Footer />
    </>
  );
};

export default IsAuthenticated(Index);
