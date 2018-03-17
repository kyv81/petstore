import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'components';

export default class TextFilterCard extends React.PureComponent {
  state = {
    text: this.props.text,
  };

  static propTypes = {
    text: PropTypes.string,
    onFilterToggle: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  handleInputChange = e => {
    this.setState({ text: e.target.value });
  };

  handleFilterToggle = e => {
    e.preventDefault();
    this.props.onFilterToggle();
  };

  handleSubmit = () => {
    const { text = '' } = this.state;
    this.props.onSubmit(text);
  };

  render() {
    const { text } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <div className="row">
            <div className="col s12">
              <span className="card-title left">Поиск</span>
              <a href="" className="right" onClick={this.handleFilterToggle}>
                <i className="material-icons">filter_list</i>
              </a>
            </div>
            <div className="col s10">
              <Input
                type="text"
                placeholder="Поиск..."
                value={text}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col s2">
              <Button onClick={this.handleSubmit}>Поиск</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}