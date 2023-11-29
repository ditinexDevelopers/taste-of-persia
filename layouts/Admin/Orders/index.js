import React, { useState, useEffect } from 'react';
import Body from './Body';
import { DashboardContainer } from 'components';
import apiPool from 'api';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from 'redux/action';
import IsAdmin from 'hoc/IsAdmin';

const Index = () => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrderList();
  }, [page]);

  const fetchOrderList = () => {
    dispatch(loadingStart());
    apiPool
      .getAllOrders(page)
      .then((response) => {
        if (response) {
          setOrderData(response.data);
          if (response.pageSize) setTotalPages(response.pageSize);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const pageIncrement = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const pageDecrement = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <DashboardContainer>
      <Body
        _this={{
          totalPages,
          orderData,
          page,
          setPage,
          pageIncrement,
          pageDecrement
        }}
      />
    </DashboardContainer>
  );
};

export default IsAdmin(Index);
