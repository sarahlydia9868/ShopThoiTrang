import axios from "axios";
import orderConstans from "../constans/order";
import authConstans from "../constans/user";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: orderConstans.CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v2/order/new", order, config);

    dispatch({ type: orderConstans.CREATE_ORDER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: orderConstans.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// My Orders
export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: orderConstans.MY_ORDERS_REQUEST });
  
      const { data } = await axios.get("/api/v2/orders/me");
  
      dispatch({ type: orderConstans.MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error: any) {
      dispatch({
        type:orderConstans. MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: orderConstans.ORDER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v2/order/${id}`);
  
      dispatch({ type: orderConstans.ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error: any) {
      dispatch({
        type: orderConstans.ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


// All order  -----Admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: orderConstans.ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v2/admin/orders");

    dispatch({ type: orderConstans.ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error: any) {
    dispatch({
      type: orderConstans.ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: orderConstans.UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v2/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: orderConstans.UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error: any) {
    dispatch({
      type: orderConstans.UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: orderConstans.DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v2/admin/order/${id}`);

    dispatch({ type: orderConstans.DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error: any) {
    dispatch({
      type: orderConstans.DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

 
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: authConstans.CLEAR_ERRORS });
};
