import { sessionActions } from 'redux/reducer/session';
import { cartActions } from 'redux/reducer/cart';

// Actions from SessionReducer
export const {
  loadingStart,
  loadingStop,
  login,
  logout,
  signup,
  navbarToggle,
  loadSessionFromLocal,
  isCartPageRedirect
} = sessionActions;
export const {
  fillCart,
  loadCartFromLocal,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart
} = cartActions;
