import React, { useState, useEffect } from 'react';
import Body from './Body';
import { DashboardContainer } from 'components';
import apiPool from 'api';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from 'redux/action';
import IsAdmin from 'hoc/IsAdmin';
import { toast } from 'react-toastify';

const Index = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [menus, setMenus] = useState([]);
  const [editPriceModalVisibility, setEditPriceModalVisibility] = useState(false);
  const [editPriceData, setEditPriceData] = useState({
    id: '',
    price: '',
    menuName: '',
    currentPrice: ''
  });

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getMenus(selectedCategory);
  }, [selectedCategory]);

  const getMenus = (selectedCategory) => {
    dispatch(loadingStart());
    apiPool
      .getAllMenus(selectedCategory)
      .then((response) => {
        if (response) setMenus(response);
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const getCategories = () => {
    apiPool
      .getCategories()
      .then((response) => {
        if (response) setCategories(response);
      })
      .finally(() => {});
  };

  const updateAvailability = (menuId, menuStatus) => {
    dispatch(loadingStart());
    apiPool
      .updateAvailable(menuId, menuStatus)
      .then((response) => {
        if (response) {
          getMenus(selectedCategory);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const updateMenuPrice = () => {
    dispatch(loadingStart());
    apiPool
      .updateMenuPrice(editPriceData)
      .then((response) => {
        if (response) {
          toast.success('Price updated successfully');
          setEditPriceModalVisibility(false);
          setEditPriceData((prev) => ({
            ...prev,
            id: '',
            price: '',
            currentPrice: '',
            menuName: ''
          }));
          getMenus(selectedCategory);
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
          categories,
          selectedCategory,
          setSelectedCategory,
          menus,
          updateAvailability,
          editPriceModalVisibility,
          setEditPriceModalVisibility,
          editPriceData,
          setEditPriceData,
          updateMenuPrice
        }}
      />
    </DashboardContainer>
  );
};

export default IsAdmin(Index);
