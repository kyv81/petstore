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

  onCancel = () => {
    const { edit } = this.state;
    const { text } = this.props;
    this.setState({ textValue: text, edit: !edit });
  };

  onSubmit = e => {
    // тут нужно сделать action в store на изменение определенного поля
    const { edit } = this.state;
    this.setState({ edit: !edit });
  };

  onEdit = () => {
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
        <Button onClick={this.onSubmit}>
          <i className="material-icons">check</i>
        </Button>
        <Button onClick={this.onCancel}>
          <i className="material-icons">clear</i>
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
          <Button onClick={this.onEdit}>
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
