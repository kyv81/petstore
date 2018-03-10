import React, { Fragment } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { object, array } from 'prop-types';

import { AnimalCardSmall } from 'containers';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.animals.animals,
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
    animals: array,
    user: object,
  };
  render() {
    const { animals, id } = this.props;

    return (
      <Fragment>
        <div>
          <Route path="/cabinet" render={() => <h2>Мои животные</h2>} />
          <Route path="/user/:id" render={() => <h2>Животные</h2>} />
          {/* TODO: тут должен быть фильтр */}
          <ul>
            {/* проверим есть ли животные в animals и сразу фильтранем по id */}
            {typeof animals !== 'undefined' && animals.length > 0
              ? animals.map(animal => {
                  return id === animal.salerId ? (
                    <AnimalCardSmall
                      key={animal.id}
                      date={animal.date}
                      description={animal.description}
                      price={animal.price}
                      name={animal.name}
                      imgUrl={animal.imgUrl}
                    />
                  ) : null;
                })
              : null}
          </ul>
        </div>
      </Fragment>
    );
  }
}
