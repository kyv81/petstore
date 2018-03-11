import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const FAB = ({ onClick }) => {
  return (
    <a
      onClick={onClick}
      className="btn-floating halfway-fab btn-large waves-effect waves-light blue"
    >
      <i className="material-icons">add</i>
    </a>
  );
};

FAB.propTypes = propTypes;

export default FAB;
