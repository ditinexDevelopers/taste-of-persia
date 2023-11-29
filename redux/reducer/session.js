import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userSession: '',
  isLoading: false,
  isNavbarExpanded: true,
  isCartPage: false
};

const sessionData = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingStop: (state) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.userSession = action.payload;
      localStorage.setItem('userSession', JSON.stringify(state.userSession));
    },
    logout: (state) => {
      state.userSession = null;
      localStorage.removeItem('userSession');
      localStorage.removeItem('cart');
      localStorage.clear();
    },
    signup: (state, action) => {
      state.userSession = action.payload;
      localStorage.setItem('userSession', JSON.stringify(state.userSession));
    },
    navbarToggle: (state, action) => {
      state.isNavbarExpanded = action.payload;
    },
    loadSessionFromLocal: (state, action) => {
      state.userSession = action.payload;
    },
    isCartPageRedirect: (state) => {
      state.isCartPage = true;
    }
  }
});

export const sessionActions = sessionData.actions;
export default sessionData.reducer;
