import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'components';
import styles from './index.css';

const propTypes = {
  text: PropTypes.string,
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
        <Input value={textValue} onChange={this.onChange} />
        <Button onClick={this.onClick}>
          <i className="material-icons">edit</i>
        </Button>
      </span>
    );
  };

  renderView = () => {
    const { textValue } = this.state;
    return (
      <span className={styles.field}>
        {textValue}
        <Button onClick={this.onClick}>
          <i className="material-icons">edit</i>
        </Button>
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
