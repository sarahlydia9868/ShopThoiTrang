import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducers from "./reducers/product";
import authReducers from "./reducers/user";
import cartReducers from "./reducers/cart";
import orderReducers from "./reducers/order";
import collectionReducers from "./reducers/collection";

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
  newProduct: productReducers.newProduct,
  createProduct: productReducers.newProduct,
  deleteProduct: productReducers.deleteProduct,
  allOrders: orderReducers.allOrders,
  updateOrder: orderReducers.updateOrder,
  payOrder: orderReducers.payOrder,
  allUsers: authReducers.allUsers,
  deleteReview: productReducers.deleteReview,
  productReviews: productReducers.productReviews,
  collections: collectionReducers.collections,
  newCollection: collectionReducers.newCollection,
  collectionDetail: collectionReducers.collectionDetail,
  deleteCollection: collectionReducers.deleteCollection,
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: null,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
