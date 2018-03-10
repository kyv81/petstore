import React, { Fragment } from 'react';
import { object } from 'prop-types';

import styles from './index.css';

import { Input, Button } from 'components';

export class TextFilterCard extends React.Component {
  render() {
    const { textFilter, onChangeTextFilter, onFilter } = this.props;
    console.log('animals inside render');
    return (
      <div className='row card card-content'>
        <div className='card-action'>
          <div className='input-field col s8'>
            <input
              id='first_name'
              type='text'
              onChange={onChangeTextFilter}
              value={textFilter}
              className='validate'
            />
            <label htmlFor='first_name'>Поиск по названию</label>
          </div>
          <button
            className={styles.searchbtn + ' waves-effect waves-light btn blue'}
            onClick={onFilter}
          >
            Найти
          </button>
        </div>
      </div>
    );
  }
}
export default TextFilterCard;
