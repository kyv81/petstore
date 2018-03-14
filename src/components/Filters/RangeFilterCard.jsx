import React from 'react';
import styles from './index.css';

export const RangeFilterCard = ({
  rangeMin,
  rangeMax,
  onChangeRangeMin,
  onChangeRangeMax
}) => {
  return (
    <div className={styles.container + ' container'}>
      <div className={styles.slider}>
        <output className='left'>По цене</output>
        <output className='right'>
          От {rangeMin} до {rangeMax} руб.
        </output>
        <p className='range-field'>
          <input
            id={styles.start}
            value={rangeMin}
            type='range'
            min={this.state.min}
            max={this.state.max}
            step='500'
            onChange={onChangeRangeMin}
            className={styles.inpt}
          />
          <input
            id='end'
            value={rangeMax}
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
