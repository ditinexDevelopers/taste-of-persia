import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer } from 'components';
import { loadingStart, loadingStop, fillCart, login } from 'redux/action';
import apiPool from 'api';
import Body from './Body';
import { toast } from 'react-toastify';

const Index = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [menus, setMenus] = useState([]);
  const { cart } = useSelector((state) => state.cart);
  const [timings, setTimings] = useState(null);
  // console.log('menu', menus);

  const fetchTimings = () => {
    dispatch(loadingStart());
    apiPool
      .GetResturantTimes()
      .then((response) => {
        if (response) {
          setTimings(response.value);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  useEffect(() => {
    fetchTimings();
  }, []);

  const addToCart = (i) => {
    toast.success('Item Added To Cart.');
    const value = { ...i, quantity: 1 };
    const temp = [...new Map([...cart, value].map((item) => [item['_id'], item])).values()];
    dispatch(fillCart(temp));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getMenus(selectedCategory);
  }, [selectedCategory]);

  const getMenus = (selectedCategory) => {
    dispatch(loadingStart());
    apiPool
      .getMenus(selectedCategory)
      .then((response) => {
        if (response) setMenus(response);
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const getCategories = () => {
    //dispatch(loadingStart());
    apiPool
      .getCategories()
      .then((response) => {
        if (response) setCategories(response);
      })
      .finally(() => {
        //dispatch(loadingStop());
      });
  };

  return (
    <>
      <Header />
      <Body
        _this={{
          categories,
          selectedCategory,
          setSelectedCategory,
          menus,
          addToCart,
          cart,
          timings
        }}
      />
      <Footer />
    </>
  );
};

export default Index;
