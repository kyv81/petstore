import React, { Fragment } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import styles from './index.css';

import { tryLogin } from 'actions/auth';

import { Input, Button } from 'components';

// подключил компонент к стору чтобы иметь тут dispatch
@connect()
export default class AuthModal extends React.PureComponent {
  // у модалки есть свой state, который потом отдается в на проверку в БД
  // делаем свой state, чтобы перерендеривались только компоннеты модолки, а не все приложение
  state = {
    email: '',
    password: '',
  };

  static propTypes = {
    dispatch: func,
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  onAuth = e => {
    const { dispatch } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    // делаем диспатч в стор, чтобы он сазал нам есть ли такой юзер
    dispatch(tryLogin(email, password))
      .then(() => {
        console.log('успешно');
      })
      .catch(() => {
        console.log('провал(((');
      });
  };

  render() {
    const { password, email } = this.state;
    return (
      <div className={styles.modal}>
        <h4>Авторизация</h4>
        <form id="authFormID">
          <label>
            <div>Емэйл</div>
            <Input
              onChange={this.onChangeEmail}
              type="text"
              placeholder="Введите email"
              value={email}
            />
          </label>
          <label>
            <div>Пароль</div>
            <Input
              onChange={this.onChangePassword}
              type="text"
              placeholder="Введите пароль"
              value={password}
            />
          </label>
          <Button
            onClick={this.onAuth}
            className="btn waves-effect waves-light"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
