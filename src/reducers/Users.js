import {
  REQUEST_GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  REQUEST_EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
} from 'constants';

import { fromJS } from 'immutable';

const Users = (state, action) => {
  switch (action.type) {
    case REQUEST_GET_USERS:
      return state.set('isRequesting', true);
    case GET_USERS_SUCCESS:
      return state
        .set('isRequesting', false)
        .set('users', fromJS(action.users));
    case GET_USERS_FAILED:
      return state.set('isRequesting', false);
    case REQUEST_EDIT_USER:
      return state.set('isEditing', true);
    case EDIT_USER_SUCCESS:
      return state.set('isEditing', false).update('users', users =>
        users.map(user => {
          return user.get('id') === fromJS(action.user.id)
            ? fromJS(action.user)
            : user;
        }),
      );
    case EDIT_USER_FAILED:
      return state.set('isEditing', false);
    default:
      return state;
  }
};

export default Users;
