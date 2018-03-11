import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AnimalCard, TextFilterCard, RangeFilterCard, DateFilterCard } from 'containers';
import { object, number, date } from 'prop-types';
import { Checkbox } from 'components';
import styles from './index.css';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.animals.animals,
    users: state.users.users
  };
}

@connect(mapStateToProps)
export class Shop extends React.Component {
  // стейт в котором хранится фильтры
  state = {
    typeFilter: 'TextFilterCard',
    textFilter: '',
    rangeMin: 0,
    rangeMax: 600000,
    dateMin: '10.10.2010',
    dateMax: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),

    searchReq: false,
    filterOpen: false
  };

  // проверка пропсов
  static propTypes = {
    animals: object,
    rangeMin: number,
    rangeMax: number,
    dateMin: date
  };

  // обрабтички для фильтра
  // onChangeTypeFilter = e => {
  //   this.setState({ typeFilter: e.target.value });
  // };

  onChangeTextFilter = e => {
    let { searchReq, textFilter } = this.state;
    this.setState({ textFilter: e.target.value });
    this.setState({ searchReq: false });
    console.log('searchReq inside func', searchReq);
    // const animals =
    //   !textFilter
    //     ?(this.props.animals
    //     )
    //     :  this.props.animals.filter(
    //         animal => animal.name.indexOf(textFilter) != -1);
    //       this.props.animals = animals;
    //         // console.log(animalz);
    //         // console.log('searchReq inside render', searchReq);
    // // let { animals} = this.props
    // console.log('animals inside func', animals);
  };

  onChangeRangeMin = e => {
    let { rangeMin, rangeMax } = this.state;
    +rangeMin <= +rangeMax
      ? this.setState({ rangeMin: e.target.value })
      : this.setState({ rangeMin: rangeMax });
  };
  onChangeRangeMax = e => {
    const { rangeMin, rangeMax } = this.state;

    console.log('BEFIRE IFFF', rangeMin, rangeMax);
    +rangeMax >= +rangeMin
      ? this.setState({ rangeMax: e.target.value })
      : this.setState({ rangeMax: rangeMin });
  };

  onChangeDateMin = e => {
    const { dateMin } = this.state;
    this.setState({ dateMin: new Date(e.target.value) });
    console.log('dateMindateMindateMindateMindateMindateMindateMin', dateMin);
  };
  onChangeDateMax = e => {
    const { dateMax } = this.state;
    this.setState({ dateMax: new Date(e.target.value) });
    console.log('dateMindateMindateMindateMindateMindateMindateMin', dateMax);
  };

  onFilter = e => {
    const { textFilter, searchReq } = this.state;
    e.preventDefault();
    this.setState({ searchReq: true });
  };
  //
  // showTextFilter = e => {
  //   // e.preventDefault();
  //   this.setState({
  //     typeFilter: 'TextFilterCard',
  //   });
  // };
  //
  // showRangeFilter = e => {
  //   this.setState({
  //     typeFilter: 'RangeFilterCard',
  //   });
  // };
  //
  // showDateFilter = e => {
  //   this.setState({
  //     typeFilter: 'DateFilterCard',
  //   });
  //   const name = e.target.checked;
  //   const value = e.target.checked === false ? true : false;
  //   this.setState({name: value});
  // };
  onToggleFilters = e => {
    e.preventDefault();
    const { filterOpen } = this.state;
    this.setState({ filterOpen: !filterOpen });
  };

  isDisplay = animal => {
    const { textFilter, searchReq, rangeMax, rangeMin, dateMin, dateMax } = this.state;
    let date = new Date(animal.date);
    console.log(date,typeof(date), dateMin, typeof(dateMin), date > dateMin, date < dateMax, dateMax);
    if (animal.price < rangeMax && animal.price > rangeMin && date >= dateMin && date <= dateMax) {
      if (searchReq) {
        if (animal.name.indexOf(textFilter) != -1) return 1;
        else return 0;
      }
      return 1;
    } else return 0;
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
      filterOpen
    } = this.state;

    // console.log('ЖИВВООТТННЫЫЕЕ',animals);
    // console.log('searchReq inside render', searchReq);
    return (
      <div>
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
        {filterOpen ? (
            <div className='row card card-content'>
              <div className='card-action'>
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

        {typeof animals !== 'undefined' &&
        animals.length > 0 &&
        typeof users !== 'undefined' &&
        users.length > 0
          ? animals.map(animal => {
              let owner = users.filter(user => {
                return user.id === animal.salerId;
              });
              //console.log('filter in render shop!!!!!!!!!!!!! ANIMAL', animal, animal.name);
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
