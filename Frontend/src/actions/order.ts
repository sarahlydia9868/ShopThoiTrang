import axios from "axios";
import { OrderConstants } from "../constans/order";

// Create Order
export const createOrder =
  (cartItems: CartItem[], shippingAddress: ShippingAddress, totalPrice: number, id: string) =>
  async (dispatch: (arg0: { type: OrderConstants; payload?: OrderModel; message?: string }) => void) => {
    try {
      dispatch({ type: OrderConstants.CREATE_ORDER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/orders/create-order", { cartItems, shippingAddress, totalPrice, id }, config);
      dispatch({ type: OrderConstants.CREATE_ORDER_SUCCESS, payload: data.data, message: data.message });
    } catch (error: any) {
      dispatch({
        type: OrderConstants.CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// My Orders
export const myOrders = (id: string) => async (dispatch: (arg0: { type: OrderConstants; payload?: OrderModel; message?: string }) => void) => {
  try {
    dispatch({ type: OrderConstants.MY_ORDERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/orders/orders-user/`, { id }, config);
    dispatch({ type: OrderConstants.MY_ORDERS_SUCCESS, payload: data.data, message: data.message });
  } catch (error: any) {
    dispatch({
      type: OrderConstants.MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id: string) => async (dispatch: (arg0: { type: OrderConstants; payload?: OrderModel; message?: string }) => void) => {
  try {
    dispatch({ type: OrderConstants.ORDER_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/orders/get`, { id }, config);
    console.log(data);
    dispatch({ type: OrderConstants.ORDER_DETAILS_SUCCESS, payload: data.data, message: data.message });
  } catch (error: any) {
    dispatch({
      type: OrderConstants.ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// All order  -----Admin
export const getAllOrders = () => async (dispatch: (arg0: { type: OrderConstants; payload?: OrderModel; message?: string }) => void) => {
  try {
    dispatch({ type: OrderConstants.ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/orders");

    dispatch({ type: OrderConstants.ALL_ORDERS_SUCCESS, payload: data.data, message: data.message });
  } catch (error: any) {
    dispatch({
      type: OrderConstants.ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id: string, progress: string) => async (dispatch: (arg0: { type: OrderConstants; payload?: OrderModel; message?: string }) => void) => {
  try {
    dispatch({ type: OrderConstants.UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/orders/update-progress`, {id, progress}, config);

    dispatch({ type: OrderConstants.UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error: any) {
    dispatch({
      type: OrderConstants.UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sendOrderMail = (userID: string, title: string, content: string) => async (dispatch: (arg0: { type: OrderConstants; payload?: OrderModel; message?: string }) => void) => {
  try {
    dispatch({ type: OrderConstants.ORDER_MAIL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/orders/send-mail`, {userID, title, content}, config);

    dispatch({ type: OrderConstants.ORDER_MAIL_SUCCESS, payload: data.success });
  } catch (error: any) {
    dispatch({
      type: OrderConstants.ORDER_MAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch: (arg0: { type: OrderConstants; payload?: OrderModel; message?: string }) => void) => {
  try {
    dispatch({ type: OrderConstants.DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/orders/${id}`);

    dispatch({ type: OrderConstants.DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error: any) {
    dispatch({
      type: OrderConstants.DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch: (arg0: { type: OrderConstants; payload?: OrderModel; message?: string }) => void) => {
  dispatch({ type: OrderConstants.CLEAR_ERRORS });
};
