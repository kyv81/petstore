import React from 'react';
import { Route } from 'react-router';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import { Button, Image, Input } from 'components';

import { tryEditAnimal } from 'actions';

@connect()
export default class AnimalCardSmall extends React.Component {
  //сохраним в state чтобы потом менять и его при редактировании и сохранять новый если
  // понадобится
  state = {
    date: this.props.animal.date,
    newDescription: this.props.animal.description,
    newPrice: this.props.animal.price,
    newName: this.props.animal.name,
    imgUrl: this.props.animal.imgUrl,
    salerId: this.props.animal.salerId,
    id: this.props.animal.id,
    // открыта ли модалка редактирования
    isEdited: false,
  };

  static propTypes = {
    animal: object,
  };

  onChangename = e => {
    this.setState({ newName: e.target.value });
  };
  onChangePrice = e => {
    this.setState({ newPrice: parseInt(e.target.value) });
  };
  onChangeDescription = e => {
    this.setState({ newDescription: e.target.value });
  };

  // по нажатию на кнопку сохранить, животное сохраняется в редакс, который потом и обновляет пропсы этого
  // компонента, изменяя и старые пропсы

  onEdit = () => {
    this.setState({ isEdited: true });
  };
  onEditCancel = () => {
    // восстановим значения в state если нажали отмена
    this.setState({
      newDescription: this.props.animal.description,
      newPrice: this.props.animal.price,
      newName: this.props.animal.name,
      isEdited: false,
    });
  };
  onEditSubmit = () => {
    // диспатчим евент в redux store на изменение animals
    // айди можно взять из props
    let { dispatch } = this.props;
    let {
      newName,
      date,
      newDescription,
      newPrice,
      imgUrl,
      salerId,
      id,
    } = this.state;
    let editedAnimal = {
      date,
      description: newDescription,
      id,
      imgUrl,
      name: newName,
      price: newPrice,
      salerId,
    };
    console.log(editedAnimal);

    //передаем новое животное
    dispatch(tryEditAnimal(editedAnimal));

    // уберем модалку редактирования
    this.setState({
      isEdited: false,
    });
  };

  render() {
    const { animal: { date, description, price, name, imgUrl } } = this.props;
    const { isEdited, newName, newPrice, newDescription } = this.state;

    let newPriceString = newPrice.toString();
    const localisedDate = new Date(date).toLocaleDateString();

    return (
      <li>
        <div>
          <Image src={imgUrl} />
        </div>
        <div>
          <div>{name}</div>
          <div>Цена:{price}</div>
          <div>Описание:{description}</div>
          <div>Дата публицации:{localisedDate}</div>
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
                          value={newName}
                          onChange={this.onChangename}
                        />
                      </label>
                      <label>
                        <span>Цена:</span>
                        <Input
                          type="text"
                          value={newPriceString}
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
                      {/* <Input type="file" /> */}
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
