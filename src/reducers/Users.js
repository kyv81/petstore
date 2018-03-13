import {
  REQUEST_GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
} from 'constants';

import { fromJS } from 'immutable';

const initialState = fromJS({
  isRequesting: false,
  users: [],
});

const Users = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET_USERS:
      return state.set('isRequesting', true);
    case GET_USERS_SUCCESS:
      return state
        .set('isRequesting', false)
        .set('users', fromJS(action.users));
    case GET_USERS_FAILED:
      return state.set('isRequesting', false);
    default:
      return state;
  }
};

export default Users;
