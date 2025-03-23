import orderConstans from "../../constans/order";

const newOrder = (state = {}, action) => {
  switch (action.type) {
    case orderConstans.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderConstans.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case orderConstans.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const myOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstans.MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case orderConstans.MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case orderConstans.MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const orderDetails = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderConstans.ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case orderConstans.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case orderConstans.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// All Orders ------ Admin
const allOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstans.ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case orderConstans.ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case orderConstans.ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const order = (state = {}, action) => {
  switch (action.type) {
    case orderConstans.UPDATE_ORDER_REQUEST:
    case orderConstans.DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderConstans.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case orderConstans.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case orderConstans.UPDATE_ORDER_FAIL:
    case orderConstans.DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case orderConstans.UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case orderConstans.DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case orderConstans.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
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
  order,
};
