import {
  REQUEST_LOGIN,
  LOG_IN,
  LOG_IN_FAILED,
  REQUEST_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from 'constants';

const initialState = {
  isRequesting: false,
  isLoggedIn: false,
  data: {},
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isRequesting: true,
      };
    case LOG_IN:
      return {
        ...state,
        isRequesting: false,
        isLoggedIn: true,
        data: action.user,
      };
    case LOG_IN_FAILED:
      return {
        ...state,
        isRequesting: false,
        isLoggedIn: false,
      };
    case REQUEST_REGISTER:
      return {
        ...state,
        isRequesting: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        isLoggedIn: true,
        data: action.user,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        isRequesting: false,
      };
    default:
      return state;
  }
};

export default User;