import {
  REQUEST_GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
} from 'constants';

const initialState = {
  isRequesting: false,
  users: [],
};

const Users = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET_USERS:
      return {
        ...state,
        isRequesting: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        users: action.users,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        isRequesting: false,
      };
    default:
      return state;
  }
};

export default Users;
