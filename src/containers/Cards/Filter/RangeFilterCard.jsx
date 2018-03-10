import React, { Fragment } from 'react';
import styles from './index.css';

import { Input, Button } from 'components';

export class RangeFilterCard extends React.Component {
  render() {
    const {
      rangeMin,
      rangeMax,
      onChangeRangeMin,
      onChangeRangeMax
    } = this.props;
    //onst min = rangeMin==0?rangeMax:0;
    //const max = rangeMax==1000000?rangeMin:1000000;
    console.log('range inside render', rangeMax, onChangeRangeMin);
    return (
      <Fragment>
        <h5>Фильтровать</h5>
        <div className={styles.container + ' container'}>
          <div className={styles.slider + ' slider'}>
            <output className='left'>По цене</output>
            <output className='right'>
              От {rangeMin} до {rangeMax} руб.
            </output>
            <p className='range-field'>
              <input
                id='start'
                value={rangeMin}
                type='range'
                min='0'
                max='600000'
                step='500'
                onInput={onChangeRangeMin}
              />
              <input
                id='end'
                value={rangeMax}
                type='range'
                min='0'
                max='600000'
                step='500'
                onInput={onChangeRangeMax}
              />
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default RangeFilterCard;
