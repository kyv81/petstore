import React, { Fragment } from 'react';
import { object } from 'prop-types';

import styles from './index.css';

import { Input, Button } from 'components';

export const SortingCard = ({
  showTextFilter,
  showPriceFilter,
  showDateFilter
}) => {
  return (
    <form action='#'>
      <p>
        <label>Сортировать: </label>
        <label>
          <input
            name='group1'
            type='checkbox'
            onClick={showTextFilter}
          />
          <span>по названию</span>
        </label>
        <label>
          <input
            name='group1'
            type='checkbox'
            onClick={showPriceFilter}
          />
          <span>по цене</span>
        </label>
        <label>
          <input
            name='group1'
            type='checkbox'
            onClick={showDateFilter}
          />
          <span>по дате</span>
        </label>
      </p>
    </form>
  );
};
export default SortingCard;
