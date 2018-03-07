import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.string,
};

export const Button = ({ children }) => {
  return <button className="waves-effect waves-light btn">{children}</button>;
};

Button.propTypes = propTypes;

export default Button;
