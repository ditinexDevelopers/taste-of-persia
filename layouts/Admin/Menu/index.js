import React, { useState, useEffect } from 'react';
import Body from './Body';
import { DashboardContainer } from 'components';
import apiPool from 'api';
import { useDispatch } from 'react-redux';
import { loadingStart, loadingStop } from 'redux/action';
import IsAdmin from 'hoc/IsAdmin';

const Index = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [menus, setMenus] = useState([]);

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

  const updateAvailability = async (menuId, menuStatus) => {
    dispatch(loadingStart());
    try {
      const response = await apiPool.updateAvailable(menuId, menuStatus);
      dispatch(loadingStop());
      return response;
    } catch (e) {
      dispatch(loadingStop());
      return false;
    }
  };

  return (
    <DashboardContainer>
      <Body
        _this={{
          categories,
          selectedCategory,
          setSelectedCategory,
          menus,
          updateAvailability
        }}
      />
    </DashboardContainer>
  );
};

export default IsAdmin(Index);
