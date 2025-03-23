import axios from "axios";
import productConstans from "../constans/product";

export const getProduct =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: productConstans.ALL_PRODUCT_REQUEST,
      });

      let link = `/api/v2/products?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v2/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: productConstans.ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: productConstans.ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstans.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v2/product/${id}`);

    dispatch({
      type: productConstans.PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error: any) {
    dispatch({
      type: productConstans.PRODUCT_DETAILS_FAIL,
      payload: error.response.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: productConstans.NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v2/product/review`,
      reviewData,
      config
    );

    dispatch({
      type: productConstans.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: productConstans.NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product --------Admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: productConstans.NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v2/product/new`,
      productData,
      config
    );

    dispatch({
      type: productConstans.NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: productConstans.NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Products -----Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: productConstans.ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v2/admin/products");

    dispatch({
      type: productConstans.ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error: any) {
    dispatch({
      type: productConstans.ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product ------Admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstans.DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v2/product/${id}`);

    dispatch({
      type: productConstans.DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: productConstans.DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: productConstans.UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v2/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: productConstans.UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: productConstans.UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstans.ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v2/reviews?id=${id}`);

    dispatch({
      type: productConstans.ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error: any) {
    dispatch({
      type: productConstans.ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product ------ Admin
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: productConstans.DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v2/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: productConstans.DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: productConstans.DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//   Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: productConstans.CLEAR_ERRORS,
  });
};
