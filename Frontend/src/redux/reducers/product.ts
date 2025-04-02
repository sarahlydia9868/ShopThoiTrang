import { ProductConstants } from "../../constans/product";

export interface IProductRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  products?: ProductModel[];
  productsCount?: number;
  currentCount?: number;
}

const products = (state = { products: [] }, action: { type: ProductConstants; payload?: ProductModel[]; productsCount?: number;  currentCount?: number; message?: string }): IProductRoot => {
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
        products: action.payload,
        productsCount: action.productsCount,
        currentCount: action.currentCount
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
        error: true,
        message: action.message,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export interface IProductDetailsRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  product?: ProductModel;
}

const productDetails = (state = {}, action: { type: ProductConstants; payload?: ProductModel; message?: string }): IProductDetailsRoot => {
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
        error: true,
        message: action.message,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
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


export interface INewProductRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  success?: boolean;
}

// New Product ----Admin
const newProduct = (state = { }, action: { type: ProductConstants; message?: string }): INewProductRoot => {
  switch (action.type) {
    case ProductConstants.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductConstants.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.message,
      };
    case ProductConstants.NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };
    case ProductConstants.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export interface IDeleteProductRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  isDeleted?: boolean;
}


// Delete Product
const deleteProduct = (state = {}, action:  { type: ProductConstants; message?: string }) => {
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
        isDeleted: true,
        message: action.message,
      };

    case ProductConstants.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        message: action.message,
      };
    case ProductConstants.DELETE_PRODUCT_FAIL:
    case ProductConstants.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };
    case ProductConstants.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
        message: action.message,
      };
    case ProductConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
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
