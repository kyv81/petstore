import {
  CHANGE_FILTER_TEXT,
  CHANGE_FILTER_PRICE,
  CHANGE_FILTER_DATE,
  CHANGE_FILTER_SORT,
} from 'constants';

export const changeFilterText = text => {
  return {
    type: CHANGE_FILTER_TEXT,
    text,
  };
};

export const changeFilterPrice = (min, max) => {
  return {
    type: CHANGE_FILTER_PRICE,
    min,
    max,
  };
};

export const changeFilterDate = (min, max) => {
  return {
    type: CHANGE_FILTER_DATE,
    min,
    max,
  };
};

export const changeFilterSort = (sortType, asc) => {
  return {
    type: CHANGE_FILTER_SORT,
    sortType,
    asc,
  };
};
