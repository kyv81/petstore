import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AnimalCardCart } from 'containers';

import styles from './index.css';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    cart: state.cart.get('items'),
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

    // филтруем cart на наличие животных в магазине,
    // и не удалили из из магазина уже
    let filteredAnimals = cart
      .map(cartItem => {
        return animals.find(animal => animal.id === cartItem);
      })
      .toJS()
      .filter(animal => animal);

    let resultPrice = filteredAnimals
      ? filteredAnimals.reduce((a, b) => a + parseInt(b.price), 0)
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
          {filteredAnimals.length ? (
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
