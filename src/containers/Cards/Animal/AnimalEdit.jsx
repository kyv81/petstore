import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components';

const propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  onEditSubmit: PropTypes.func.isRequired,
  onEditCancel: PropTypes.func.isRequired,
  price: PropTypes.number,
};

class AnimalEdit extends React.Component {
  state = {
    name: this.props.name,
    price: this.props.price,
    description: this.props.description,
  };

  handleEdit = e => {
    e.preventDefault();
    const { name, price, description } = this.state;
    const { onEditSubmit } = this.props;
    onEditSubmit(name, price, description);
  };

  handleCancel = e => {
    e.preventDefault();
    const { name, price, description, onEditCancel } = this.props;
    this.setState({ name, price, description });
    onEditCancel();
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
          <span className="card-title">Редактирование</span>
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
            value={price}
            type="number"
          />
          <p>Описание:</p>
          <Input
            onChange={this.handleChangeDesc}
            placeholder="Введите описание животного"
            value={description}
          />
        </div>
        <div className="card-action">
          <a href="" onClick={this.handleEdit}>
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

AnimalEdit.propTypes = propTypes;

export default AnimalEdit;
