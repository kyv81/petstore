import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export const Checkbox = ({ checked, label, onChange, value }) => {
  return (
    <p>
      <label>
        <input
          className="filled-in"
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
    </p>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = {
  checked: false,
  label: '',
  value: '',
};

export default Checkbox;
