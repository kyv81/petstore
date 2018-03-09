import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const Edit = ({ onClick }) => {
  return (
    <a onClick={onClick} className="btn-floating blue">
      <i className="material-icons">create</i>
    </a>
  );
};

Edit.propTypes = propTypes;

export default Edit;
