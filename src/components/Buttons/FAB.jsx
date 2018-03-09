import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const FAB = ({ onClick }) => {
  return (
    <a onClick={onClick} className="btn-floating blue">
      <i className="material-icons">create</i>
    </a>
  );
};

FAB.propTypes = propTypes;

export default FAB;
