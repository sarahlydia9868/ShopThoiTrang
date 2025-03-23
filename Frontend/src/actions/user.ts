import axios from "../utils/axios";
import { UserConstants } from "../constans/user";
import { AxiosError } from "axios";

// Login
export const login = (username: string, password: string) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/users/login`, { username, password }, config);
    dispatch({ type: UserConstants.LOGIN_SUCCESS, payload: data.data, message: data.message });
  } catch (error: any) {
    dispatch({
      type: UserConstants.LOGIN_FAIL,
      message: error.response.data.message,
    });
  }
};

// Register
export const register = (username: string, email: string, password: string) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/users/register`, { username, email, password }, config);
    dispatch({ type: UserConstants.REGISTER_USER_SUCCESS, payload: data.data, message: data.message });
  } catch (error: any) {
    dispatch({
      type: UserConstants.REGISTER_USER_FAIL,
      message: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.LOAD_USER_REQUEST });
    // eslint-disable-next-line

    const { data } = await axios.get(`/api/v2/me`);

    dispatch({ type: UserConstants.LOAD_USER_SUCCESS, payload: data.user });
  } catch (error: any) {
    dispatch({ type: UserConstants.LOAD_USER_FAIL, payload: error });
  }
};

// Log out user
export const logout = () => async (dispatch: (arg0: { type: UserConstants; message: any; }) => void) => {
  try {
    const { data } = await axios.get(`/api/users/logout`);
    dispatch({ type: UserConstants.LOGOUT_SUCCESS, message: data.message });
  } catch (error: any) {
    dispatch({
      type: UserConstants.LOGOUT_FAIL,
      message: error.response.data.message,
    });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v2/me/update/info`, userData, config);

    dispatch({
      type: UserConstants.UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v2/me/update`, password, config);

    dispatch({
      type: UserConstants.UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v2/admin/users`);

    dispatch({ type: UserConstants.ALL_USERS_SUCCESS, payload: data.users });
  } catch (error: any) {
    dispatch({
      type: UserConstants.ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v2/password/forgot`, email, config);

    dispatch({
      type: UserConstants.FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v2/password/reset/${token}`, passwords, config);

    dispatch({
      type: UserConstants.RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User ----- Admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v2/admin/user/${id}`);

    dispatch({ type: UserConstants.DELETE_USER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: UserConstants.DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get  User Details ----- Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: UserConstants.USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v2/admin/user/${id}`);

    dispatch({ type: UserConstants.USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error: any) {
    dispatch({
      type: UserConstants.USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update user ----- Admin
export function updateUser(id, userData) {
  return async (dispatch) => {
    try {
      dispatch({ type: UserConstants.UPDATE_USER_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(`/api/v2/admin/user/${id}`, userData, config);

      dispatch({
        type: UserConstants.UPDATE_USER_SUCCESS,
        payload: data.success,
      });
    } catch (error: any) {
      dispatch({
        type: UserConstants.UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
}

//   Clearing errors
export const clearErrors = () => async (dispatch: (arg0: { type: UserConstants; }) => void) => {
  dispatch({
    type: UserConstants.CLEAR_ERRORS,
  });
};
