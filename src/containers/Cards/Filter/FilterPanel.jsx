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
    animals: state.getIn(['animals', 'animals']),
    users: state.getIn(['users', 'users']),
    // textFilterValue: state.getIn(['filter', 'textFilterValue']),
    filter: state.getIn(['filter', 'filter']),
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
    this.setState({ textFilter: e.target.value });
    this.setState({ searchReq: false });
    this.setState({ sorting: false });
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
    e.preventDefault();
    this.setState({ searchReq: true });
  };

  onToggleFilters = e => {
    e.preventDefault();
    const { filterOpen } = this.state;
    this.setState({ filterOpen: !filterOpen });
  };

  isDisplay = animal => {
    return true;
    //TODO переписать это
    // const {
    //   textFilter,
    //   searchReq,
    //   rangeMax,
    //   rangeMin,
    //   dateMin,
    //   dateMax,
    // } = this.state;
    // const { date, price } = animal;
    // const dmax = +dateMax + 86400000;
    // const dmin = +dateMin - 10800000;
    // if (
    //   price < +rangeMax &&
    //   price > +rangeMin &&
    //   date >= dmin &&
    //   date <= dmax
    // ) {
    //   if (searchReq) {
    //     if (animal.name.indexOf(textFilter) != -1) return 1;
    //     else return 0;
    //   }
    //   return 1;
    // } else return 0;
  };

  showTextFilter = () => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    this.setState({ sorting: true });
    this.setState({
      sortType: 'NameSort',
    });
  };

  showPriceFilter = () => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    this.setState({ sorting: true });
    this.setState({
      sortType: 'PriceSort',
    });
  };

  showDateFilter = () => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    this.setState({ sorting: true });

    this.setState({
      sortType: 'DateSort',
    });
  };

  Sort = animals => {
    return animals;
    //TODO переписать
    // const { asc, sortType, sorting } = this.state;
    // if (sorting) {
    //   animals.sort((a, b) => {
    //     if (sortType == 'PriceSort') {
    //       const El1 = a.price;
    //       const El2 = b.price;
    //       return asc ? El2 - El1 : El1 - El2;
    //     } else if (sortType == 'DateSort') {
    //       const El1 = a.date;
    //       const El2 = b.date;
    //       return asc ? El2 - El1 : El1 - El2;
    //     } else if (sortType == 'NameSort') {
    //       const El1 = a.name;
    //       const El2 = b.name;
    //       if (asc) {
    //         return El1 < El2 ? -1 : El1 > El2 ? 1 : 0;
    //       } else {
    //         return El1 > El2 ? -1 : El1 < El2 ? 1 : 0;
    //       }
    //     }
    //   });
    // }
    // return animals;
  };

  render() {
    const {
      textFilter,
      typeFilter,
      searchReq,
      rangeMax,
      rangeMin,
      dateMin,
      dateMax,
      filterOpen,
    } = this.props;
    //const Animals = this.Sort(animals);
    const animals = this.props.animals;
    const users = this.props.users;
    return (
        <div className="row card card-content">
          <div className="card-action">
            <TextFilterCard
              onFilter={this.onFilter}
              onChangeTextFilter={this.onChangeTextFilter}
              textFilter={textFilter}
            />
          </div>
        </div>
    );
  }
}
export default Shop;
