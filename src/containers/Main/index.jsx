import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { bool } from 'prop-types';

import { Home, Shop, AnimalPage } from 'containers';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    animals: state.animals.animals,
    users: state.users.users,
  };
}

@withRouter
@connect(mapStateToProps)
export default class Main extends React.Component {
  static propTypes = {
    isLoggedIn: bool,
  };

  render() {
    let { isLoggedIn } = this.props;

    return (
      <main className="container">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (isLoggedIn ? <Redirect to="/shop" /> : <Home />)}
          />
          <Route path="/shop" component={Shop} />
          <Route
            path="/animal/:id"
            //TODO : может как ты вынести эту функцию
            // находим владельца по Id
            component={({ match }) => {
              return <AnimalPage id={match.params.id} />;
            }}
          />
          {/* {/* <Route path="/:id" component={null} /> */}
          <Route path="/cabinet" component={null} />
        </Switch>
      </main>
    );
  }
}
