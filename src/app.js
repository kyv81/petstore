import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Header, Main } from 'containers';
import { tryGetAnimals, tryGetUsers } from 'actions';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

import initStore from './store';

const history = createHistory();
const store = initStore(history);

function mapStateToProps(state) {
  return {
    animals: state.getIn(['animals', ['animals']]),
    users: state.getIn(['users', 'users']),
  };
}

@withRouter
@connect(mapStateToProps)
class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(tryGetAnimals());
    dispatch(tryGetUsers());
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
