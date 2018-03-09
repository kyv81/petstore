import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export default class ModalContainer extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <div {...this.props} className={styles.modal}>
        <div className="container valign-wrapper">
          <div>{children}</div>
        </div>
      </div>
    );
  }
}
