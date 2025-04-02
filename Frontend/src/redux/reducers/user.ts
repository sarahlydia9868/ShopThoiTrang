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

export interface IProfileRoot {
  loading?: boolean;
  isUpdated?: boolean;
  isDeleted?: boolean;
  isSendCoded?: boolean;
  isVerifyCoded?: boolean;
  error?: boolean;
  message?: string;
}

// Update User
export const profile = (state = {}, action: { type: UserConstants; payload?: UserModel; message?: string }): IProfileRoot => {
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
        isUpdated: true,
        message: action.message,
      };

    case UserConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        message: action.message,
      };

    case UserConstants.UPDATE_PROFILE_FAIL:
    case UserConstants.UPDATE_PASSWORD_FAIL:
    case UserConstants.UPDATE_USER_FAIL:
    case UserConstants.DELETE_USER_FAIL:
    case UserConstants.SEND_CODE_FAIL:
    case UserConstants.VERIFY_CODE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };

    case UserConstants.UPDATE_PROFILE_RESET:
    case UserConstants.UPDATE_PASSWORD_RESET:
    case UserConstants.UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: true,
        message: action.message,
      };

    case UserConstants.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UserConstants.SEND_CODE_SUCCESS:
      return {
        ...state,
        isSendCoded: true,
        message: action.message,
      };
    case UserConstants.VERIFY_CODE_SUCCESS:
      return {
        ...state,
        isVerifyCoded: true,
        message: action.message,
      };
    case UserConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
        isUpdated: false,
        isDeleted: false,
        message: undefined,
      };

    default:
      return state;
  }
};

export interface IUsersRoot {
  loading?: boolean;
  error?: boolean;
  message?: string;
  users?: UserModel[];
}

// All user ----- Admin
export const allUsers = (state = {}, action: { type: UserConstants; payload?: UserModel[]; message?: string }): IUsersRoot => {
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
        message: action.message,
      };

    case UserConstants.ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };

    case UserConstants.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
      };

    default:
      return state;
  }
};

export default {
  allUsers,
  profile,
  user,
};
