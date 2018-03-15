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
        <label>
          <input
            className='with-gap'
            name='group1'
            type='radio'
            onClick={showTextFilter}
          />
          <span>по названию</span>
        </label>
        <label>
          <input
            className='with-gap'
            name='group1'
            type='radio'
            onClick={showPriceFilter}
          />
          <span>по цене</span>
        </label>
        <label>
          <input
            className='with-gap'
            name='group1'
            type='radio'
            onClick={showDateFilter}
          />
          <span>по дате</span>
        </label>
      </p>
    </form>
  );
};
export default SortingCard;
