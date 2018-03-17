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

import { authUser, logoutUser, registerUser } from 'api';

const requestLogin = (email, password) => {
  return {
    type: REQUEST_LOGIN,
    email,
    password,
  };
};

const requestLogout = () => {
  return {
    type: REQUEST_LOGOUT,
  };
};

const requestRegister = user => {
  return {
    type: REQUEST_REGISTER,
    user,
  };
};

const shouldLoginUser = state => {
  return (
    !state.getIn(['auth', 'isLoggedIn']) &&
    !state.getIn(['auth', 'isRequesting'])
  );
};

const shouldRegisterUser = state => {
  return (
    !state.getIn(['auth', 'isLoggedIn']) &&
    !state.getIn(['auth', 'isRequesting'])
  );
};

const shouldLogoutUser = state => {
  return (
    state.getIn(['auth', 'isLoggedIn']) &&
    !state.getIn(['auth', 'isRequesting'])
  );
};

const logIn = user => {
  return {
    type: LOG_IN,
    user,
  };
};

const registerSuccess = user => {
  return {
    type: REGISTER_SUCCESS,
    user,
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logInFailed = error => {
  return {
    type: LOG_IN_FAILED,
    error: error,
  };
};

const registerFailed = error => {
  return {
    type: REGISTER_FAILED,
    error: error,
  };
};

const logoutFailed = error => {
  return {
    type: LOGOUT_FAILED,
    error: error,
  };
};

const auth = (email, password) => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestLogin(email, password));

    return new Promise((resolve, reject) => {
      authUser(getFirebase(), email, password)
        .then(user => {
          dispatch(logIn(user));
          resolve(user);
        })
        .catch(error => {
          dispatch(logInFailed(error));
          reject(error);
        });
    });
  };
};

const logout = () => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestLogout());

    return new Promise((resolve, reject) => {
      logoutUser(getFirebase())
        .then(() => {
          dispatch(logoutSuccess());
          resolve();
        })
        .catch(error => {
          dispatch(logoutFailed(error));
          reject(error);
        });
    });
  };
};

const register = user => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestRegister(user));

    return new Promise((resolve, reject) => {
      registerUser(getFirebase(), user)
        .then(newUser => {
          dispatch(registerSuccess(newUser));
          resolve(newUser);
        })
        .catch(error => {
          dispatch(registerFailed(error));
          reject(error);
        });
    });
  };
};

export const tryLogin = (email, password) => {
  return (dispatch, getState) => {
    if (shouldLoginUser(getState())) {
      return dispatch(auth(email, password));
    }
  };
};

export const tryRegister = user => {
  return (dispatch, getState) => {
    if (shouldRegisterUser(getState())) {
      return dispatch(register(user));
    }
  };
};

export const tryLogout = () => {
  return (dispatch, getState) => {
    if (shouldLogoutUser(getState())) {
      return dispatch(logout());
    }
  };
};
