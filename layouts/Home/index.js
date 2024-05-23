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
  const [optionsMenuModalVisibility, setOptionsMenuModalVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const addToCart = (i, ind = null) => {
    toast.success('Item Added To Cart.');
    //modify a little so for 657d59744ee5b6cea853c16b && 657d5a0f4ee5b6cea853c16c (4 or 8 platters and price ko accordingly modify karna hoga)
    const value = { ...i, quantity: 1, ind };
    const temp = [
      ...new Map([...cart, value].map((item) => [`${item._id}_${item.ind}`, item])).values()
    ];
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
          timings,
          setOptionsMenuModalVisibility,
          optionsMenuModalVisibility,
          selectedItem,
          setSelectedItem
        }}
      />
      <Footer />
    </>
  );
};

export default Index;
