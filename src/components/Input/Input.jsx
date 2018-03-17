import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const Input = ({ onChange, placeholder, type, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

Input.propTypes = propTypes;
Input.defaultProps = {
  placeholder: '',
  type: 'text',
  value: '',
};

export default Input;
