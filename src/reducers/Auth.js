import {
  REQUEST_LOGIN,
  LOG_IN,
  LOG_IN_FAILED,
  REQUEST_LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REQUEST_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from 'constants';

import { fromJS } from 'immutable';

const initialState = fromJS({
  isRequesting: false,
  isLoggedIn: false,
  data: {},
});

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return state.set('isRequesting', true);
    case LOG_IN:
      return state
        .set('isRequesting', false)
        .set('isLoggedIn', true)
        .set('data', fromJS(action.user));
    case LOG_IN_FAILED:
      return state
        .set('isRequesting', false)
        .set('isLoggedIn', false);
    case REQUEST_LOGOUT:
      return state.set('isRequesting', true);
    case LOGOUT_SUCCESS:
      return state
        .set('isRequesting', false)
        .set('isLoggedIn', false)
        .set('data', fromJS({}));
    case LOGOUT_FAILED:
      return state
        .set('isRequesting', false)
        .set('isLoggedIn', true);
    case REQUEST_REGISTER:
      return state.set('isRequesting', true);
    case REGISTER_SUCCESS:
      return state
        .set('isRequesting', false)
        .set('isLoggedIn', true)
        .set('data', fromJS(action.user));
    case REGISTER_FAILED:
      return state.set('isRequesting', false);
    default:
      return state;
  }
};

export default Auth;
