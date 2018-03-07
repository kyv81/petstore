import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export const Checkbox = ({ label, value }) => {
  return (
    <p>
      <label>
        <input className="filled-in" type="checkbox" value={value} />
        <span>{label}</span>
      </label>
    </p>
  );
};

Checkbox.propTypes = propTypes;

export default Checkbox;
