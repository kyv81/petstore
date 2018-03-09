import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AnimalCard } from 'containers';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.animals.animals,
    users: state.users.users,
  };
}

@withRouter
@connect(mapStateToProps)
export default class AnimalPage extends React.Component {
  render() {
    let { id, animals, users } = this.props;

    let animal = animals.filter(animal => {
      return animal.id === id;
    })[0];
    let owner = users.filter(user => {
      return user.id === animal.salerId;
    });

    owner = Object.assign({}, owner[0]);
    return animals.length ? (
      <div className="section">
        <AnimalCard animal={animal} owner={owner} />
      </div>
    ) : null;
  }
}
