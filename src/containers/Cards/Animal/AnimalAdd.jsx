import React from 'react';
import PropTypes from 'prop-types';
import AnimalModal from './AnimalModal';

const propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  onAddCancel: PropTypes.func,
  onAddSubmit: PropTypes.func,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

class AnimalAdd extends React.Component {
  onAdd = (name, price, description) => {
    const { onAddSubmit } = this.props;
    if (name && price && description) {
      onAddSubmit(name, price, description);
    }
  };

  onCancel = () => {
    const { onAddCancel } = this.props;
    onAddCancel();
  };

  render() {
    const { name, price, description } = this.props;
    return (
      <AnimalModal
        description={description}
        name={name}
        price={price}
        onAccept={this.onAdd}
        onCancel={this.onCancel}
        title="Добавить"
      />
    );
  }
}

AnimalAdd.propTypes = propTypes;

export default AnimalAdd;
