import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducers from "./reducers/products";
import authReducers from "./reducers/user";
import cartReducers from "./reducers/cart";
import favouriteReducers from "./reducers/favourite";
import orderReducers from "./reducers/order";

interface IReducers {
  products?: any;
  productDetails?: any;
  user?: any;
  profile?: any;
  cart?: any;
  favourite?: any;
  order?: any;
  myOrder?: any;
  myOrderDetails?: any;
  newReview?: any;
  createProduct?: any;
  deleteProduct?: any;
  allOrders?: any;
  deleteOrder?: any;
  allUsers: any;
  userDetails: any;
  deleteReview: any;
  productReviews: any;
  forgotPassword: any;
}

const reducer = combineReducers({
  products: productReducers.products,
  productDetails: productReducers.productDetails,
  user: authReducers.user,
  profile: authReducers.profile,
  cart: cartReducers.cart,
  favourite: favouriteReducers.favourite,
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

const initialState = {
  products: productReducers.products,

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems") as string)
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo") as string)
      : {},
  },
  favourite: {
    favouriteItems: localStorage.getItem("favouriteItems")
      ? JSON.parse(localStorage.getItem("favouriteItems") as string)
      : [],
  },
};

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
