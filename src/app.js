import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { withRouter } from 'react-router-dom';

import { Header, Main } from 'containers';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

import initStore from './store';
import { tryGetAnimals } from 'actions/animals';
import { tryGetUsers } from 'actions/users';

const history = createHistory();
const store = initStore(history);

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.animals.animals,
    users: state.users.users,
  };
}

@withRouter
@connect(mapStateToProps)
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(tryGetAnimals());
    this.props.dispatch(tryGetUsers());
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
