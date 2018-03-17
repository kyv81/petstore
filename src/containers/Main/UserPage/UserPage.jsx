import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import { UserCard, IndeterminateLoader } from 'components';
import { UserAnimalsList, FilterCard } from 'containers';
import { filterAnimals, sortAnimals } from 'utils';

//TODO: может как то вынести firebase как объект в редаксе
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
  return {
    animals: selectAnimalsList(state),
    users: selectUsersList(state),
    localUser: selectUserById(state, selectCurrentUserId(state)),
    filter: selectFilter(state),
  };
};

@connect(mapStateToProps)
export default class UserPage extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    id: PropTypes.string,
    users: PropTypes.instanceOf(List),
    localUser: PropTypes.instanceOf(Map),
    animals: PropTypes.instanceOf(List),
    filter: PropTypes.instanceOf(Map),
  };

  onEditUser = user => {
    const { dispatch } = this.props;
    dispatch(tryEditUser(user)).catch(error => {
      M.toast({
        html: error.toString(),
        classes: 'red',
      });
    });
  };

  onCreateAnimal = animal => {
    const { dispatch, localUser } = this.props;

    const newAnimal = Object.assign(animal, {
      salerId: localUser.get('id'),
    });

    dispatch(tryCreateAnimal(newAnimal)).catch(error => {
      M.toast({
        html: error.toString(),
        classes: 'red',
      });
    });
  };

  onEditAnimal = animal => {
    const { dispatch } = this.props;

    dispatch(tryEditAnimal(animal)).catch(error => {
      M.toast({
        html: error.toString(),
        classes: 'red',
      });
    });
  };

  onRemoveAnimal = animal => {
    const { dispatch } = this.props;
    dispatch(tryDeleteAnimal(animal)).catch(error => {
      M.toast({
        html: error.toString(),
        classes: 'red',
      });
    });
  };

  handleUploadStart = () => {
    const { dispatch } = this.props;
    dispatch(tryUploadImage());
  };

  handleUploadError = error => {
    const { dispatch } = this.props;
    dispatch(uploadImageFailed(error));
  };

  handleUploadUserImageSuccess = filename => {
    const { dispatch, localUser } = this.props;
    dispatch(uploadImageSuccess(filename))
      .then(url => {
        const editedUserData = localUser.set('imgUrl', url);
        dispatch(tryEditUser(editedUserData.toJS()));
      })
      .catch(error => {
        M.toast({
          html: error.toString(),
          classes: 'red',
        });
      });
  };

  handleUploadAnimalImageSuccess = (filename, id) => {
    const { dispatch, animals } = this.props;
    dispatch(uploadImageSuccess(filename))
      .then(url => {
        const findedAnimal = animals.find(animal => animal.get('id') === id);
        const editedAnimal = findedAnimal.set('imgUrl', url);
        dispatch(tryEditAnimal(editedAnimal.toJS()));
      })
      .catch(error => {
        M.toast({
          html: error.toString(),
          classes: 'red',
        });
      });
  };

  render() {
    const { id, users, animals, localUser, filter } = this.props;

    if (users.size === 0) {
      return <IndeterminateLoader />;
    }

    const storageRef = firebase.storage().ref('img/user');

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
          <FilterCard />
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
