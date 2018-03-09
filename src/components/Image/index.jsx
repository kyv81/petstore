import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string,
};

export const Image = ({ src }) => {
  return <img src={src} alt="" />;
};

Image.propTypes = propTypes;
Image.defaultProps = {
  src: 'http://via.placeholder.com/150x150',
};

export default Image;
