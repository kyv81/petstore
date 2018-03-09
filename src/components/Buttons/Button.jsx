import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="waves-effect waves-light btn blue">
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = {
  children: '',
};

export default Button;
