import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { object, string } from 'prop-types';
import { selectUserAnimals } from 'selectors';

import { AnimalCardSmall } from 'containers';

function mapStateToProps(state, ownProps) {
  return {
    animals: selectUserAnimals(state, ownProps.id),
  };
}

@connect(mapStateToProps)
export default class UserAnimals extends React.Component {
  // стейт компонента. тут хранятся значения фильтра
  // по которому потом фильтруем животных
  state = {
    textFilter: '',
    typeFilter: '',
  };

  static propTypes = {
    animals: object,
    user: object,
    id: string,
  };
  render() {
    const { animals } = this.props;

    return (
      <div className="col s6">
        <Route path="/cabinet" render={() => <h2>Мои животные</h2>} />
        <Route path="/user/:id" render={() => <h2>Животные</h2>} />
        {/* TODO: тут должен быть фильтр */}
        <ul>
          {/* проверим есть ли животные в animals и сразу фильтранем по id */}
          {typeof animals !== 'undefined' && animals.size > 0
            ? animals.map(animal => {
                console.log(animal);

                return (
                  <AnimalCardSmall key={animal.get('id')} animal={animal} />
                );
              })
            : null}
        </ul>
      </div>
    );
  }
}
