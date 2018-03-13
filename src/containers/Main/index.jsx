import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { bool } from 'prop-types';

import { Home, Shop, AnimalPage, UserPage, Cabinet } from 'containers';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
    animals: state.getIn(['animals', 'animals']),
    users: state.getIn('users', 'users'),
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
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route
            path="/animal/:id"
            render={({ match }) => {
              return <AnimalPage id={match.params.id} />;
            }}
          />
          <Route path="/cabinet" component={Cabinet} />
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
