import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { Header, Main } from 'containers';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

import initStore from './store';
import { tryGetAnimals } from 'actions/animals';
// import { getUsers } from 'actions/users';

const history = createHistory();
const store = initStore(history);

@connect()
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(tryGetAnimals());
    // this.props.dispatch(getUsers());
  }
  render() {
    return (
      <div>
        <Header store={store} />
        <Main store={store} />
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
