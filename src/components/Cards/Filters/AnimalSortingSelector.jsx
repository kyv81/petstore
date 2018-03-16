import React from 'react';
import PropTypes from 'prop-types';

export default class RangeFilterCard extends React.Component {
  state = {
    selected: this.props.selected,
    sortAsc: this.props.sortAsc,
  };

  static propTypes = {
    onChange: PropTypes.func,
    selected: PropTypes.string,
    sortAsc: PropTypes.bool,
  };

  sortBy = key => {
    const asc = this.state.selected === key && !this.state.sortAsc;
    this.setState({
        selected: key,
        sortAsc: asc,
      },
      () => { this.props.onChange(this.state.selected, this.state.sortAsc) },
    );
  };

  sortByPrice = e => {
    e.preventDefault();
    this.sortBy('price');
  };

  sortByDate = e => {
    e.preventDefault();
    this.sortBy('date');
  };

  sortByName = e => {
    e.preventDefault();
    this.sortBy('name');
  };

  render() {
    const { selected } = this.state;

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Сортировать по</span>
          <div className="row">
            <div className="col s12 m4">
              <a
                href=""
                className={selected === 'price' ? 'pink lighten-5' : ''}
                onClick={this.sortByPrice}
              >
                Цене
              </a>
            </div>
            <div className="col s12 m4">
              <a
                href=""
                className={selected === 'date' ? 'pink lighten-5' : ''}
                onClick={this.sortByDate}
              >
                Дате
              </a>
            </div>
            <div className="col s12 m4">
              <a
                href=""
                className={selected === 'name' ? 'pink lighten-5' : ''}
                onClick={this.sortByName}
              >
                Кличке
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}