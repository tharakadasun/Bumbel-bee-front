import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import cartSlice from './cart/cartSlice';
import productSlice from './product/productSlice';
export const store = configureStore({
  reducer: {
    products: productSlice,
    user:authSlice,
    cart:cartSlice
  },
});
