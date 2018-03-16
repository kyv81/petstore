import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'components';

export default class EditAnimalCard extends React.PureComponent {
  state = this.props.animal;

  static propTypes = {
    animal: PropTypes.object,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const animal = this.state;
    const { onSubmit } = this.props;

    onSubmit(animal);
  };

  handleCancel = e => {
    e.preventDefault();

    const { onCancel } = this.props;
    onCancel();
  };

  onChangeName = e => {
    this.setState({ name: e.target.value });
  };

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  onChangePrice = e => {
    this.setState({ price: e.target.value });
  };

  render() {
    const { name, description, price } = this.state;

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Авторизация</span>
          <p>Кличка:</p>
          <Input
            onChange={this.onChangeName}
            type="text"
            placeholder="Бобик"
            value={name}
          />
          <p>Цена:</p>
          <Input
            onChange={this.onChangePrice}
            type="number"
            value={price}
          />
          <p>Описание</p>
          <Input
            onChange={this.onChangeDescription}
            type="text"
            value={description}
          />
        </div>
        <div className="card-action">
          <a href="" onClick={this.handleSubmit}>
            Готово
          </a>
          <a href="" onClick={this.handleCancel}>
            Отмена
          </a>
        </div>
      </div>
    );
  }
}
