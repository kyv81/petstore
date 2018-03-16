import {
  CHANGE_TEXT_FILTER,
  CHANGE_MIN_PRICE_FILTER,
  CHANGE_MAX_PRICE_FILTER,
  CHANGE_MIN_DATE_FILTER,
  CHANGE_MAX_DATE_FILTER,
  CHANGE_TYPE_SORT,
  CHANGE_INDEX_SORT
} from 'constants';

import { fromJS } from 'immutable';
const minDate = new Date(0);
const maxDate = new Date();

const initialState = fromJS({
    textFilterValue: '',
    minPriceFilterValue: 0,
    maxPriceFilterValue: 600000,
    minDateFilterValue: minDate,
    maxDateFilterValue: maxDate,
    sortType: 'DateSort',
    asc: true
});

const Filter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TEXT_FILTER:
      return state
        .set('textFilterValue', fromJS(action.textFilterValue));
    case CHANGE_MIN_PRICE_FILTER:
      return state
        .set('minPriceFilterValue', fromJS(action.minPriceFilterValue));
    case CHANGE_MAX_PRICE_FILTER:
      return state
        .set('maxPriceFilterValue', fromJS(action.maxPriceFilterValue));
    case CHANGE_MIN_DATE_FILTER:
      return state
        .set('minDateFilterValue', fromJS(action.minDateFilterValue));
    case CHANGE_MAX_DATE_FILTER:
      return state
        .set('maxDateFilterValue', fromJS(action.maxDateFilterValue));
    case CHANGE_TYPE_SORT:
      return state
        .set('sortType', fromJS(action.sortType));
    case CHANGE_INDEX_SORT:
      return state
        .set('asc', fromJS(action.asc));
    default:
      return state;
  }
};

export default Filter;
