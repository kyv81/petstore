import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bool } from 'prop-types';

import { Home, Shop, AnimalCard } from 'containers';

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
export class Main extends React.Component {
  static propTypes = {
    isLoggedIn: bool,
  };

  render() {
    let { isLoggedIn, animals, users } = this.props;

    return (
      <main>
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
              let animal = animals.filter(animal => {
                return animal.id === match.params.id;
              })[0];
              let owner = users.filter(user => {
                return user.id === animal.salerId;
              });

              owner = Object.assign({}, owner[0]);
              return animals.length ? (
                <AnimalCard animal={animal} owner={owner} />
              ) : null;
            }}
          />
          {/* {/* <Route path="/:id" component={null} /> */}
          <Route path="/cabinet" component={null} />
        </Switch>
      </main>
    );
  }
}

export default Main;
