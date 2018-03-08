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
  return !state.user.isLoggedIn && !state.user.isRequesting;
};

const shouldRegisterUser = state => {
  return !state.user.isLoggedIn && !state.user.isRequesting;
};

const shouldLogoutUser = state => {
  return state.user.isLoggedIn && !state.user.isRequesting;
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
    const firebase = getFirebase();

    dispatch(requestLogin(email, password));
    return new Promise((resolve, reject) => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(authUser => {
          firebase
            .database()
            .ref('users/' + authUser.uid)
            .once('value')
            .then(snapshot => {
              const user = snapshot.val();
              dispatch(logIn(user));
              resolve(user);
            });
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
    const firebase = getFirebase();

    dispatch(requestLogout());
    return new Promise((resolve, reject) => {
      return firebase
        .auth()
        .signOut()
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
    const firebase = getFirebase();

    dispatch(requestRegister(user));
    return new Promise((resolve, reject) => {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data => {
          const id = data.uid;
          const usersRef = firebase.database().ref('users/' + id);
          const newUser = {
            id: id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
          };
          usersRef.push();
          usersRef.set(newUser).then(() => {
            dispatch(registerSuccess(newUser));
            resolve(newUser);
          });
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
