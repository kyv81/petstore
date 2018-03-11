import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components';

const propTypes = {
  onAddCancel: PropTypes.func.isRequired,
  onAddSubmit: PropTypes.func.isRequired,
};

class AnimalAdd extends React.Component {
  state = {
    name: '',
    price: '',
    description: '',
  };

  handleAdd = e => {
    e.preventDefault();
    const { description, name, price } = this.state;
    const { onAddSubmit } = this.props;
    if (name && price && description) {
      onAddSubmit(name, price, description);
    }
  };

  handleCancel = e => {
    e.preventDefault();
    const { onAddCancel } = this.props;
    onAddCancel();
  };

  handleChangeDesc = e => {
    const val = e.target.value;
    this.setState({ description: val });
  };

  handleChangeName = e => {
    const val = e.target.value;
    this.setState({ name: val });
  };

  handleChangePrice = e => {
    const val = e.target.value;
    this.setState({ price: val });
  };

  render() {
    const { name, price, description } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Добавить</span>
          <p>Имя:</p>
          <Input
            onChange={this.handleChangeName}
            placeholder="Введите имя животного"
            value={name}
          />
          <p>Цена:</p>
          <Input
            onChange={this.handleChangePrice}
            placeholder="Введите цену животного"
            type="number"
            value={price}
          />
          <p>Описание:</p>
          <Input
            onChange={this.handleChangeDesc}
            placeholder="Введите описание животного"
            value={description}
          />
        </div>
        <div className="card-action">
          <a href="" onClick={this.handleAdd}>
            Применить
          </a>
          <a href="" onClick={this.handleCancel}>
            Отмена
          </a>
        </div>
      </div>
    );
  }
}

AnimalAdd.propTypes = propTypes;

export default AnimalAdd;
