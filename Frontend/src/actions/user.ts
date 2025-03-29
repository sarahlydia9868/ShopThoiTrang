import axios from "../utils/axios";
import { UserConstants } from "../constans/user";
// Login
export const login = (username: string, password: string) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/users/login`, { username, password }, config) as {data: UserPayLoad};
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
    const { data } = await axios.post(`/api/users/register`, { username, email, password }, config) as {data: UserPayLoad};
    dispatch({ type: UserConstants.REGISTER_USER_SUCCESS, payload: data.data, message: data.message });
  } catch (error: any) {
    dispatch({
      type: UserConstants.REGISTER_USER_FAIL,
      message: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.LOAD_USER_REQUEST });
    // eslint-disable-next-line
    const { data } = await axios.get(`/api/users/me`) as {data: UserPayLoad};
    dispatch({ type: UserConstants.LOAD_USER_SUCCESS, payload: data.data, message: data.message });
  } catch (error: any) {
    dispatch({ type: UserConstants.LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Log out user
export const logout = () => async (dispatch: (arg0: { type: UserConstants; message: any }) => void) => {
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
export const updateProfile = (userData: UserModel) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/users/me/update`, userData, config);
    dispatch({
      type: UserConstants.UPDATE_PROFILE_SUCCESS,
      message: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.UPDATE_PROFILE_FAIL,
      message: error.response.data.message,
    });
  }
};


// Update Items
export const updateItems = (id: string, cartItems: CartItem[], wishList: CartItem[]) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/users/me/update-item`, {id, cartItems, wishList}, config);
    dispatch({
      type: UserConstants.UPDATE_PROFILE_SUCCESS,
      message: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.UPDATE_PROFILE_FAIL,
      message: error.response.data.message,
    });
  }
};

// Send code 
export const sendCode = (email: string) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.SEND_CODE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/users/send-code`, {email}, config);

    dispatch({
      type: UserConstants.SEND_CODE_SUCCESS,
      message: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.SEND_CODE_FAIL,
      message: error.response.data.message,
    });
  }
};

// Send code 
export const verifyCode = (email: string, code: number) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.VERIFY_CODE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/users/verify-code`, {email, code}, config);

    dispatch({
      type: UserConstants.VERIFY_CODE_SUCCESS,
      message: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.VERIFY_CODE_FAIL,
      message: error.response.data.message,
    });
  }
};

// Send code and update password
export const verifyCodePassword = (email: string, code: number, password: string) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/users/verify-code-password`, {email, code, password}, config);

    dispatch({
      type: UserConstants.UPDATE_PASSWORD_SUCCESS,
      message: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: UserConstants.UPDATE_PASSWORD_FAIL,
      message: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/admin/users`);

    dispatch({ type: UserConstants.ALL_USERS_SUCCESS, payload: data.users });
  } catch (error: any) {
    dispatch({
      type: UserConstants.ALL_USERS_FAIL,
      message: error.response.data.message,
    });
  }
};


// Delete User ----- Admin
export const deleteUser = (id) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/admin/user/${id}`);

    dispatch({ type: UserConstants.DELETE_USER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: UserConstants.DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get  User Details ----- Admin
export const getUserDetails = (id) => async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
  try {
    dispatch({ type: UserConstants.USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/admin/user/${id}`);

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
  return async (dispatch: (arg0: { type: UserConstants; payload?: UserModel; message?: string }) => void) => {
    try {
      dispatch({ type: UserConstants.UPDATE_USER_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(`/api/admin/user/${id}`, userData, config);

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
export const clearErrors = () => async (dispatch: (arg0: { type: UserConstants }) => void) => {
  dispatch({
    type: UserConstants.CLEAR_ERRORS,
  });
};
