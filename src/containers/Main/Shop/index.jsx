import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Animal from 'containers/Animal';
import { object } from 'prop-types';

// сделаем пропсом данного компонента данные из store redux
function mapStateToProps(state) {
  return {
    animals: state.animals.animals,
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
    const { animals } = this.props;

    return (
      <Fragment>
        {/* TODO: тут нужно поставить фильтер , который будет менять state этого компонента */}

        {/* список всех животных в магазине, данные получены из redux store */}
        {typeof animals !== 'undefined' && animals.length > 0
          ? animals.map(animal => (
              <Animal
                animal
                onAddToCart={() => {}}
                imgUrl="https://picsum.photos/100/100"
                animalName="tosha"
                saler="sasha"
                description="Это собака"
                date="21.21.21"
                price="не продается"
                id="3232"
                user="user3232"
                key={animal.id}
              />
            ))
          : null}
      </Fragment>
    );
  }
}

export default Shop;
