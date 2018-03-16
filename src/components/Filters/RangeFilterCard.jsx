import React from 'react';
import styles from './index.css';

export const RangeFilterCard = ({
  onChangeRangeMin,
  onChangeRangeMax,
  minPriceFilterValue,
  maxPriceFilterValue
}) => {
  return (
    <div className={styles.container + ' container'}>
      <div className={styles.slider}>
        <output className='left'>По цене</output>
        <output className='right'>
          От {minPriceFilterValue} до {maxPriceFilterValue} руб.
        </output>
        <p className='range-field'>
          <input
            id={styles.start}
            value={minPriceFilterValue}
            type='range'
            min='0'
            max='600000'
            step='500'
            onChange={onChangeRangeMin}
            className={styles.inpt}
          />
          <input
            id='end'
            value={maxPriceFilterValue}
            type='range'
            min='0'
            max='600000'
            step='500'
            onChange={onChangeRangeMax}
            className={styles.inpt}
          />
        </p>
      </div>
    </div>
  );
};
export default RangeFilterCard;
