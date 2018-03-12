import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AnimalCard } from 'containers';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state, ownProps) {
  // найдем живтоного по id
  function findById(array, id) {
    let index = array.findIndex(user => user.id === id);
    let item = array[index];
    return item;
  }

  let animal = findById(state.animals.animals, ownProps.id);
  let owner = findById(state.users.users, animal.salerId);

  return {
    animal: animal,
    user: owner,
  };
}

@withRouter
@connect(mapStateToProps)
export default class AnimalPage extends React.Component {
  render() {
    let { animal, user } = this.props;
    return (
      <div className="section">
        <AnimalCard animal={animal} owner={user} />
      </div>
    );
  }
}
