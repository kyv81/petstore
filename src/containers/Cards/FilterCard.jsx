import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

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
import { selectFilter, selectAnimalsList } from 'selectors';

function mapStateToProps(state) {
  const filter = selectFilter(state);
  return {
    animals: selectAnimalsList(state),
    text: filter.get('text'),
    minPrice: filter.get('minPrice'),
    maxPrice: filter.get('maxPrice'),
    minDate: filter.get('minDate'),
    maxDate: filter.get('maxDate'),
    sortType: filter.get('sortType'),
    sortAsc: filter.get('sortAsc'),
  };
}

const mapDispatchToProps = {
  changeFilterText,
  changeFilterPrice,
  changeFilterDate,
  changeFilterSort,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class FilterCard extends React.Component {
  state = {
    isFilterOpen: false,
  };

  static propTypes = {
    changeFilterText: PropTypes.func,
    changeFilterPrice: PropTypes.func,
    changeFilterDate: PropTypes.func,
    changeFilterSort: PropTypes.func,
    animals: PropTypes.instanceOf(List),
    text: PropTypes.string,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    sortAsc: PropTypes.bool,
    sortType: PropTypes.string,
  };

  onTextSubmit = text => {
    const { changeFilterText } = this.props;
    changeFilterText(text);
  };

  onRangeSubmit = (min, max) => {
    const { changeFilterPrice } = this.props;
    changeFilterPrice(min, max);
  };

  onDateSubmit = (min, max) => {
    const { changeFilterDate } = this.props;
    changeFilterDate(min, max);
  };

  onFilterToggle = () => {
    this.setState({ isFilterOpen: !this.state.isFilterOpen });
  };

  onSortingChange = (type, asc) => {
    const { changeFilterSort } = this.props;
    changeFilterSort(type, asc);
  };

  componentWillUnmount() {
    const {
      changeFilterText,
      changeFilterSort,
      changeFilterPrice,
      changeFilterDate,
    } = this.props;

    changeFilterSort('date', false);
    changeFilterPrice(0, 0);
    changeFilterText('');
    changeFilterDate(new Date(0), new Date());
  }

  render() {
    const {
      animals,
      text,
      minDate,
      maxDate,
      minPrice,
      maxPrice,
      sortAsc,
      sortType,
    } = this.props;
    const { isFilterOpen } = this.state;
    const maxLimit = Math.max(...animals.map(animal => animal.get('price')));
    const currentMaxPrice = maxPrice === 0 ? maxLimit : maxPrice;
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
                max={currentMaxPrice}
                maxLimit={maxLimit}
                onSubmit={this.onRangeSubmit}
              />
            </div>
            <div className="col s12 m6">
              <DateFilterCard
                min={minDate}
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
