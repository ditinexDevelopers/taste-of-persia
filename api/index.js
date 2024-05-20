import { api, handleResponse, getToken } from './core';

const apiPool = {
  getCategories: async () => {
    let response = null;
    try {
      response = await api.get('/v1/menu/get-categories');
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  getMenus: async (data) => {
    let response = null;
    try {
      response = await api.get(
        data != '' ? '/v1/menu/get-menu-details-by-category/' + data : '/v1/menu/get-menu-details'
      );
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  userLogin: async (data) => {
    let response = null;
    try {
      response = await api.post('/v1/auth/login', data);
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  userSignup: async (data) => {
    let response = null;
    try {
      response = await api.post('/v1/auth/signup', data);
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  userUpdate: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.post('/v1/auth/update-profile', data, {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },

  updatePassword: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.post('/v1/auth/change-password', data, {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  getMyOrder: async () => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.get('/v1/order/my-orders', {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  placeOrder: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.post('/v1/order/place-order', data, {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  /*
   * Admin APIs
   */
  updatePushToken: async (push_token) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.post(
        '/v1/auth/update-push-token',
        { token: push_token },
        {
          params: {},
          headers: { Authorization: 'Bearer: ' + token }
        }
      );
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  getAllOrders: async (page = 1) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.get('/v1/order/all-orders/' + page, {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  pendingOrders: async () => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.get('/v1/order/pending-orders/', {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  updateOrdersStatus: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.post('/v1/order/update-order-status', data, {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  getStats: async () => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.get('/v1/order/stats', {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  setResturantStatus: async (status) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.get('/v1/order/set-resturant-status/' + status, {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  getResturantStatus: async () => {
    let response = null;
    try {
      response = await api.get('/v1/order/get-resturant-status');
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  updateAvailable: async (menuId, status) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.get('/v1/menu/update-menu/' + menuId + '/' + status, {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
<<<<<<< HEAD
  updateMenuDetails: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.post('/v1/menu/edit-menu-details', data, {
        params: {},
        headers: { Authorization: 'Bearer: ' + token, 'Content-Type': 'multipart/form-data' }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  GetResturantTimes: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.get('/v1/order/get-resturant-timings', {
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  UpdateResturantTimes: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.post('/v1/order/update-resturant-timings', data, {
=======
  updateMenuPrice: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.post('/v1/menu/edit-menu-price', data, {
>>>>>>> 9cdd794aceaf2ea3b27f9681961088dd10dfb9ab
        params: {},
        headers: { Authorization: 'Bearer: ' + token }
      });
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  },
  getAllMenus: async (data) => {
    const token = await getToken();
    let response = null;
    try {
      response = await api.get(
        data != ''
          ? '/v1/menu/get-all-menu-details-by-category/' + data
          : '/v1/menu/get-all-menu-details',
        {
          params: {},
          headers: { Authorization: 'Bearer: ' + token }
        }
      );
    } catch (e) {
      response = e;
    }
    return handleResponse(response);
  }
};

export default apiPool;
