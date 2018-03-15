import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components';

export default class LoginCard extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };

  static propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { onSubmit } = this.props;

    if (email && password) {
      onSubmit(email, password);
    }
  };

  handleCancel = e => {
    e.preventDefault();

    const { onCancel } = this.props;
    onCancel();
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
      <div className="card">
        <div className="card-content">
          <span className="card-title">Авторизация</span>
          <p>E-Mail:</p>
          <Input
            onChange={this.onChangeEmail}
            type="text"
            placeholder="example@example.com"
            value={email}
          />
          <p>Пароль:</p>
          <Input
            onChange={this.onChangePassword}
            type="password"
            value={password}
          />
        </div>
        <div className="card-action">
          <a href="" onClick={this.handleSubmit}>
            Войти
          </a>
          <a href="" onClick={this.handleCancel}>
            Отмена
          </a>
        </div>
      </div>
    );
  }
}
