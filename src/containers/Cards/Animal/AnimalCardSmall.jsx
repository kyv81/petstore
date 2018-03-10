import React from 'react';
import { Route } from 'react-router';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import { Button, Image } from 'components';
import { AnimalEdit, ModalContainer } from 'containers';

import { tryEditAnimal } from 'actions';

@connect()
export default class AnimalCardSmall extends React.Component {
  state = {
    // открыта ли модалка редактирования
    isEdited: false,
  };

  static propTypes = {
    animal: object,
  };

  // по нажатию на кнопку сохранить, животное сохраняется в редакс, который потом и обновляет пропсы этого
  // компонента, изменяя и старые пропсы

  onEdit = () => {
    this.setState({ isEdited: true });
  };

  onEditCancel = () => {
    // восстановим значения в state если нажали отмена
    this.setState({
      isEdited: false,
    });
  };

  onEditSubmit = (newName, newPrice, newDescription) => {
    let { dispatch } = this.props;
    let { animal: { date, imgUrl, salerId, id } } = this.props;
    let editedAnimal = {
      date,
      description: newDescription,
      id,
      imgUrl,
      name: newName,
      price: newPrice,
      salerId,
    };

    //передаем новое животное
    dispatch(tryEditAnimal(editedAnimal));

    // уберем модалку редактирования
    this.setState({
      isEdited: false,
    });
  };

  render() {
    let { animal: { date, description, price, name, imgUrl } } = this.props;
    let { isEdited } = this.state;

    const localisedDate = new Date(date).toLocaleDateString();
    price = parseInt(price);

    return (
      <li className="card">
        <div className="card-content row">
          <div className="col s12 m4">
            <Image src={imgUrl} />
          </div>
          <div className="col s12 m8">
            <div>{name}</div>
            <div>Цена:{price}</div>
            <div>Описание:{description}</div>
            <div>Дата публицации:{localisedDate}</div>
          </div>
        </div>

        {/* в зависимоти от где мы находимся есть кнопка редактировать или ее нет */}
        <Route
          path="/cabinet"
          render={() => {
            return (
              <div className="card-action">
                <Button onClick={this.onEdit}>Редактировать</Button>
                {isEdited ? (
                  <ModalContainer>
                    <AnimalEdit
                      onEditSubmit={this.onEditSubmit}
                      onEditCancel={this.onEditCancel}
                      description={description}
                      name={name}
                      price={price}
                    />
                  </ModalContainer>
                ) : null}
              </div>
            );
          }}
        />
      </li>
    );
  }
}
