import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const Router = (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }

  return state;
};

export default Router;
