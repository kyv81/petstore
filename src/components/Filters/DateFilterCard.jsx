import React from 'react';
import { Input, Button } from 'components';

import styles from './index.css';

export const DateFilterCard = ({
  dateMin,
  dateMax,
  onChangeDateMin,
  onChangeDateMax
}) => {
  return (
    <div className={styles.container + ' container row'}>
      <output className='left'>По дате</output>
      <input
        id='date'
        type='date'
        defaultValue={dateMin}
        onInput={onChangeDateMin}
        className='col s4'
      />
      <input
        id='date'
        type='date'
        defaultValue={dateMax}
        onInput={onChangeDateMax}
        className='col s4'
      />
    </div>
  );
};
export default DateFilterCard;
