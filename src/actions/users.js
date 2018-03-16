import {
  REQUEST_GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  REQUEST_EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  REQUEST_UPLOAD_USER_IMAGE,
  UPLOAD_USER_IMAGE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILED,
} from 'constants';

import { getAllUsers, editUser, getImageUrl } from 'api';

const requestGetUsers = () => {
  return {
    type: REQUEST_GET_USERS,
  };
};

const requestEditUser = user => {
  return {
    type: REQUEST_EDIT_USER,
    user,
  };
};

const shouldGetUsers = state => {
  return !state.getIn(['users', 'isRequesting']);
};

const shouldEditUser = state => {
  return !state.getIn(['users', 'isEditing']);
};

const getUsersSuccess = users => {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
};

const editUserSuccess = user => {
  return {
    type: EDIT_USER_SUCCESS,
    user,
  };
};

const getUsersFailed = error => {
  return {
    type: GET_USERS_FAILED,
    error,
  };
};

const editUserFailed = error => {
  return {
    type: EDIT_USER_FAILED,
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

const edit = user => {
  return (dispatch, getState, getFirebase) => {
    dispatch(requestEditUser(user));

    return new Promise((resolve, reject) => {
      editUser(getFirebase(), user)
        .then(user => {
          dispatch(editUserSuccess(user));
          resolve(user);
        })
        .catch(error => {
          dispatch(editUserFailed(error));
          reject(error);
        });
    });
  };
};

export const tryGetUsers = () => {
  return (dispatch, getState) => {
    if (shouldGetUsers(getState())) {
      return dispatch(getUsers());
    }
  };
};

export const tryEditUser = user => {
  return (dispatch, getState) => {
    if (shouldEditUser(getState())) {
      return dispatch(edit(user));
    }
  };
};

export const tryUploadImage = () => {
  return {
    type: REQUEST_UPLOAD_USER_IMAGE,
  };
};

export const uploadImageFailed = error => {
  return {
    type: UPLOAD_USER_IMAGE_FAILED,
    error,
  };
};

export const uploadImageSuccess = filename => {
  return (dispatch, getState, getFirebase) => {
    // ищем юзера который хочет редактировать картинку
    let userId = getState().getIn(['auth', 'id']);
    let userData = getState()
      .getIn(['users', 'users'])
      .find(user => user.get('id') === userId);
    //ищем при помощи api картинку картинку
    return new Promise((res, rej) => {
      getImageUrl(getFirebase(), filename).then(url => {
        // получаем url и отправляем нового юзера
        let newUserData = userData.set('imgUrl', url);
        dispatch(tryEditUser(newUserData.toJS()))
          .then(() => {
            //если удалось обновить юзера
            res();
            dispatch({
              type: UPLOAD_USER_IMAGE_SUCCESS,
            });
          })
          .catch(error => {
            rej(error);
          });
      });
    });
  };
};
