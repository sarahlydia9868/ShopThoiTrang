import { UserConstants } from "../../constans/user";

export interface IUserRoot {
  loading: boolean;
  isAuthenticated: boolean;
  error?: boolean;
  message?: string;
  user?: UserModel | null;
}

const user = (state = {}, action: { type: UserConstants; payload?: UserModel; message?: string }): IUserRoot => {
  switch (action.type) {
    case UserConstants.LOGIN_REQUEST:
    case UserConstants.REGISTER_USER_REQUEST:
    case UserConstants.LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case UserConstants.LOGIN_SUCCESS:
    case UserConstants.REGISTER_USER_SUCCESS:
    case UserConstants.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        message: action.message,
      };
    case UserConstants.LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
        message: action.message,
      };
    case UserConstants.LOGIN_FAIL:
    case UserConstants.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: true,
        message: action.message,
      };

    case UserConstants.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: true,
        message: action.message,
      };

    case UserConstants.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: true,
        message: action.message,
      };

    case UserConstants.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
  }
};

// Update User
export const profile = (state = {}, action) => {
  switch (action.type) {
    case UserConstants.UPDATE_PROFILE_REQUEST:
    case UserConstants.UPDATE_PASSWORD_REQUEST:
    case UserConstants.UPDATE_USER_REQUEST:
    case UserConstants.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserConstants.UPDATE_PROFILE_SUCCESS:
    case UserConstants.UPDATE_PASSWORD_SUCCESS:
    case UserConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UserConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UserConstants.UPDATE_PROFILE_FAIL:
    case UserConstants.UPDATE_PASSWORD_FAIL:
    case UserConstants.UPDATE_USER_FAIL:
    case UserConstants.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserConstants.UPDATE_PROFILE_RESET:
    case UserConstants.UPDATE_PASSWORD_RESET:
    case UserConstants.UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UserConstants.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UserConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// All user ----- Admin
export const allUsers = (state = { users: [] }, action) => {
  switch (action.type) {
    case UserConstants.ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserConstants.ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case UserConstants.ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// User Details
export const userDetails = (state = { user: {} }, action) => {
  switch (action.type) {
    case UserConstants.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserConstants.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case UserConstants.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPassword = (state = {}, action) => {
  switch (action.type) {
    case UserConstants.FORGOT_PASSWORD_REQUEST:
    case UserConstants.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UserConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case UserConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case UserConstants.FORGOT_PASSWORD_FAIL:
    case UserConstants.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default {
  allUsers,
  forgotPassword,
  profile,
  userDetails,
  user,
};
