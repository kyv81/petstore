import {
  REQUEST_UPLOAD_USER_IMAGE,
  UPLOAD_USER_IMAGE_SUCCESS,
  UPLOAD_USER_IMAGE_FAILED,
} from 'constants';

import { getImageUrl } from 'api';

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

//добавление в storage успешно
export const uploadImageSuccess = filename => {
  return (dispatch, getState, getFirebase) => {
    dispatch({
      type: UPLOAD_USER_IMAGE_SUCCESS,
    });
    // ищем при помощи api картинку картинку в storage firebase
    // вернет промис в урлом
    return getImageUrl(getFirebase(), filename);
  };
};
