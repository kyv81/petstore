import React from 'react';
import PropTypes from 'prop-types';
import { Edit, Input } from 'components';

const propTypes = {
  text: PropTypes.string,
};

class UserItem extends React.Component {
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
      <span>
        <Input value={textValue} onChange={this.onChange} />
        <Edit onClick={this.onClick} />
      </span>
    );
  };

  renderView = () => {
    const { textValue } = this.state;
    return (
      <span>
        {textValue} <Edit onClick={this.onClick} />
      </span>
    );
  };

  render() {
    const { edit } = this.state;
    return edit ? this.renderEdit() : this.renderView();
  }
}

UserItem.propTypes = propTypes;
UserItem.defaultProps = {
  text: '',
};

export default UserItem;
