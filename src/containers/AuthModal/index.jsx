import React, { Fragment } from 'react';
import { string } from 'prop-types';
import styles from './index.css';

export default class AuthModal extends React.PureComponent {
  // у модалки есть свой state, который потом отдается в на проверку в БД
  // делаем свой state, чтобы перерендеривались только компоннеты модолки, а не все приложение
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <div className={styles.modal}>
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
      </div>
    );
  }
}
