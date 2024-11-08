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
  const [editMenuModalVisibility, setEditMenuModalVisibility] = useState(false);
  const [addMenuModalVisibility, setAddMenuModalVisibility] = useState(false);
  const [editMenuData, setEditMenuData] = useState({
    id: '',
    price: '',
    menuName: '',
    menuDescription: '',
    currentPrice: '',
    image_data: '',
    image_prev: ''
  });

  const [menuCategory, setMenuCategory] = useState(null);
  const [addMenuData, setAddMenuData] = useState({
    name: '',
    price: '',
    image_data: '',
    image_prev: '',
    description: ''
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

  const AddNewMenuItem = () => {
    if (
      menuCategory?._id == '' ||
      addMenuData.image_data == '' ||
      addMenuData.name == '' ||
      addMenuData.price == ''
    )
      return toast.warn('Please fill mandatory details !');
    dispatch(loadingStart());

    const formData = new FormData();
    formData.append('name', addMenuData.name);
    formData.append('price', addMenuData.price);
    formData.append('description', addMenuData.description);
    formData.append('category', menuCategory._id);
    if (addMenuData.image_data != '') {
      formData.append('image_data', addMenuData.image_data);
    }

    apiPool
      .addNewMenu(formData)
      .then((response) => {
        if (response) {
          toast.success('New Menu Item added successfully');
          setAddMenuModalVisibility(false);
          setAddMenuData((prev) => ({
            ...prev,
            price: '',
            name: '',
            description: '',
            image_data: '',
            image_prev: ''
          }));
          setMenuCategory(null);
          getMenus(selectedCategory);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
      });
  };

  const updateMenu = () => {
    if (editMenuData.currentPrice === editMenuData.price && editMenuData.image_data == '')
      return toast.warn('No changes applied !');
    dispatch(loadingStart());

    const formData = new FormData();
    formData.append('id', editMenuData.id);
    formData.append('price', editMenuData.price);
    formData.append('menuName', editMenuData.menuName);
    formData.append('menuDescription', editMenuData.menuDescription);
    if (editMenuData.image_data != '') {
      formData.append('image_data', editMenuData.image_data);
    }

    apiPool
      .updateMenuDetails(formData)
      .then((response) => {
        if (response) {
          toast.success('Menu Details updated successfully');
          setEditMenuModalVisibility(false);
          setEditMenuData((prev) => ({
            ...prev,
            id: '',
            price: '',
            currentPrice: '',
            menuDescription: '',
            menuName: '',
            image_data: '',
            image_prev: ''
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
          editMenuModalVisibility,
          setEditMenuModalVisibility,
          editMenuData,
          setEditMenuData,
          updateMenu,
          addMenuData,
          setAddMenuData,
          menuCategory,
          setMenuCategory,
          addMenuModalVisibility,
          setAddMenuModalVisibility,
          AddNewMenuItem
        }}
      />
    </DashboardContainer>
  );
};

export default IsAdmin(Index);
