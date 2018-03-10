import React from 'react';
import { Route } from 'react-router';
import { string, func, number } from 'prop-types';

import { Button, Image, Input } from 'components';

export default class AnimalCardSmall extends React.Component {
  //сохраним в state чтобы потом менять и его при редактировании и сохранять новый если
  // понадобится
  state = {
    date: this.props.date,
    newDescription: this.props.description,
    newPrice: this.props.price,
    newName: this.props.name,
    imgUrl: this.props.imgUrl,
    // открыта ли модалка редактирования
    isEdited: false,
  };

  static propTypes = {
    date: number,
    description: string,
    price: number,
    name: string,
    onClick: func,
    imgUrl: string,
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
      date: this.props.date,
      description: this.props.description,
      price: this.props.price,
      name: this.props.name,
      imgUrl: this.props.imgUrl,
    });
  };
  onEditSubmit = () => {
    // диспатчим евент в redux store на изменение animals
    // айди можно взять из props
  };

  render() {
    const { date, description, price, name, imgUrl } = this.props;
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
