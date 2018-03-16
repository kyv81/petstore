import {
  CHANGE_FILTER_TEXT,
  CHANGE_FILTER_PRICE,
  CHANGE_FILTER_DATE,
  CHANGE_FILTER_SORT,
} from 'constants';

import { fromJS } from 'immutable';

const Filter = (state, action) => {
  switch (action.type) {
    case CHANGE_FILTER_TEXT:
      return state.set('text', fromJS(action.text));
    case CHANGE_FILTER_PRICE:
      return state
        .set('minPrice', fromJS(action.min))
        .set('maxPrice', fromJS(action.max));
    case CHANGE_FILTER_DATE:
      return state
        .set('minDate', fromJS(action.min))
        .set('maxDate', fromJS(action.max));
    case CHANGE_FILTER_SORT:
      return state
        .set('sortType', fromJS(action.sortType))
        .set('sortAsc', fromJS(action.asc));
    default:
      return state;
  }
};

export default Filter;
