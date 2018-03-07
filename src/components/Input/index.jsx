import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export const Input = ({ type, placeholder, value }) => {
  return (
    <div className="row">
      <div className="input-field col s6">
        <input type={type} placeholder={placeholder} value={value} />
      </div>
    </div>
  );
};

Input.propTypes = propTypes;

export default Input;
