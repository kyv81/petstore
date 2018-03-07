import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  length: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export const Input = ({ length, onChange, placeholder, type, value }) => {
  return (
    <div className="row">
      <div className={`input-field col s${length}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = {
  length: 6,
  placeholder: 'Поиск по названию',
  type: 'text',
  value: '',
};

export default Input;
