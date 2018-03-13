import React from 'react';
import PropTypes from 'prop-types';
import AnimalModal from './AnimalModal';

const propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  onEditSubmit: PropTypes.func,
  onEditCancel: PropTypes.func,
  price: PropTypes.number,
};

class AnimalEdit extends React.Component {
  handleEdit = (name, price, description) => {
    const { onEditSubmit } = this.props;
    onEditSubmit(name, parseInt(price, 10), description);
  };

  handleCancel = () => {
    const { onEditCancel } = this.props;
    onEditCancel();
  };

  render() {
    const { name, price, description } = this.props;
    return (
      <AnimalModal
        description={description}
        name={name}
        price={price}
        onAccept={this.handleEdit}
        onCancel={this.handleCancel}
        title="Редактировать"
      />
    );
  }
}

AnimalEdit.propTypes = propTypes;

export default AnimalEdit;
