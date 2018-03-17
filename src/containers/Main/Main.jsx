import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Home, Shop, AnimalPage, UserPage } from 'containers';

@withRouter
export default class Main extends React.PureComponent {
  render() {
    return (
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route
            path="/animal/:id"
            render={({ match }) => {
              return <AnimalPage id={match.params.id} />;
            }}
          />
          <Route
            path="/user/:id"
            render={({ match }) => {
              return <UserPage id={match.params.id} />;
            }}
          />
        </Switch>
      </main>
    );
  }
}
