import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AnimalCard, FilterPanel, isDisplay, isSorting } from 'containers';
import { object, number, date } from 'prop-types';
import { Checkbox, IndeterminateLoader } from 'components';
import styles from './index.css';
// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.getIn(['animals', 'animals']),
    users: state.getIn(['users', 'users']),
    // filter: state.getIn(['filter','textFilterValue']),
    textFilterValue: state.getIn(['filter', 'textFilterValue']),
    minPriceFilterValue: state.getIn(['filter', 'minPriceFilterValue']),
    maxPriceFilterValue: state.getIn(['filter', 'maxPriceFilterValue']),
    minDateFilterValue: state.getIn(['filter', 'minDateFilterValue']),
    maxDateFilterValue: state.getIn(['filter', 'maxDateFilterValue']),
    sortType: state.getIn(['filter', 'sortType']),
    asc: state.getIn(['filter', 'asc'])
  };
}

@connect(mapStateToProps)
export class Shop extends React.Component {
  // static propTypes = {
  //   animals: object,
  //   users: object,
  //   rangeMin: number,
  //   rangeMax: number,
  //   dateMin: object,
  //   dateMax: object,
  // };

  render() {
    const {
      animals,
      users,
      textFilterValue,
      minPriceFilterValue,
      maxPriceFilterValue,
      minDateFilterValue,
      maxDateFilterValue,
      sortType,
      asc
    } = this.props;
    
    const Animals = isDisplay(
      animals,
      textFilterValue,
      minPriceFilterValue,
      maxPriceFilterValue,
      minDateFilterValue,
      maxDateFilterValue
    );
    const filteredAnimals = isSorting(Animals, sortType, asc);
    return (
      <div>
        <FilterPanel />
        {typeof animals !== 'undefined' &&
        animals.size > 0 &&
        typeof users !== 'undefined' &&
        users.size > 0
          ? filteredAnimals.map(animal => {
              const owners = users.filter(user => {
                return user.get('id') === animal.get('salerId');
              });
              const owner = owners.first();
              return (
                <AnimalCard
                  animal={animal}
                  owner={owner}
                  key={animal.get('id')}
                />
              );
            })
          : null}
      </div>
    );
  }
}
export default Shop;
