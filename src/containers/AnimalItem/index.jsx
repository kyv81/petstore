import React from 'react';
import { Route } from 'react-router';
import { string, func } from 'prop-types';

import { Button, Image, Input } from 'components';

export default class AnimalItem extends React.Component {
  //сохраним в state чтобы потом менять и его при редактировании и сохранять новый если
  // понадобится
  state = {
    date: this.props.date,
    description: this.props.description,
    price: this.props.price,
    animalName: this.props.animalName,
    imgUrl: this.props.imgUrl,
    // открыта ли модалка редактирования
    isEdited: false,
  };

  static propTypes = {
    date: string,
    description: string,
    price: string,
    animalName: string,
    onClick: func,
    imgUrl: string,
  };

  onChangeAnimalName = e => {
    this.setState({ animalName: e.target.value });
  };
  onChangePrice = e => {
    this.setState({ price: e.target.value });
  };
  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  // по нажатию на кнопку сохранить, животное сохраняется в редакс, который потом и обновляет пропсы этого
  // компонента, изменяя и старые пропсы

  onEdit = () => {
    this.setState({ isEdited: true });
  };
  onEditCancel = () => {
    // восстановим значения в state если нажали отмена
    this.setState({
      date: this.props.date,
      description: this.props.description,
      price: this.props.price,
      animalName: this.props.animalName,
      imgUrl: this.props.imgUrl,
    });
  };
  onEditSubmit = () => {
    // диспатчим евент в redux store на изменение animals
    // айди можно взять из props
  };

  render() {
    const { date, description, price, animalName, imgUrl } = this.props;
    const { isEdited, newAnimalName, newPrice, newDescription } = this.state;
    return (
      <li>
        <div>
          <Image src={imgUrl} />
        </div>
        <div>
          <div>{animalName}</div>
          <div>Цена:{price}</div>
          <div>Описание:{description}</div>
          <div>Дата публицации:{date}</div>
        </div>
        {/* в зависимоти от где мы находимся есть кнопка редактировать или ее нет */}
        <Route
          path="/cabinet"
          render={() => {
            return (
              <div>
                <Button onClick={this.onEdit}>Редактировать</Button>
                {isEdited ? (
                  <div>
                    <div>
                      <div>Редактировать</div>
                      <label>
                        <span>Имя:</span>
                        <Input
                          type="text"
                          value={newAnimalName}
                          onChange={this.onChangeAnimalName}
                        />
                      </label>
                      <label>
                        <span>Цена:</span>
                        <Input
                          type="text"
                          value={newPrice}
                          onChange={this.onChangePrice}
                        />
                      </label>
                      <label>
                        <span>Описание:</span>
                        <Input
                          type="text"
                          value={newDescription}
                          onChange={this.onChangeDescription}
                        />
                      </label>
                    </div>
                    <div>
                      <Input type="file" />
                      <Button onClick={this.onEditCancel}>ОТМЕНА</Button>
                      <Button onClick={this.onEditSubmit}>ПРИМЕНИТЬ</Button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          }}
        />
      </li>
    );
  }
}
