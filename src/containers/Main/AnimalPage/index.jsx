import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectAnimalById, selectUserById } from 'selectors';

import { AnimalCard } from 'containers';

function mapStateToProps(state, ownProps) {
  const animal = selectAnimalById(state, ownProps.id);
  //проверим есть ли уже животные
  const user = animal ? selectUserById(state, animal.get('salerId')) : null;

  return {
    animal: animal,
    user: user,
  };
}

@withRouter
@connect(mapStateToProps)
export default class AnimalPage extends React.Component {
  render() {
    let { animal, user } = this.props;
    return animal && user ? (
      <div className="section">
        <AnimalCard animal={animal} owner={user} />
      </div>
    ) : null;
  }
}
