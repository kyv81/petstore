import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  AnimalCard,
  TextFilterCard,
  RangeFilterCard,
  DateFilterCard,
  FilterPanel
} from 'containers';
import { object, number, date } from 'prop-types';
import { Checkbox } from 'components';
import styles from './index.css';
import { onChangeTextFilter } from 'actions/filter';
console.log(onChangeTextFilter);

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.getIn(['animals', 'animals']),
    users: state.getIn(['users', 'users']),
    // textFilterValue: state.getIn(['filter', 'textFilterValue']),
    filter: state.getIn(['filter','filter']),
  };
}

@connect(mapStateToProps)
export class Shop extends React.Component {
  // стейт в котором хранится фильтры
  state = {
    // textFilter: '',
    rangeMin: 0,
    rangeMax: 600000,
    dateMin: new Date(0),
    dateMax: new Date(),

    searchReq: false,
    filterOpen: false,
    sorting: false,
    sortType: undefined,
    asc: true,
  };

  static propTypes = {
    animals: object,
    users: object,
    rangeMin: number,
    rangeMax: number,
    dateMin: object,
    dateMax: object,
  };

  onChangeTextFilter = e => {
    let { dispatch, textFilterValue } = this.props;

    console.log('inside shop', e.target.value);
    dispatch(onChangeTextFilter(e.target.value));
  }

  render() {
    const {
      typeFilter,
      searchReq,
      rangeMax,
      rangeMin,
      dateMin,
      dateMax,
      filterOpen,
    } = this.state;
    const { textFilterValue } = this.props;
    //const Animals = this.Sort(animals);
    const animals = this.props.animals;
    const users = this.props.users;
    return (
      <div>
        <TextFilterCard
          onFilter={this.onFilter}
          onChangeTextFilter={this.onChangeTextFilter}
          textFilterValue={textFilterValue}
        />
        {typeof animals !== 'undefined' &&
        animals.size > 0 &&
        typeof users !== 'undefined' &&
        users.size > 0
          ? animals.map(animal => {
              let owners = users.filter(user => {
                return user.get('id') === animal.get('salerId');
              });
              const owner = owners.first();
              return <AnimalCard animal={animal} owner={owner} key={animal.get('id')} />;
            })
          : null}
      </div>
    );
  }
}
export default Shop;
