import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import { AnimalCard, IndeterminateLoader } from 'components';

import { tryAddToCart } from 'actions';
import { selectAnimalById, selectUserById, selectCartItems } from 'selectors';

function mapStateToProps(state, ownProps) {
  const animal = selectAnimalById(state, ownProps.id);
  const user = animal ? selectUserById(state, animal.get('salerId')) : null;

  return {
    animal: animal,
    user: user,
    cartItems: selectCartItems(state),
  };
}

@connect(mapStateToProps)
export default class AnimalPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    animal: PropTypes.instanceOf(Map),
    user: PropTypes.instanceOf(Map),
    filter: PropTypes.instanceOf(Map),
    cartItems: PropTypes.instanceOf(List),
  };

  onAddToCart = animal => {
    const { dispatch } = this.props;
    dispatch(tryAddToCart(animal.get('id')))
      .then(() => {
        M.toast({
          html: 'Добавлено!',
          classes: 'green accent-2',
        });
      })
      .catch(() => {
        M.toast({
          html: 'Не удалось добавить в корзину',
          classes: 'red',
        });
      });
  };

  render() {
    const { animal, user, cartItems } = this.props;
    if (!animal) {
      return <IndeterminateLoader />;
    }
    const showCartButton =
      cartItems.find(item => item === animal.get('id')) === undefined;

    return animal && user ? (
      <div className="section">
        <AnimalCard
          animal={animal}
          owner={user}
          showMoreButton={false}
          showCartButton={showCartButton}
          onAddToCart={this.onAddToCart}
        />
      </div>
    ) : null;
  }
}
