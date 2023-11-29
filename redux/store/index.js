import { configureStore } from '@reduxjs/toolkit';
import session from 'redux/reducer/session';
import cart from 'redux/reducer/cart';

export default configureStore({
  reducer: {
    session,
    cart
  }
});
