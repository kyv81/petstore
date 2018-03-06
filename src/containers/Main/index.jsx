import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home, Shop } from 'containers';

export class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
        </Switch>
      </main>
    );
  }
}

export default Main;
