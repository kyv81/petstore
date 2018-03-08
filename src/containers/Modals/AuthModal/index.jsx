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
    errorAuthMsgMsg: '',
  };

  static propTypes = {
    dispatch: func,
  };

  onAuth = e => {
    const { dispatch } = this.props;
    const { email, password } = this.state;
    console.log( "email",email,"psw" , password );
    e.preventDefault();
    // делаем диспатч в стор, чтобы он сазал нам есть ли такой юзер
    dispatch(tryLogin(email, password))
      .then(() => {
        this.props.toggleClear();
      })
      .catch(() => {
        const {errorAuthMsg} = this.state;
        console.log( "email",email,"psw" , password );
        this.setState(errorAuthMsg => ({
          errorAuthMsg: 'Введены неправильные данные, пожалуйста, повторите попытку'
        }));
      });
  };

  onChangeEmail = e => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { password, email } = this.state;
    return (
      <div>
        <h4>Авторизация</h4>
        {this.state.errorAuthMsg}
        <form id="authFormID">
          <label>
            <div>email</div>
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
            Подтвердить
          </Button>
        </form>
      </div>
    );
  }
}
