import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FilterPanel } from 'containers';
import { AnimalCard, IndeterminateLoader } from 'components';
import { tryAddToCart } from 'actions';
import {
  selectAnimalsList,
  selectUsersList,
  selectFilter,
  selectCartItems
} from 'selectors';
import { filterAnimals, sortAnimals } from 'utils';

function mapStateToProps(state) {
  return {
    animals: selectAnimalsList(state),
    users: selectUsersList(state),
    filter: selectFilter(state),
    cartItems: selectCartItems(state),
  };
}

@connect(mapStateToProps)
export class Shop extends React.Component {
  static propTypes = {
    dispatch: PropTypes.object,
    animals: PropTypes.object,
    users: PropTypes.object,
    filter: PropTypes.object,
    cartItems: PropTypes.object,
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
    const { animals, users, filter, cartItems } = this.props;
    if (animals.size === 0 || users.size === 0) {
      return <IndeterminateLoader />;
    }

    const sortType = filter.get('sortType');
    const sortAsc = filter.get('sortAsc');

    const filteredAnimals = filterAnimals(animals, filter);
    const sortedAnimals = sortAnimals(filteredAnimals, sortType, sortAsc);

    const animalCards = sortedAnimals.map(animal => {
      const owner = users.find(
        user => user.get('id') === animal.get('salerId'),
      );
      const showCartButton =
        cartItems.find(item => item === animal.get('id')) === undefined;

      return (
        <AnimalCard
          key={animal.get('id')}
          animal={animal}
          owner={owner}
          showMoreButton={true}
          showCartButton={showCartButton}
          onAddToCart={this.onAddToCart}
        />
      );
    });

    return (
      <React.Fragment>
        <FilterPanel />
        {animalCards}
      </React.Fragment>
    );
  }
}
export default Shop;
