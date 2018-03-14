import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { AnimalCardCart } from 'containers';

import styles from './index.css';

function mapStateToProps(state) {
  return {
    cart: state.getIn(['cart', 'items']),
    animals: state.getIn(['animals', 'animals']),
  };
}

@connect(mapStateToProps)
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
    const { cart, animals } = this.props;
    // филтруем cart на наличие животных в магазине,
    // и не удалили из из магазина уже
    const filteredAnimals = cart.map(cartItem => {
      let animal = animals.find(animal => animal.get('id') === cartItem);
      return animal ? animal : Map({ id: cartItem });
    });

    console.log(filteredAnimals);

    const resultPrice =
      filteredAnimals.size > 0
        ? filteredAnimals.reduce(
            (total, value) =>
              value.has('price') ? total + parseInt(value.get('price')) : total,
            0,
          )
        : 0;

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Корзина</span>
          <ul className="">
            {filteredAnimals.map(animal => (
              <AnimalCardCart key={animal.get('id')} animal={animal} />
            ))}
          </ul>
          <div className="card-title">Итого: {resultPrice}</div>
        </div>
        <div className="card-action">
          {filteredAnimals.size ? (
            <a href="" onClick={this.handleSubmit}>
              Купить
            </a>
          ) : null}

          <a href="" onClick={this.handleCancel}>
            Отмена
          </a>
        </div>
      </div>
    );
  }
}
