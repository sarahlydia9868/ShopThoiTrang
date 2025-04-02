import { OrderConstants } from "../../constans/order";

export interface IOrderRoot {
  loading?: boolean;
  error?: boolean;
  order?: OrderModel;
  message?: string;
  success?: boolean;
}

const newOrder = (state = {}, action: { type: OrderConstants; payload?: OrderModel; message?: string }): IOrderRoot => {
  switch (action.type) {
    case OrderConstants.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OrderConstants.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
        message: action.message,
      };

    case OrderConstants.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: true,
        message: action.message,
      };
    case OrderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export interface IMyOrderRoot {
  loading?: boolean;
  error?: boolean;
  orders?: OrderModel[];
  message?: string;
  success?: boolean;
}

const myOrders = (state = { orders: [] }, action: { type: OrderConstants; payload?: OrderModel[]; message?: string }): IMyOrderRoot => {
  switch (action.type) {
    case OrderConstants.MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case OrderConstants.MY_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
        message: action.message,
      };

    case OrderConstants.MY_ORDERS_FAIL:
      return {
        loading: false,
        error: true,
        message: action.message,
      };
    case OrderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export interface IOrderDetailsRoot {
  loading?: boolean;
  error?: boolean;
  order?: OrderModel;
  message?: string;
  success?: boolean;
}

const orderDetails = (state = { order: {} }, action: { type: OrderConstants; payload?: OrderModel; message?: string }) => {
  switch (action.type) {
    case OrderConstants.ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case OrderConstants.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        message: action.message,
      };

    case OrderConstants.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: true,
        message: action.message,
      };
    case OrderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export interface IOrdersRoot {
  loading?: boolean;
  error?: boolean;
  orders?: OrderModel[];
  message?: string;
  success?: boolean;
}

// All Orders ------ Admin
const allOrders = (state = { orders: [] }, action: { type: OrderConstants; payload?: OrderModel[]; message?: string }): IOrdersRoot => {
  switch (action.type) {
    case OrderConstants.ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case OrderConstants.ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
        message: action.message
      };

    case OrderConstants.ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: true,
      };
    case OrderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export interface IUpdateOrderRoot {
  loading?: boolean,
  isUpdated?: boolean,
  isDeleted?: boolean,
  error?: boolean
}

const updateOrder = (state = {}, action: { type: OrderConstants; payload?: OrderModel; message?: string }): IUpdateOrderRoot => {
  switch (action.type) {
    case OrderConstants.UPDATE_ORDER_REQUEST:
    case OrderConstants.DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case OrderConstants.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case OrderConstants.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case OrderConstants.UPDATE_ORDER_FAIL:
    case OrderConstants.DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case OrderConstants.UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case OrderConstants.DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case OrderConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export default {
  newOrder,
  myOrders,
  orderDetails,
  allOrders,
  updateOrder,
};
