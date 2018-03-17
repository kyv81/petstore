import {
  REQUEST_UPLOAD_USER_IMAGE,
  UPLOAD_USER_IMAGE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILED,
} from 'constants';

import { getImageUrl } from 'api';

const uploadSuccess = () => {
  return {
    type: UPLOAD_USER_IMAGE_SUCCESS,
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
    dispatch(uploadSuccess());
    // ищем при помощи api картинку картинку в storage firebase
    // вернет промис c урлом
    return getImageUrl(getFirebase(), filename);
  };
};
