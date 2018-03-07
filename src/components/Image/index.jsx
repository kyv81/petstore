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
  src: '',
};

export default Image;
