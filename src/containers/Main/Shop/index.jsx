import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AnimalCard } from 'containers';
import { object } from 'prop-types';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.animals.animals,
    users: state.users.users,
  };
}

@connect(mapStateToProps)
export class Shop extends React.Component {
  // стейт в котором хранится фильтры
  state = {
    textFilter: '',
    typeFilter: '',
  };

  // проверка пропсов
  static propTypes = {
    animals: object,
  };

  // обрабтички для фильтра
  onChangeTextFilter = e => {
    this.setState({ textFilter: e.target.value });
  };
  onChangeTypeFilter = e => {
    this.setState({ typeFilter: e.target.value });
  };

  // а в пропсах хранятся Животные из redux
  render() {
    const { animals, users } = this.props;

    return (
      <Fragment>
        {/* TODO: тут нужно поставить фильтер , который будет менять state этого компонента */}

        {/* список всех животных в магазине, данные получены из redux store */}
        {typeof animals !== 'undefined' &&
        animals.length > 0 &&
        typeof users !== 'undefined' &&
        users.length > 0
          ? animals.map(animal => {
              let owner = users.filter(user => {
                return user.id === animal.salerId;
              });

              owner = Object.assign({}, owner[0]);
              console.log(owner);

              return (
                <AnimalCard
                  animal={animal}
                  owner={owner}
                  onAddToCart={() => {}}
                  key={animal.id}
                />
              );
            })
          : null}
      </Fragment>
    );
  }
}

export default Shop;
