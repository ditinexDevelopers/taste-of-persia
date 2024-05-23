import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
};

const cartData = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    fillCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    loadCartFromLocal: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    incrementQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id == action.payload.id && item.ind == action.payload.ind) {
          return { ...item, quantity: item.quantity + 1 };
        } else if (item._id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decrementQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id == action.payload.id && item.ind == action.payload.ind) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else return item;
        } else if (item._id === action.payload) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => {
        // If 'ind' is provided, match both '_id' and 'ind'
        if (action.payload.ind !== undefined) {
          return !(item._id === action.payload.id && item.ind === action.payload.ind);
        }
        // If 'ind' is not provided, match only '_id'
        return item._id !== action.payload;
      });
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    }
  }
});

export const cartActions = cartData.actions;
export default cartData.reducer;
