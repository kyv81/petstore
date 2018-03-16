import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserCard, IndeterminateLoader } from 'components';

//TODO: может как то вынести firebase как объект в редаксе
// типо интерфеса на всякий случай
import firebase from 'firebase';
import { UserAnimalsList } from 'containers';
import {
  tryEditUser,
  tryEditAnimal,
  tryCreateAnimal,
  tryDeleteAnimal,
  tryUploadImage,
  uploadImageFailed,
  uploadImageSuccess,
} from 'actions';

import {
  selectCurrentUserId,
  selectUserById,
  selectUsersList,
  selectAnimalsList,
} from 'selectors';

const mapStateToProps = state => {
  const localUser = selectUserById(state, selectCurrentUserId(state));
  const users = selectUsersList(state);
  const animals = selectAnimalsList(state);

  return {
    animals,
    users,
    localUser,
  };
};

@connect(mapStateToProps)
export default class UserPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    id: PropTypes.string,
    users: PropTypes.object,
    localUser: PropTypes.object,
    animals: PropTypes.object,
  };

  onEditUser = user => {
    const { dispatch } = this.props;
    dispatch(tryEditUser(user))
      .then(() => {
        M.toast({
          html: 'Обновлено',
          classes: 'green',
        });
      })
      .catch(error => {
        M.toast({
          html: error.toString(),
          classes: 'red',
        });
      });
  };

  onCreateAnimal = animal => {
    const { dispatch, localUser } = this.props;

    const creatingAnimal = Object.assign(animal, {
      salerId: localUser.get('id'),
    });

    dispatch(tryCreateAnimal(creatingAnimal))
      .then(() => {
        M.toast({
          html: 'Создано',
          classes: 'green',
        });
      })
      .catch(error => {
        M.toast({
          html: error.toString(),
          classes: 'red',
        });
      });
  };

  onEditAnimal = animal => {
    const { dispatch } = this.props;

    dispatch(tryEditAnimal(animal))
      .then(() => {
        M.toast({
          html: 'Сохранено',
          classes: 'green',
        });
      })
      .catch(error => {
        M.toast({
          html: error.toString(),
          classes: 'red',
        });
      });
  };

  onRemoveAnimal = animal => {
    const { dispatch } = this.props;

    dispatch(tryDeleteAnimal(animal))
      .then(() => {
        M.toast({
          html: 'Удалено',
          classes: 'green',
        });
      })
      .catch(error => {
        M.toast({
          html: error.toString(),
          classes: 'red',
        });
      });
  };

  // обработчики для загрузки картинки
  handleUploadStart = () => {
    const { dispatch } = this.props;
    dispatch(tryUploadImage());
  };

  handleUploadError = error => {
    const { dispatch } = this.props;
    dispatch(uploadImageFailed(error));
  };

  handleUploadSuccess = filename => {
    const { dispatch } = this.props;
    dispatch(uploadImageSuccess(filename))
      .then(() => {
        M.toast({
          html: 'Обновлено',
          classes: 'green',
        });
      })
      .catch(() => {
        M.toast({
          html: 'Ошибка',
          classes: 'red',
        });
      });
  };

  render() {
    const { id, users, animals, localUser } = this.props;

    // ссылка на storage для загрузки картинок
    const storageRef = firebase.storage().ref('img/user');

    if (users.size === 0) {
      return <IndeterminateLoader />;
    }

    const user = users.find(item => item.get('id') === id);
    const isEditable =
      localUser !== undefined &&
      localUser.size > 0 &&
      localUser.get('id') === user.get('id');

    const userAnimals = animals.filter(
      animal => animal.get('salerId') === user.get('id'),
    );

    // TODO: добавить фильтрацию
    const filteredAnimals = userAnimals;

    return (
      <div className="row">
        <div className="col s12 m4">
          {user && (
            <UserCard
              onSave={this.onEditUser}
              user={user}
              storageRef={storageRef}
              isEditable={isEditable}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          )}
        </div>
        <div className="col s12 m8">
          {/* TODO: вставить сюда фильтр */}
          <UserAnimalsList
            onEdit={this.onEditAnimal}
            onCreate={this.onCreateAnimal}
            onRemove={this.onRemoveAnimal}
            animals={filteredAnimals}
            isEditable={isEditable}
          />
        </div>
      </div>
    );
  }
}
