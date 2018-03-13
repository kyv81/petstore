import {
  REQUEST_GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
} from 'constants';

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
    const firebaseDb = getFirebase().database();
    dispatch(requestGetUsers());

    return new Promise((resolve, reject) => {
      return firebaseDb
        .ref('users')
        .once('value')
        .then(snapshot => {
          // TODO: переделать(?) нормально
          let users = [];
          snapshot.forEach(item => {
            users = [...users, item.val()];
          });
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
