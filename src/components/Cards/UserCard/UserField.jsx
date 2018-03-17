import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components';

export default class UserField extends React.PureComponent {
  state = {
    isEditing: false,
    text: this.props.text,
  };

  static propTypes = {
    isEditable: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.string,
    onSave: PropTypes.func,
  };

  onChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  onEdit = () => {
    this.setState({
      isEditing: true,
    });
  };

  onCancel = () => {
    this.setState({
      text: this.props.text,
      isEditing: false,
    });
  };

  onSave = () => {
    this.props.onSave(this.state.text);
    this.setState({
      isEditing: false,
    });
  };

  renderEditing = () => {
    const { type } = this.props;
    const { text } = this.state;

    return (
      <div className="row">
        <div className="col s12">
          <input type={type} value={text} onChange={this.onChange} />
        </div>
        <div className="col s12">
          <div className="left">
            <Button onClick={this.onSave}>
              <i className="material-icons">save</i>
            </Button>
          </div>
          <div className="right">
            <Button onClick={this.onCancel}>
              <i className="material-icons">close</i>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  renderViewing = () => {
    const { text } = this.state;
    const { isEditable } = this.props;

    return isEditable ? (
      <div className="row">
        <div className="col s8">
          <p>{text}</p>
        </div>
        <div className="col s4">
          <Button onClick={this.onEdit}>
            <i className="material-icons">mode_edit</i>
          </Button>
        </div>
      </div>
    ) : (
      <p>{text}</p>
    );
  };

  render() {
    const { isEditing } = this.state;

    return isEditing ? this.renderEditing() : this.renderViewing();
  }
}
