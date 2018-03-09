import React from 'react';
import PropTypes from 'prop-types';

export default class CartCard extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    onSubmit();
  };

  handleCancel = e => {
    e.preventDefault();

    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Корзина</span>
          <p>Что-то тут будет</p>
        </div>
        <div className="card-action">
          <a href="" onClick={this.handleSubmit}>
            Купить
          </a>
          <a href="" onClick={this.handleCancel}>
            Отмена
          </a>
        </div>
      </div>
    );
  }
}
