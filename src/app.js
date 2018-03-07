import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { Header, Main } from 'containers';
import { Button, Input, Checkbox } from 'components';

import 'materialize-css/dist/css/materialize.min';
import 'materialize-css/dist/js/materialize.min';

import initStore from './store';

const history = createHistory();
const store = initStore(history);

class App extends React.Component {
  render() {
    return (
      <div>
        <Header store={store} />
        <Main store={store} />
        <Button onClick={this.onClick}>Text</Button>
        <Input />
        <Checkbox label="Click me" />
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
