import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  TextFilterCard,
  RangeFilterCard,
  DateFilterCard,
  SortingCard
} from 'containers';
import { object, number, date } from 'prop-types';
import { Checkbox } from 'components';
import styles from './index.css';

import {
  onChangeTextFilter,
  onChangeMinPriceFilter,
  onChangeMaxPriceFilter,
  onChangeMinDateFilter,
  onChangeMaxDateFilter
} from 'actions/filter';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    textFilterValue: state.getIn(['filter', 'textFilterValue']),
    minPriceFilterValue: state.getIn(['filter', 'minPriceFilterValue']),
    maxPriceFilterValue: state.getIn(['filter', 'maxPriceFilterValue']),
    minDateFilterValue: state.getIn(['filter', 'minDateFilterValue']),
    maxDateFilterValue: state.getIn(['filter', 'maxDateFilterValue']),
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
    asc: true
  };

  // static propTypes = {
  //   animals: object,
  //   users: object,
  //   rangeMin: number,
  //   rangeMax: number,
  //   dateMin: object,
  //   dateMax: object,
  // };

  onChangeTextFilter = e => {
    this.setState({ textFilter: e.target.value });
    // console.log('inside shop', e.target.value);
  };
  onFilter = e => {
    e.preventDefault();
    let { dispatch } = this.props;
    const { searchReq, textFilter } = this.state;
    // this.setState({ searchReq: true });
    dispatch(onChangeTextFilter(textFilter));
  };

  onChangeRangeMin = e => {
    let { dispatch, minPriceFilterValue, maxPriceFilterValue } = this.props;

    +minPriceFilterValue <= +maxPriceFilterValue
      ? dispatch(onChangeMinPriceFilter(e.target.value))
      : dispatch(onChangeMinPriceFilter(maxPriceFilterValue));
  };

  onChangeRangeMax = e => {
    let { dispatch, minPriceFilterValue, maxPriceFilterValue } = this.props;

    +minPriceFilterValue <= +maxPriceFilterValue
      ? dispatch(onChangeMaxPriceFilter(e.target.value))
      : dispatch(onChangeMaxPriceFilter(minPriceFilterValue));
  };

  onChangeDateMin = e => {
    let { dispatch} = this.props;
    dispatch(onChangeMinDateFilter(new Date(e.target.value)));
  };
  
  onChangeDateMax = e => {
    let { dispatch} = this.props;
    dispatch(onChangeMaxDateFilter(new Date(e.target.value)));
  };

  //фильтры

  onToggleFilters = e => {
    e.preventDefault();
    const { filterOpen } = this.state;
    this.setState({ filterOpen: !filterOpen });
  };

  showTextFilter = () => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    this.setState({ sorting: true });
    this.setState({
      sortType: 'NameSort'
    });
  };

  showPriceFilter = () => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    this.setState({ sorting: true });
    this.setState({
      sortType: 'PriceSort'
    });
  };

  showDateFilter = () => {
    const { asc } = this.state;
    this.setState({ asc: !asc });
    this.setState({ sorting: true });

    this.setState({
      sortType: 'DateSort'
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
      textFilterValue,
      minPriceFilterValue,
      maxPriceFilterValue,
      minDateFilterValue,
      maxDateFilterValue
      // searchReq,
      // dateMin,
      // dateMax,
      // filterOpen,
    } = this.props;
    const {
      searchReq,
      textFilter,
      filterOpen,
      rangeMin,
      rangeMax
    } = this.state;

    return (
      <Fragment>
        <div className='row card card-content'>
          <div className='card-action'>
            <TextFilterCard
              onFilter={this.onFilter}
              onChangeTextFilter={this.onChangeTextFilter}
              textFilterValue={textFilter}
            />
            <a onClick={this.onToggleFilters}>
              <i className={styles.filterIcon + ' material-icons Small'}>
                filter_list
              </i>
            </a>
            <SortingCard
              showTextFilter={this.showTextFilter}
              showPriceFilter={this.showPriceFilter}
              showDateFilter={this.showDateFilter}
            />
          </div>
        </div>
        {filterOpen ? (
          <div className={styles.filtercontent + ' row card card-content'}>
            <div className={styles.filteraction + ' card-action'}>
              <h5> Фильтровать</h5>
              <RangeFilterCard
                onChangeRangeMin={this.onChangeRangeMin}
                onChangeRangeMax={this.onChangeRangeMax}
                minPriceFilterValue={minPriceFilterValue}
                maxPriceFilterValue={maxPriceFilterValue}
              />
              <DateFilterCard
                onChangeDateMin={this.onChangeDateMin}
                onChangeDateMax={this.onChangeDateMax}
                minDateFilterValue={minDateFilterValue}
                maxDateFilterValue={maxDateFilterValue}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </Fragment>
    );
  }
}
export default Shop;
