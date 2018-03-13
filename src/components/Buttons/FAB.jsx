import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const FAB = ({ onClick }) => {
  return (
    <div className="fixed-action-btn">
      <a
        onClick={onClick}
        className="btn-floating  btn-large waves-effect waves-light blue"
      >
        <i className="material-icons">add</i>
      </a>
    </div>
  );
};

FAB.propTypes = propTypes;

export default FAB;
