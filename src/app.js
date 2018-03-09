import React from 'react';
import ReactDOM from 'react-dom';

import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Header, Main } from 'containers';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

import { tryGetAnimals, tryGetUsers } from 'actions';

import initStore from './store';

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
  static propTypes = {
    dispatch: PropTypes.func,
  };

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
