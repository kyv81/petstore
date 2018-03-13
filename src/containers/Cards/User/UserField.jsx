import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'components';
import styles from './index.css';

const propTypes = {
  text: PropTypes.string,
  isEditable: PropTypes.bool.isRequired,
};

class UserField extends React.Component {
  constructor(props) {
    super(props);
    const { text } = this.props;
    this.state = {
      edit: false,
      textValue: text,
    };
  }

  componentDidUpdate() {
    if (this.inputField) {
      const inputValue = this.inputField.value;
      this.inputField.value = '';
      this.inputField.focus();
      this.inputField.value = inputValue;
    }
  }

  onClick = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  onChange = e => {
    const val = e.target.value;
    this.setState({ textValue: val });
  };

  renderEdit = () => {
    const { textValue } = this.state;
    return (
      <span className={`input-field ${styles.field}`}>
        <Input
          value={textValue}
          onChange={this.onChange}
          inputField={input => (this.inputField = input)}
        />
        <Button onClick={this.onClick}>
          <i className="material-icons">edit</i>
        </Button>
      </span>
    );
  };

  renderView = () => {
    const { textValue } = this.state;
    const { isEditable } = this.props;
    return (
      <span className={styles.field}>
        {textValue}
        {isEditable ? (
          <Button onClick={this.onClick}>
            <i className="material-icons">edit</i>
          </Button>
        ) : null}
      </span>
    );
  };

  render() {
    const { edit } = this.state;
    return edit ? this.renderEdit() : this.renderView();
  }
}

UserField.propTypes = propTypes;
UserField.defaultProps = {
  text: '',
};

export default UserField;
