import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, fromJS } from 'immutable';

import { AnimalCardCart } from 'components';

import { removeFromCart } from 'actions';
import { selectCartItems, selectAnimalsList } from 'selectors';

function mapStateToProps(state) {
  return {
    cart: selectCartItems(state),
    animals: selectAnimalsList(state),
  };
}

@connect(mapStateToProps)
export default class CartCard extends React.PureComponent {
  static propTypes = {
    cart: PropTypes.instanceOf(List),
    animals: PropTypes.instanceOf(List),
    dispatch: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
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

  onDeleteAnimal = id => {
    const { dispatch } = this.props;
    dispatch(removeFromCart(id));
  };

  render() {
    const { cart, animals } = this.props;
    // проверяем, все ли товары из корзины есть в магазине
    const filteredAnimals = cart.map(cartItem => {
      const animal = animals.find(animal => animal.get('id') === cartItem);
      return animal ? animal : fromJS({ id: cartItem });
    });

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
          {filteredAnimals.map(animal => (
            <AnimalCardCart
              key={animal.get('id')}
              animal={animal}
              onDeleteAnimal={this.onDeleteAnimal}
            />
          ))}
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
