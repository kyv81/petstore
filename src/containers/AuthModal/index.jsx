import React, { Fragment } from 'react';
import { string } from 'prop-types';
import styles from './index.css';
import { connect } from 'react-redux';
import { tryLogin } from 'actions/user';
import { func } from 'prop-types';

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
    return (
      <div className={styles.modal}>
        <h4>Авторизация</h4>
        <form onSubmit={this.onAuth} id="authFormID">
          <label>
            <div>Емэйл</div>
            <input onChange={this.onChangeEmail} type="text" name="email" />
          </label>
          <label>
            <div>Пароль</div>
            <input
              onChange={this.onChangePassword}
              type="text"
              name="password"
            />
          </label>
          <button className="btn waves-effect waves-light" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
