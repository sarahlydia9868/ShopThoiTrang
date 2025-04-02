import axios from "axios";
import { CollectionConstans } from "../constans/collection";

export const getAllCollection = () => async (dispatch: (arg0: { type: CollectionConstans; payload?: CollectionModel[]; message?: string }) => void) => {
  try {
    dispatch({
      type: CollectionConstans.ALL_COLLECTION_REQUEST,
    });

    const { data } = await axios.get("/api/collections/");
    dispatch({
      type: CollectionConstans.ALL_COLLECTION_SUCCESS,
      payload: data.data,
      message: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: CollectionConstans.ALL_COLLECTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Collection Details
export const getCollectionDetail = (id: string) => async (dispatch: (arg0: { type: CollectionConstans; payload?: CollectionModel; message?: string }) => void) => {
  try {
    dispatch({ type: CollectionConstans.COLLECTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/collections/${id}`);
    dispatch({
      type: CollectionConstans.COLLECTION_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error: any) {
    dispatch({
      type: CollectionConstans.COLLECTION_DETAILS_FAIL,
      message: error.response.message,
    });
  }
};

// Create Collecion --------Admin
export const createCollection = (collection: CollectionModel) => async (dispatch: (arg0: { type: CollectionConstans; message?: string }) => void) => {
  try {
    dispatch({ type: CollectionConstans.NEW_COLLECTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/collections/new`, { collection }, config);

    dispatch({
      type: CollectionConstans.NEW_COLLECTION_SUCCESS,
      message: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: CollectionConstans.NEW_COLLECTION_FAIL,
      message: error.response.data.message,
    });
  }
};

// Delete Collecion ------Admin
export const deleteCollection = (id: string) => async (dispatch: (arg0: { type: CollectionConstans; message?: string }) => void) => {
  try {
    dispatch({ type: CollectionConstans.DELETE_COLLECTION_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/collections/delete`, { id }, config);
    dispatch({
      type: CollectionConstans.DELETE_COLLECTION_SUCCESS,
      message: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: CollectionConstans.DELETE_COLLECTION_FAIL,
      message: error.response.data.message,
    });
  }
};

//   Clearing errors
export const clearErrors = () => async (dispatch: (arg0: { type: CollectionConstans }) => void) => {
  dispatch({
    type: CollectionConstans.CLEAR_ERRORS,
  });
};
