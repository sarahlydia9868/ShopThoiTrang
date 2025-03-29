import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducers from "./reducers/products";
import authReducers from "./reducers/user";
import cartReducers from "./reducers/cart";
import orderReducers from "./reducers/order";

const reducer = combineReducers({
  products: productReducers.products,
  productDetails: productReducers.productDetails,
  user: authReducers.user,
  profile: authReducers.profile,
  cart: cartReducers.cart,
  order: orderReducers.newOrder,
  myOrder: orderReducers.myOrders,
  myOrderDetails: orderReducers.orderDetails,
  newReview: productReducers.newReview,
  createProduct: productReducers.newProduct,
  deleteProduct: productReducers.deleteProduct,
  allOrders: orderReducers.allOrders,
  deleteOrder: orderReducers.order,
  allUsers: authReducers.allUsers,
  userDetails: authReducers.userDetails,
  deleteReview: productReducers.deleteReview,
  productReviews: productReducers.productReviews,
  forgotPassword: authReducers.forgotPassword,
});

const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: null
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
