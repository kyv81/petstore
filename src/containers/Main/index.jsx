import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home, Shop } from 'containers';
import Animal from 'containers/Animal';

export class Main extends React.Component {
  render() {
    //TODO: take isLooggedIn from Redux Store
    let { isLooggedIn = true } = this.props;
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (isLooggedIn ? <Redirect to="/shop" /> : <Home />)}
          />
          <Route path="/shop" component={Shop} />
          <Route path="/animal/:id" component={Animal} />
          <Route path="/:id" component={Animal} />
        </Switch>
      </main>
    );
  }
}

export default Main;
