import {
  CHANGE_TEXT_FILTER,
  CHANGE_MIN_PRICE_FILTER,
  CHANGE_MAX_PRICE_FILTER,
  CHANGE_MIN_DATE_FILTER,
  CHANGE_MAX_DATE_FILTER,
} from 'constants';

import { fromJS } from 'immutable';
const minDate = new Date(0);
const maxDate = new Date();

const initialState = fromJS({
  filter:{
    textFilterValue: '',
    minPriceFilterValue: 0,
    maxPriceFilterValue: 600000,
    minDateFilterValue: minDate,
    maxDateFilterValue: maxDate
  }
});

const Filter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TEXT_FILTER:
      // return Object.assign({}, state, {
      //   textFilterValue: fromJS(action.filter)
      // })
      // console.log("wuba waba lab dab")
      console.log("В РЕДЮСЕРЕ",action.textFilterValue);
      return state
        .set('textFilterValue', fromJS(action.textFilterValue));
      // return action.textFilterValue

    // case MIN_PRICE_FILTER_VALUE:
    //   return state.set('isRequesting', true);
    // case MAX_PRICE_FILTER_VALUE:
    //   return state.set('isRequesting', true);
    // case MIN_DATE_FILTER_VALUE:
    //   return state.set('isRequesting', true);
    // case MAX_DATE_FILTER_VALUE:
    //   return state.set('isRequesting', true);
    default:
      return state;
  }
};

export default Filter;
