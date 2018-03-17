import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  AnimalSortingSelector,
  DateFilterCard,
  RangeFilterCard,
  TextFilterCard,
} from 'components';

import {
  changeFilterText,
  changeFilterPrice,
  changeFilterDate,
  changeFilterSort,
} from 'actions';
import { selectFilter } from 'selectors';

function mapStateToProps(state) {
  const filter = selectFilter(state);
  return {
    text: filter.get('text'),
    minPrice: filter.get('minPrice'),
    maxPrice: filter.get('maxPrice'),
    minDate: filter.get('minDate'),
    maxDate: filter.get('maxDate'),
    sortType: filter.get('sortType'),
    sortAsc: filter.get('sortAsc'),
  };
}

// TODO: диспатчи
@connect(mapStateToProps)
export default class FilterCard extends React.Component {
  state = {
    isFilterOpen: false,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    text: PropTypes.string,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    sortAsc: PropTypes.bool,
    sortType: PropTypes.string,
  };

  onTextSubmit = text => {
    const { dispatch } = this.props;
    dispatch(changeFilterText(text));
  };

  onRangeSubmit = (min, max) => {
    const { dispatch } = this.props;
    dispatch(changeFilterPrice(min, max));
  };

  onDateSubmit = (min, max) => {
    const { dispatch } = this.props;
    dispatch(changeFilterDate(min, max));
  };

  onFilterToggle = () => {
    this.setState({ isFilterOpen: !this.state.isFilterOpen });
  };

  onSortingChange = (type, asc) => {
    const { dispatch } = this.props;
    dispatch(changeFilterSort(type, asc));
  };

  render() {
    const {
      text,
      minDate,
      maxDate,
      minPrice,
      maxPrice,
      sortAsc,
      sortType,
    } = this.props;
    const { isFilterOpen } = this.state;
    return (
      <div className="row">
        <div className="col s12">
          <TextFilterCard
            text={text}
            onSubmit={this.onTextSubmit}
            onFilterToggle={this.onFilterToggle}
          />
          <AnimalSortingSelector
            onChange={this.onSortingChange}
            selected={sortType}
            sortAsc={sortAsc}
          />
        </div>
        {isFilterOpen && (
          <React.Fragment>
            <div className="col s12 m6">
              <RangeFilterCard
                min={minPrice}
                minLimit={0}
                max={maxPrice}
                maxLimit={600000}
                onSubmit={this.onRangeSubmit}
              />
            </div>
            <div className="col s12 m6">
              <DateFilterCard
                minLimit={new Date(0)}
                min={minDate}
                maxLimit={new Date()}
                max={maxDate}
                onSubmit={this.onDateSubmit}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
