import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components';

const propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  onChangeDesc: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangePrice: PropTypes.func,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
};

class AnimalModal extends React.Component {
  state = {
    name: this.props.name,
    price: this.props.price,
    description: this.props.description,
  };

  componentDidMount() {
    if (this.inputField) {
      const inputValue = this.inputField.value;
      this.inputField.value = '';
      this.inputField.focus();
      this.inputField.value = inputValue;
    }
  }

  handleAccept = e => {
    e.preventDefault();
    const { onAccept } = this.props;
    const { name, price, description } = this.state;
    if (name && price && description) {
      onAccept(name, parseInt(price, 10), description);
    }
  };

  handleCancel = e => {
    e.preventDefault();
    const { onCancel } = this.props;
    onCancel();
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
    const { title } = this.props;
    const { name, price, description } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">{title}</span>
          <p>Имя:</p>
          <Input
            onChange={this.handleChangeName}
            placeholder="Введите имя"
            value={name}
            inputField={input => (this.inputField = input)}
          />
          <p>Цена:</p>
          <Input
            onChange={this.handleChangePrice}
            placeholder="Введите цену"
            type="number"
            value={price}
          />
          <p>Описание:</p>
          <Input
            onChange={this.handleChangeDesc}
            placeholder="Введите описание"
            value={description}
          />
        </div>
        <div className="card-action">
          <a href="" onClick={this.handleAccept}>
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

AnimalModal.propTypes = propTypes;

export default AnimalModal;
