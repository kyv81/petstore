import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components';

export default class RegisterCard extends React.PureComponent {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password, firstName, lastName, phone } = this.state;
    const { onSubmit } = this.props;

    if (email && password && firstName && lastName && phone) {
      onSubmit({
        email,
        password,
        firstName,
        lastName,
        phone,
      });
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

  onChangefirstName = e => {
    this.setState({ firstName: e.target.value });
  };

  onChangelastName = e => {
    this.setState({ lastName: e.target.value });
  };

  onChangePhone = e => {
    this.setState({ phone: e.target.value });
  };

  render() {
    const { password, email, firstName, lastName, phone } = this.state;

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Регистрация</span>
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
          <p>Имя:</p>
          <Input
            onChange={this.onChangefirstName}
            type="text"
            placeholder="Иван"
            value={firstName}
          />
          <p>Фамилия:</p>
          <Input
            onChange={this.onChangelastName}
            type="text"
            placeholder="Иванов"
            value={lastName}
          />
          <p>Телефон:</p>
          <Input
            onChange={this.onChangePhone}
            type="text"
            placeholder="+71234567890"
            value={phone}
          />
        </div>
        <div className="card-action">
          <a href="" onClick={this.handleSubmit}>
            Зарегистрироваться
          </a>
          <a href="" onClick={this.handleCancel}>
            Отмена
          </a>
        </div>
      </div>
    );
  }
}
