import {
  REQUEST_GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
} from 'constants';

import { getAllUsers } from 'api';

const requestGetUsers = () => {
  return {
    type: REQUEST_GET_USERS,
  };
};

const shouldGetUsers = state => {
  return !state.getIn(['users', 'isRequesting']);
};

const getUsersSuccess = users => {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
};

const getUsersFailed = error => {
  return {
    type: GET_USERS_FAILED,
    error,
  };
};

const getUsers = () => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestGetUsers());

    return new Promise((resolve, reject) => {
      getAllUsers(getFirebase())
        .then(users => {
          dispatch(getUsersSuccess(users));
          resolve(users);
        })
        .catch(error => {
          dispatch(getUsersFailed(error));
          reject(error);
        });
    });
  };
};

const tryGetUsers = () => {
  return (dispatch, getState) => {
    if (shouldGetUsers(getState())) {
      return dispatch(getUsers());
    }
  };
};

export default tryGetUsers;
