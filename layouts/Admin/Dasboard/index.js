import React, { useEffect, useState } from 'react';
import { DashboardContainer } from 'components';
import { loadingStart, loadingStop } from 'redux/action';
import apiPool from 'api';
import { toast } from 'react-toastify';
import Body from './Body';
import { useDispatch } from 'react-redux';
import IsAdmin from 'hoc/IsAdmin';
import firebaseCloudMessaging from 'hooks/firebase';

const Index = () => {
  const dispatch = useDispatch();
  const [orderHistory, setOrderHistory] = useState([]);
  const [stats, setStats] = useState({
    orders_daily: 0,
    orders_monthly: 0,
    signup_daily: 0,
    signup_monthly: 0,
    revenue_daily: 0,
    revenue_monthly: 0,
    daily_transaction: 0,
    monthly_transaction: 0
  });
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isResturantClosed, setIsResturantClosed] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [editTimingModalOpen, setEditTimingModalOpen] = useState(false);
  const [timings, setTimings] = useState(null);
  const [editTimings, setEditTimings] = useState({
    'tue-fri': { opens: '', closed: '' },
    'sat-sun': { opens: '', closed: '' }
  });
  const [modalVisibility, setModalVisibility] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // useEffect(() => {
  //   try {
  //     if (Notification.permission !== 'granted') setPermissionModal(true);
  //     else updatePushToken();
  //   } catch (e) {
  //     alert(e);
  //   }
  // }, []);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (!isUpdatingStatus) onRefresh();
    }, 30000);
    onRefresh();
    fetchStats();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    apiPool.getResturantStatus().then((response) => {
      if (response) {
        setIsResturantClosed(response.value === 'true');
      }
    });
    fetchTimings();
  }, []);

  useEffect(() => {
    dispatch(loadingStart());
    apiPool
      .setResturantStatus(isResturantClosed)
      .then((response) => {})
      .finally(() => {
        dispatch(loadingStop());
      });
  }, [isResturantClosed]);

  const onPermissionButtonClick = () => {
    try {
      setPermissionModal(false);
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          updatePushToken();
        } else {
          toast.error('Notification permission is denied. Please allow from browser header.');
          setPermissionModal(true);
        }
      });
    } catch (e) {
      alert(e);
    }
  };

  const updatePushToken = async () => {
    try {
      const token = await firebaseCloudMessaging.getToken();
      apiPool.updatePushToken(token).then((response) => {});
    } catch (e) {
      alert(e);
    }
  };

  const onToggle = () => {
    setIsResturantClosed((prev) => !prev);
  };

  const fetchOrderList = () => {
    dispatch(loadingStart());
    apiPool
      .pendingOrders()
      .then((response) => {
        if (response) {
          setOrderHistory(response);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const onRefresh = () => {
    fetchOrderList();
  };

  const updateOrderStatus = (data) => {
    dispatch(loadingStart());
    apiPool
      .updateOrdersStatus(data)
      .then((response) => {
        if (response) {
          setOrderHistory(response);
          setShowModal(false);
          setIsUpdatingStatus(false);
          toast.success('Order updated successfully!');
        }
      })
      .then(() => {
        fetchStats();
      });
  };

  const fetchStats = () => {
    dispatch(loadingStart());
    apiPool
      .getStats()
      .then((response) => {
        if (response) {
          setStats(response);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const fetchTimings = () => {
    dispatch(loadingStart());
    apiPool
      .GetResturantTimes()
      .then((response) => {
        if (response) {
          setTimings(response.value);
          setEditTimings({
            'tue-fri': response.value['tue-fri'],
            'sat-sun': response.value['sat-sun']
          });
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };
  const updateTimings = () => {
    if (
      (editTimings['sat-sun'].opens == timings['sat-sun'].opens && editTimings['sat-sun'].closed) ==
        timings['sat-sun'].closed &&
      editTimings['tue-fri'].opens == timings['tue-fri'].opens &&
      editTimings['tue-fri'].closed == timings['tue-fri'].closed
    )
      return toast.warn('Previos and Edited Time should be different');

    if (
      (editTimings['sat-sun'].opens == '' && editTimings['sat-sun'].closed) == '' &&
      editTimings['tue-fri'].opens == '' &&
      editTimings['tue-fri'].closed == ''
    )
      return toast.warn('Time should not be empty!');
    dispatch(loadingStart());
    apiPool
      .UpdateResturantTimes(editTimings)
      .then((response) => {
        if (response) {
          toast.success('Times changed successfully!');
          setEditTimingModalOpen(false);
          fetchTimings();
          setEditTimings((prev) => ({
            ...prev,
            'tue-fri': { opens: '', closed: '' },
            'sat-sun': { opens: '', closed: '' }
          }));
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  return (
    <DashboardContainer>
      <Body
        _this={{
          orderHistory,
          onRefresh,
          selectedOrder,
          setSelectedOrder,
          showModal,
          setShowModal,
          updateOrderStatus,
          setIsUpdatingStatus,
          stats,
          isResturantClosed,
          onToggle,
          permissionModal,
          setPermissionModal,
          onPermissionButtonClick,
          setEditTimingModalOpen,
          editTimingModalOpen,
          editTimings,
          timings,
          setEditTimings,
          updateTimings,
          modalVisibility,
          setModalVisibility,
          orderDetails,
          setOrderDetails
        }}
      />
    </DashboardContainer>
  );
};

export default IsAdmin(Index);
