import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string.isRequired,
};

export const Image = ({ src }) => {
  return <img src={src} alt="" />;
};

Image.propTypes = propTypes;

export default Image;
