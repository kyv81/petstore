import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AnimalCardCart } from 'containers';

import styles from './index.css';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    cart: state.cart.items,
    animals: state.animals.animals,
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
    let { cart, animals } = this.props;

    let filteredAnimals = cart
      .map(cartItem => {
        return animals.find(animal => animal.id === cartItem);
      })
      .toJS();

    let resultPrice = filteredAnimals
      ? filteredAnimals.reduce((a, b) => a + b.price, 0)
      : 0;

    return (
      <div className={`card`}>
        <div className="card-content">
          <span className="card-title">Корзина</span>
          <ul className="">
            {filteredAnimals.map(animal => (
              <AnimalCardCart key={animal.id} animal={animal} />
            ))}
          </ul>
          <div className="card-title">Итого: {resultPrice}</div>
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
