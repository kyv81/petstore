import React from 'react';
import styles from './index.css';

// import { Input, Button } from 'components';

export class RangeFilterCard extends React.Component {
  state = {
    min: this.props.rangeMin,
    max: this.props.rangeMax,
  };
  render() {
    const {
      rangeMin,
      rangeMax,
      onChangeRangeMin,
      onChangeRangeMax,
    } = this.props;
    return (
      <div className={styles.container + ' container'}>
        <div className={styles.slider}>
          <output className="left">По цене</output>
          <output className="right">
            От {rangeMin} до {rangeMax} руб.
          </output>
          <p className="range-field">
            <input
              id={styles.start}
              value={rangeMin}
              type="range"
              min={this.state.min}
              max={this.state.max}
              step="500"
              onInput={onChangeRangeMin}
              className={styles.inpt}
            />
            <input
              id="end"
              value={rangeMax}
              type="range"
              min="0"
              max="600000"
              step="500"
              onInput={onChangeRangeMax}
              className={styles.inpt}
            />
          </p>
        </div>
      </div>
    );
  }
}
export default RangeFilterCard;
