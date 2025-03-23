import { ProductConstants } from "../../constans/product";

const products = (state = { products: [] }, action) => {
  switch (action.type) {
    case ProductConstants.ALL_PRODUCT_REQUEST:
    case ProductConstants.ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ProductConstants.ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case ProductConstants.ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ProductConstants.ALL_PRODUCT_FAIL:
    case ProductConstants.ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const productDetails = (state = { product: {} }, action) => {
  switch (action.type) {
    case ProductConstants.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ProductConstants.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case ProductConstants.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Product review
const newReview = (state = {}, action) => {
  switch (action.type) {
    case ProductConstants.NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case ProductConstants.NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// New Product ----Admin
const newProduct = (state = { product: {} }, action) => {
  switch (action.type) {
    case ProductConstants.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case ProductConstants.NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Delete Product
const deleteProduct = (state = {}, action) => {
  switch (action.type) {
    case ProductConstants.DELETE_PRODUCT_REQUEST:
    case ProductConstants.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case ProductConstants.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case ProductConstants.DELETE_PRODUCT_FAIL:
    case ProductConstants.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case ProductConstants.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// All reviews --- Admin
const productReviews = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ProductConstants.ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ProductConstants.ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Delete Review ----- Admin
const deleteReview = (state = {}, action) => {
  switch (action.type) {
    case ProductConstants.DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case ProductConstants.DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ProductConstants.DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default {
  deleteProduct,
  deleteReview,
  newProduct,
  newReview,
  productDetails,
  productReviews,
  products,
};
