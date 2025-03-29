import axios from "axios";
import { ProductConstants } from "../constans/product";

export const getProduct = (keyword = "", currentPage = 1, category?: string) =>
  async (dispatch: (arg0: { type: ProductConstants; payload?: ProductModel[]; resultPerPage?: number; }) => void) => {
    try {
      dispatch({
        type: ProductConstants.ALL_PRODUCT_REQUEST,
      });

      let link = `/api/products/?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/products/?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: ProductConstants.ALL_PRODUCT_SUCCESS,
        payload: data.data,
        resultPerPage: data.resultPerPage
        
      });
    } catch (error: any) {
      dispatch({
        type: ProductConstants.ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products Details
export const getProductDetails = (id: string) => async (dispatch: (arg0: { type: ProductConstants; payload?: ProductModel; message?: string }) => void) => {

  try {
    
    dispatch({ type: ProductConstants.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: ProductConstants.PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error: any) {
    dispatch({
      type: ProductConstants.PRODUCT_DETAILS_FAIL,
      message: error.response.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData: any) => async (dispatch: (arg0: { type: ProductConstants; payload?: any; }) => void) => {
  try {
    dispatch({ type: ProductConstants.NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v2/product/review`, reviewData, config);

    dispatch({
      type: ProductConstants.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: ProductConstants.NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product --------Admin
export const createProduct = (productData: any) => async (dispatch: (arg0: { type: ProductConstants; payload?: any; }) => void) => {
  try {
    dispatch({ type: ProductConstants.NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v2/product/new`, productData, config);

    dispatch({
      type: ProductConstants.NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ProductConstants.NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Products -----Admin
export const getAdminProduct = () => async (dispatch: (arg0: { type: ProductConstants; payload?: any; }) => void) => {
  try {
    dispatch({ type: ProductConstants.ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v2/admin/products");

    dispatch({
      type: ProductConstants.ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error: any) {
    dispatch({
      type: ProductConstants.ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product ------Admin
export const deleteProduct = (id: any) => async (dispatch: (arg0: { type: ProductConstants; payload?: any; }) => void) => {
  try {
    dispatch({ type: ProductConstants.DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v2/product/${id}`);

    dispatch({
      type: ProductConstants.DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: ProductConstants.DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id: any, productData: any) => async (dispatch: (arg0: { type: ProductConstants; payload?: any; }) => void) => {
  try {
    dispatch({ type: ProductConstants.UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v2/product/${id}`, productData, config);

    dispatch({
      type: ProductConstants.UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: ProductConstants.UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id: any) => async (dispatch: (arg0: { type: ProductConstants; payload?: any; }) => void) => {
  try {
    dispatch({ type: ProductConstants.ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v2/reviews?id=${id}`);

    dispatch({
      type: ProductConstants.ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error: any) {
    dispatch({
      type: ProductConstants.ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product ------ Admin
export const deleteReviews = (reviewId: any, productId: any) => async (dispatch: (arg0: { type: ProductConstants; payload?: any; }) => void) => {
  try {
    dispatch({ type: ProductConstants.DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(`/api/v2/reviews?id=${reviewId}&productId=${productId}`);

    dispatch({
      type: ProductConstants.DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: ProductConstants.DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   Clearing errors
export const clearErrors = () => async (dispatch: (arg0: { type: ProductConstants; }) => void) => {
  dispatch({
    type: ProductConstants.CLEAR_ERRORS,
  });
};
