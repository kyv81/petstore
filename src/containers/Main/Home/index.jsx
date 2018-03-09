import React from 'react';

import styles from './index.css';

export class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center blue-text">
                  <i className={`material-icons ${styles.large}`}>flash_on</i>
                </h2>
                <h4 className="center">Быстро</h4>
                <p className="center">Описание как все быстро</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center blue-text">
                  <i className={`material-icons ${styles.large}`}>group</i>
                </h2>
                <h4 className="center">Просто</h4>
                <p className="center">Описание как все просто</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center blue-text">
                  <i className={`material-icons ${styles.large}`}>settings</i>
                </h2>
                <h4 className="center">Надежно</h4>
                <p className="center">Описание, как оно все надежно</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
