import React from 'react';
import { Input, Button } from 'components';

import styles from './index.css';

export const DateFilterCard = ({
  onChangeDateMin,
  onChangeDateMax,
  minDateFilterValue,
  maxDateFilterValue
}) => {
  return (
    <div className={styles.container + ' container row'}>
      <output className='left'>По дате</output>
      <input
        id='date'
        type='date'
        defaultValue={minDateFilterValue}
        onInput={onChangeDateMin}
        className='col s4'
      />
      <input
        id='date'
        type='date'
        defaultValue={maxDateFilterValue}
        onInput={onChangeDateMax}
        className='col s4'
      />
    </div>
  );
};
export default DateFilterCard;
