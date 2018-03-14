import {
  CHANGE_TEXT_FILTER,
  CHANGE_MIN_PRICE_FILTER,
  CHANGE_MAX_PRICE_FILTER,
  CHANGE_MIN_DATE_FILTER,
  CHANGE_MAX_DATE_FILTER,
} from 'constants';

export const onChangeTextFilter = textFilterValue => {

  console.log(textFilterValue);
  return {
    type: CHANGE_TEXT_FILTER,
    textFilterValue
  };
};

const minPriceFilterValue = () => {
  return {
    type: CHANGE_MIN_PRICE_FILTER,
  };
};

const maxPriceFilterValue = () => {
  return {
    type: CHANGE_MAX_PRICE_FILTER,
  };
};

const minDateFilterValue = () => {
  return {
    type: CHANGE_MIN_DATE_FILTER,
  };
};

const maxDateFilterValue = () => {
  return {
    type: CHANGE_MAX_DATE_FILTER,
  };
};
