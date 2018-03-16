import React, { Fragment } from 'react';
import { object } from 'prop-types';

import styles from './index.css';

import { Input, Button } from 'components';

export const TextFilterCard = ({
  textFilterValue,
  onChangeTextFilter,
  onFilter
}) => {
  return (
    <Fragment>
      <div className='input-field col s8'>
        <input
          id='first_name'
          type='text'
          onChange={onChangeTextFilter}
          value={textFilterValue}
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
    </Fragment>
  );
};
export default TextFilterCard;
