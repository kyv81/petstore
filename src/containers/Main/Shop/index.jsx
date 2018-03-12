import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  AnimalCard,
  TextFilterCard,
  RangeFilterCard,
  DateFilterCard,
} from 'containers';
import { object, number, date } from 'prop-types';
import { Checkbox } from 'components';
import styles from './index.css';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.animals.animals,
    users: state.users.users,
  };
}

@connect(mapStateToProps)
export class Shop extends React.Component {
  // стейт в котором хранится фильтры
  state = {
    textFilter: '',
    rangeMin: 0,
    rangeMax: 600000,
    dateMin: new Date(0),
    dateMax: new Date(),

    searchReq: false,
    filterOpen: false,
    sorting: undefined,
    asc: true,
  };

  static propTypes = {
    animals: object,
    rangeMin: number,
    rangeMax: number,
    dateMin: object,
    dateMax: object,
  };

  //хэндлеры всех инпутов
  onChangeTextFilter = e => {
    // const { searchReq, textFilter } = this.state;
    this.setState({ searchReq: false });
    this.setState({ textFilter: e.target.value });
  };

  onChangeRangeMin = e => {
    const { rangeMin, rangeMax } = this.state;
    +rangeMin <= +rangeMax
      ? this.setState({ rangeMin: e.target.value })
      : this.setState({ rangeMin: rangeMax });
  };
  onChangeRangeMax = e => {
    const { rangeMin, rangeMax } = this.state;
    +rangeMax >= +rangeMin
      ? this.setState({ rangeMax: e.target.value })
      : this.setState({ rangeMax: rangeMin });
  };

  onChangeDateMin = e => {
    const { dateMin } = this.state;
    this.setState({ dateMin: new Date(e.target.value) });
  };
  onChangeDateMax = e => {
    const { dateMax } = this.state;
    this.setState({ dateMax: new Date(e.target.value) });
  };

  //фильтры
  onFilter = e => {
    const { textFilter, searchReq } = this.state;
    e.preventDefault();
    this.setState({ searchReq: true });
  };

  onToggleFilters = e => {
    e.preventDefault();
    const { filterOpen } = this.state;
    this.setState({ filterOpen: !filterOpen });
  };

  isDisplay = animal => {
    const {
      textFilter,
      searchReq,
      rangeMax,
      rangeMin,
      dateMin,
      dateMax,
    } = this.state;
    const { date, price } = animal;

    if (
      price < +rangeMax &&
      price > +rangeMin &&
      date >= dateMin &&
      date <= dateMax
    ) {
      if (searchReq) {
        if (animal.name.indexOf(textFilter) != -1) return 1;
        else return 0;
      }
      return 1;
    } else return 0;
  };

  showTextFilter = e => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    // e.preventDefault();
    this.setState({
      sorting: 'NameSort',
    });
  };

  showPriceFilter = e => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    this.setState({
      sorting: 'PriceSort',
    });
  };

  showDateFilter = e => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    this.setState({
      sorting: 'DateSort',
    });
  };

  Sort = animals => {
    const { asc, sorting } = this.state;

    animals.sort((a, b) => {
      if (sorting == 'PriceSort') {
        const El1 = a.price;
        const El2 = b.price;
        return asc ? El2 - El1 : El1 - El2;
      } else if (sorting == 'DateSort') {
        const El1 = a.date;
        const El2 = b.date;
        return asc ? El2 - El1 : El1 - El2;
      } else if (sorting == 'NameSort') {
        const El1 = a.name;
        const El2 = b.name;
        if (asc) {
          return El1 < El2 ? -1 : El1 > El2 ? 1 : 0;
        } else {
          return El1 > El2 ? -1 : El1 < El2 ? 1 : 0;
        }
      }
    });
    return animals;
  };

  render() {
    const { users, animals } = this.props;
    const {
      textFilter,
      typeFilter,
      searchReq,
      rangeMax,
      rangeMin,
      dateMin,
      dateMax,
      filterOpen,
    } = this.state;
    const Animals = this.Sort(animals);
    return (
      <div>
        <div className="row card card-content">
          <div className="card-action">
            <TextFilterCard
              onFilter={this.onFilter}
              onChangeTextFilter={this.onChangeTextFilter}
              textFilter={textFilter}
            />
            <a onClick={this.onToggleFilters}>
              <i className={styles.filterIcon + ' material-icons Small'}>
                filter_list
              </i>
            </a>
            <form action="#">
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onClick={this.showTextFilter}
                  />
                  <span>по названию</span>
                </label>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onClick={this.showPriceFilter}
                  />
                  <span>по цене</span>
                </label>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onClick={this.showDateFilter}
                  />
                  <span>по дате</span>
                </label>
              </p>
            </form>
          </div>
        </div>
        {filterOpen ? (
          <div className={styles.filtercontent + ' row card card-content'}>
            <div className={styles.filteraction + ' card-action'}>
              <h5> Фильтровать</h5>
              <RangeFilterCard
                onChangeRangeMin={this.onChangeRangeMin}
                onChangeRangeMax={this.onChangeRangeMax}
                rangeMin={rangeMin}
                rangeMax={rangeMax}
              />
              <DateFilterCard
                onChangeDateMin={this.onChangeDateMin}
                onChangeDateMax={this.onChangeDateMax}
                dateMin={dateMin}
                dateMax={dateMax}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        {typeof Animals !== 'undefined' &&
        Animals.length > 0 &&
        typeof users !== 'undefined' &&
        users.length > 0
          ? Animals.map(animal => {
              let owner = users.filter(user => {
                return user.id === animal.salerId;
              });
              owner = Object.assign({}, owner[0]);
              if (this.isDisplay(animal))
                return (
                  <AnimalCard animal={animal} owner={owner} key={animal.id} />
                );
              else null;
            })
          : null}
      </div>
    );
  }
}
export default Shop;
