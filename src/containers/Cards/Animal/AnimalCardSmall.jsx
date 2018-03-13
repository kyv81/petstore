import React from 'react';
import { Route } from 'react-router';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';

import { Button, Image } from 'components';
import { AnimalEdit, ModalContainer } from 'containers';

import { tryEditAnimal, tryDeleteAnimal } from 'actions';

import styles from './index.css';

@connect()
export default class AnimalCardSmall extends React.Component {
  state = {
    // открыта ли модалка редактирования
    isEdited: false,
  };

  static propTypes = {
    dispatch: func,
    animal: object,
  };

  onEdit = () => {
    this.setState({ isEdited: true });
  };

  onEditCancel = () => {
    this.setState({
      isEdited: false,
    });
  };

  onEditSubmit = (newName, newPrice, newDescription) => {
    const { dispatch } = this.props;
    const { animal } = this.props;

    const date = animal.get('date');
    const id = animal.get('id');
    const imgUrl = animal.get('imgUrl');
    const salerId = animal.get('salerId');

    const editedAnimal = {
      date,
      description: newDescription,
      id,
      imgUrl,
      name: newName,
      price: newPrice,
      salerId,
    };

    dispatch(tryEditAnimal(editedAnimal))
      .then(() => {
        this.setState({
          isEdited: false,
        });
      })
      .catch(error => {
        M.toast({
          html: error.toString(),
          classes: 'red',
        });
      });
  };

  onDelete = () => {
    const { dispatch, animal } = this.props;
    dispatch(tryDeleteAnimal(animal.toJS())).catch(error => {
      M.toast({
        html: error.toString(),
        classes: 'red',
      });
    });
  };

  render() {
    const { animal } = this.props;
    const { isEdited } = this.state;

    const imgUrl = animal.get('imgUrl');
    const name = animal.get('name');
    const price = parseInt(animal.get('price'));
    const date = animal.get('date');
    const description = animal.get('description');

    const localisedDate = new Date(date).toLocaleDateString();

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
              <div className={`card-action ${styles.btns}`}>
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
                <Button onClick={this.onDelete}>Удалить</Button>
              </div>
            );
          }}
        />
      </li>
    );
  }
}
