import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserCard, IndeterminateLoader } from 'components';
import { UserAnimalsList, FilterPanel } from 'containers';
import { filterAnimals, sortAnimals } from 'utils';
//TODO: может как то вынести firebase как объект в редаксе
// типо интерфеса на всякий случай
import firebase from 'firebase';
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
  selectFilter,
} from 'selectors';

const mapStateToProps = state => {
  const localUser = selectUserById(state, selectCurrentUserId(state));
  const users = selectUsersList(state);
  const animals = selectAnimalsList(state);
  const filter = selectFilter(state);
  return {
    animals,
    users,
    localUser,
    filter,
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

  // обработчик на успешную загрузку в storage картинки юзера, НЕ значит что юзер обновился
  handleUploadUserImageSuccess = filename => {
    const { dispatch } = this.props;
    // тут нам вернется url загруженной картинки в storage
    dispatch(uploadImageSuccess(filename))
      .then(url => {
        // возьмем данные авторизованного юзера
        let { localUser } = this.props;
        // получаем url и отправляем нового юзера
        let editedUserData = localUser.set('imgUrl', url);
        dispatch(tryEditUser(editedUserData.toJS()));
      })
      .catch(() => {});
  };

  // обработчик на успешную загрузку в storage картинки юзера, НЕ значит что животное обновилось
  handleUploadAnimalImageSuccess = (filename, id) => {
    const { dispatch, animals } = this.props;
    console.log(filename);
    console.log(id);
    // тут нам вернется url загруженной картинки в storage
    dispatch(uploadImageSuccess(filename))
      .then(url => {
        let findedAnimal = animals.find(animal => animal.get('id') === id);
        let editedAnimal = findedAnimal.set('imgUrl', url);
        dispatch(tryEditAnimal(editedAnimal.toJS()));
      })
      .catch(() => {});
  };

  render() {
    const { id, users, animals, localUser, filter } = this.props;

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

    const sortType = filter.get('sortType');
    const sortAsc = filter.get('sortAsc');

    const filteredAnimals = filterAnimals(userAnimals, filter);
    const sortedAnimals = sortAnimals(filteredAnimals, sortType, sortAsc);

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
              onUploadSuccess={this.handleUploadUserImageSuccess}
            />
          )}
        </div>
        <div className="col s12 m8">
          <FilterPanel />
          <UserAnimalsList
            onEdit={this.onEditAnimal}
            onCreate={this.onCreateAnimal}
            onRemove={this.onRemoveAnimal}
            animals={sortedAnimals}
            isEditable={isEditable}
            storageRef={storageRef}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadAnimalImageSuccess}
          />
        </div>
      </div>
    );
  }
}
