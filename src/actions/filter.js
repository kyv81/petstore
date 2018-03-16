import {
  CHANGE_TEXT_FILTER,
  CHANGE_MIN_PRICE_FILTER,
  CHANGE_MAX_PRICE_FILTER,
  CHANGE_MIN_DATE_FILTER,
  CHANGE_MAX_DATE_FILTER,
  CHANGE_TYPE_SORT,
  CHANGE_INDEX_SORT,
} from 'constants';

export const onChangeTextFilter = textFilterValue => {
  return {
    type: CHANGE_TEXT_FILTER,
    textFilterValue
  };
};

export const onChangeMinPriceFilter = minPriceFilterValue => {
  return {
    type: CHANGE_MIN_PRICE_FILTER,
    minPriceFilterValue
  };
};

export const onChangeMaxPriceFilter = maxPriceFilterValue => {
  return {
    type: CHANGE_MAX_PRICE_FILTER,
    maxPriceFilterValue
  };
};

export const onChangeMinDateFilter = minDateFilterValue => {
  return {
    type: CHANGE_MIN_DATE_FILTER,
    minDateFilterValue
  };
};

export const onChangeMaxDateFilter = maxDateFilterValue => {
  return {
    type: CHANGE_MAX_DATE_FILTER,
    maxDateFilterValue
  };
};

export const onChangeTypeSort= sortType => {
  return {
    type: CHANGE_TYPE_SORT,
    sortType
  };
};

export const onChangeIndexSort = asc => {
  return {
    type: CHANGE_INDEX_SORT,
    asc
  };
};
