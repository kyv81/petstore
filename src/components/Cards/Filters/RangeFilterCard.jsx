import React from 'react';
import PropTypes from 'prop-types';

export default class RangeFilterCard extends React.Component {
  state = {
    minLimit: this.props.minLimit,
    min: this.props.min,
    maxLimit: this.props.maxLimit,
    max: this.props.max,
    step: this.props.step,
  };

  static propTypes = {
    onSubmit: PropTypes.func,
    minLimit: PropTypes.number,
    min: PropTypes.number,
    maxLimit: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  };

  handleMinChange = e => {
    const value = Number(e.target.value);
    if (value >= this.state.max) {
      this.setState({ min: value, max: value });
    } else {
      this.setState({ min: value });
    }
  };

  handleMaxChange = e => {
    const value = Number(e.target.value);
    if (value <= this.state.min) {
      this.setState({ min: value, max: value });
    } else {
      this.setState({ max: value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { min, max } = this.state;
    this.props.onSubmit(min, max);
  };

  render() {
    const { min, max, minLimit, maxLimit } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Цена</span>
          <div className="row">
            <div className="col s12">
              <span className="left">от {min} руб.</span>
              <span className="right">до {max} руб.</span>
              <input
                value={min}
                type="range"
                min={minLimit}
                max={maxLimit}
                onChange={this.handleMinChange}
              />
            </div>
            <div className="col s12">
              <input
                value={max}
                type="range"
                min={minLimit}
                max={maxLimit}
                onChange={this.handleMaxChange}
              />
            </div>
          </div>
        </div>
        <div className="card-action">
          <a href="" onClick={this.handleSubmit}>
            Применить
          </a>
        </div>
      </div>
    );
  }
}