import React from 'react';
import PropTypes from 'prop-types';

export default class DateFilterCard extends React.Component {
  state = {
    minLimit: this.props.min,
    min: this.props.min.toString(),
    maxLimit: this.props.max,
    max: this.props.max.toString(),
    step: this.props.step,
  };

  static propTypes = {
    onSubmit: PropTypes.func,
    minLimit: PropTypes.object,
    min: PropTypes.object,
    maxLimit: PropTypes.object,
    max: PropTypes.object,
    step: PropTypes.object,
  };

  componentDidMount() {
    this.setState({
      min: this.formatDate(this.state.min),
      max: this.formatDate(this.state.max),
    });
  };

  formatDate = dateString => {
    const date = new Date(dateString);

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    const yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  };

  handleMinChange = e => {
    if (!e.target.value) {
      return;
    }

    const value = +new Date(e.target.value);
    if (value >= +new Date(this.state.max)) {
      this.setState({ min: e.target.value, max: e.target.value });
    } else {
      this.setState({ min: e.target.value });
    }
  };

  handleMaxChange = e => {
    if (!e.target.value) {
      return;
    }

    const value = +new Date(e.target.value);
    if (value <= +new Date(this.state.min)) {
      this.setState({ min: e.target.value, max: e.target.value });
    } else {
      this.setState({ max: e.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { min, max } = this.state;
    this.props.onSubmit(new Date(min), new Date(max));
  };

  render() {
    const { min, max } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Дата</span>
          <div className="row">
            <div className="col s12">
              <span>С</span>
              <input value={min} type="date" onChange={this.handleMinChange} />
            </div>
            <div className="col s12">
              <span>По</span>
              <input value={max} type="date" onChange={this.handleMaxChange} />
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