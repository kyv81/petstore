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
  onChangeMaxDateFilter,
  onChangeTypeSort,
  onChangeIndexSort
} from 'actions/filter';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
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
  state = {
    textFilter: '',
    filterOpen: false,
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
  };
  onFilter = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { searchReq, textFilter } = this.state;
    dispatch(onChangeTextFilter(textFilter));
  };

  onChangeRangeMin = e => {
    const { dispatch, minPriceFilterValue, maxPriceFilterValue } = this.props;
    +minPriceFilterValue <= +maxPriceFilterValue
      ? dispatch(onChangeMinPriceFilter(e.target.value))
      : dispatch(onChangeMinPriceFilter(maxPriceFilterValue));
  };

  onChangeRangeMax = e => {
    const { dispatch, minPriceFilterValue, maxPriceFilterValue } = this.props;
    +minPriceFilterValue <= +maxPriceFilterValue
      ? dispatch(onChangeMaxPriceFilter(e.target.value))
      : dispatch(onChangeMaxPriceFilter(minPriceFilterValue));
  };

  onChangeDateMin = e => {
    const { dispatch } = this.props;
    dispatch(onChangeMinDateFilter(new Date(e.target.value)));
  };

  onChangeDateMax = e => {
    const { dispatch } = this.props;
    dispatch(onChangeMaxDateFilter(new Date(e.target.value)));
  };

  //фильтры

  onToggleFilters = e => {
    // e.preventDefault();
    const { filterOpen } = this.state;
    this.setState({ filterOpen: !filterOpen });
  };

  showTextFilter = () => {
    const { asc, dispatch } = this.props;
    dispatch(onChangeTypeSort('NameSort'));
    dispatch(onChangeIndexSort(!asc));
  };

  showPriceFilter = () => {
    const { asc, dispatch } = this.props;
    dispatch(onChangeTypeSort('PriceSort'));
    dispatch(onChangeIndexSort(!asc));
  };

  showDateFilter = () => {
    const { asc, dispatch } = this.props;
    dispatch(onChangeTypeSort('DateSort'));
    dispatch(onChangeIndexSort(!asc));
  };

  render() {
    const {
      textFilterValue,
      minPriceFilterValue,
      maxPriceFilterValue,
      minDateFilterValue,
      maxDateFilterValue
    } = this.props;
    const { textFilter, filterOpen } = this.state;
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
        ) : null}
      </Fragment>
    );
  }
}
export default Shop;
