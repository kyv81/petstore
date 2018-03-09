import React, { Fragment } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { tryRegister} from 'actions/auth';
import { func } from 'prop-types';

import styles from './index.css';

@connect()
export default class RegModal extends React.PureComponent {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    errorRegMsg: '',

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
  onChangeFirstName = e => {
    this.setState({ firstName: e.target.value });
  };
  onChangeLastName = e => {
    this.setState({ lastName: e.target.value });
  };
  onChangePhone = e => {
    this.setState({ phone: e.target.value });
  };

  onReg = e => {
    const { dispatch } = this.props;
    const { email, password, firstName, lastName, phone} = this.state;
    const user = { email, password, firstName, lastName, phone};
    e.preventDefault();
    // делаем диспатч в стор, чтобы он сказал нам есть ли такой юзер
    dispatch(tryRegister(user))
      .then(() => {
        this.props.toggleClear();
      })
      .catch(() => {
        const {errorRegMsg} = this.state;
        this.setState(errorRegMsg => ({
          errorRegMsg: 'Введены неправильные данные, пожалуйста, повторите попытку'
        }));
      });
  };

  render() {
    return (
      <div>
        <h4>Регистрация</h4>
        {this.state.errorRegMsg}
        <form onSubmit={this.onReg} id="RegFormID">
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
          <label>
            <div>Имя</div>
            <input
              onChange={this.onChangeFirsName}
              type="text"
              name="firstName"
            />
          </label>
          <label>
            <div>Фамилия</div>
            <input
              onChange={this.onChangeLastName}
              type="text"
              name="lastName"
            />
          </label>
          <label>
            <div>Телефон</div>
            <input onChange={this.onChangePhone} type="number" name="phone" />
          </label>
          <button className="btn waves-effect waves-light" type="submit">
            Подтвердить
          </button>
        </form>
      </div>
    );
  }
}
