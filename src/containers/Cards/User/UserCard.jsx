import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Image, FAB } from 'components';
import { AnimalModal, ModalContainer, UserField } from 'containers';
import { tryCreateAnimal } from 'actions';
import styles from './index.css';

const propTypes = {
  dispatch: PropTypes.func,
  firstName: PropTypes.string,
  id: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.number,
  email: PropTypes.string,
  user: PropTypes.object,
  users: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  // найдем юзера в массиве юзеров
  function findUser(users, id) {
    const index = users.findIndex(user => user.get('id') === id);
    return users.get(index);
  }

  return {
    user: findUser(state.getIn(['users', 'users']), ownProps.id),
  };
};

@connect(mapStateToProps)
class UserCard extends React.Component {
  state = {
    isEdited: false,
    username: '',
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: '',
  };

  onAdd = () => {
    const { isEdited } = this.state;
    this.setState({ isEdited: !isEdited });
  };

  onAddCancel = () => {
    const { isEdited } = this.state;
    this.setState({ isEdited: !isEdited });
  };

  onAddSubmit = (name, price, description) => {
    const { isEdited } = this.state;
    const { dispatch, id } = this.props;
    const newAnimal = {
      date: Date.now(),
      imgUrl: 'http://via.placeholder.com/150x150',
      salerId: id,
      name,
      price,
      description,
    };
    dispatch(tryCreateAnimal(newAnimal));

    this.setState({ isEdited: !isEdited });
  };

  handleChangeUsername = e => {
    this.setState({ username: e.target.value });
  };

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
  };

  handleProgress = progress => {
    this.setState({ progress });
  };

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  render() {
    const { user } = this.props;
    const { isEdited } = this.state;

    const id = user.get('id');
    const firstName = user.get('firstName');
    const lastName = user.get('lastName');
    const phone = user.get('phone');
    const email = user.get('email');

    return (
      <div className="col s6">
        <Route path="/cabinet" render={() => <h2>Мой кабинет</h2>} />
        <Route path="/user/:id" render={() => <h2>Кабинет пользователя</h2>} />
        <div className="card">
          <div className="card-image">
            <Image src="http://via.placeholder.com/350x150" />
          </div>
          <form>
            <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleChangeUsername}
            />
            <label>Avatar</label>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.avatar && <img src={this.state.avatarURL} />}
            <ImageUploader
              name="avatar"
              storageRef={firebase.storage().ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.onUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
            <button type="submit">Submit</button>
          </form>
          {user ? (
            <div key={id}>
              <div className="card-content row">
                <h3 className="card-title">Личные данные</h3>
                <div className={`col s10 ${styles.fieldRow}`}>
                  <div>Имя:</div>
                  <Route
                    path="/cabinet"
                    render={() => <UserField text={firstName} isEditable />}
                  />
                  <Route
                    path="/user/:id"
                    render={() => (
                      <UserField text={firstName} isEditable={false} />
                    )}
                  />
                </div>
                <div className={`col s10 ${styles.fieldRow}`}>
                  <div>Фамилия:</div>
                  <Route
                    path="/cabinet"
                    render={() => <UserField text={lastName} isEditable />}
                  />
                  <Route
                    path="/user/:id"
                    render={() => (
                      <UserField text={lastName} isEditable={false} />
                    )}
                  />
                </div>
              </div>
              <div className="card-content row">
                <h3 className="card-title">Контакты</h3>
                <div className={`col s10 ${styles.fieldRow}`}>
                  <i className="material-icons">phone</i>
                  <Route
                    path="/cabinet"
                    render={() => <UserField text={phone} isEditable />}
                  />
                  <Route
                    path="/user/:id"
                    render={() => <UserField text={phone} isEditable={false} />}
                  />
                </div>
                <div className={`col s10 ${styles.fieldRow}`}>
                  <i className="material-icons">mail_outline</i>
                  <Route
                    path="/cabinet"
                    render={() => <UserField text={email} isEditable />}
                  />
                  <Route
                    path="/user/:id"
                    render={() => <UserField text={email} isEditable={false} />}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <Route path="/cabinet" render={() => <FAB onClick={this.onAdd} />} />
          {isEdited ? (
            <ModalContainer>
              <AnimalModal
                onCancel={this.onAddCancel}
                onAccept={this.onAddSubmit}
                name={''}
                price={0}
                description={''}
                title="Добавить"
              />
            </ModalContainer>
          ) : null}
        </div>
      </div>
    );
  }
}

UserCard.propTypes = propTypes;
UserCard.defaultProps = {
  firstName: 'Енот',
  lastName: 'Владелец',
  phone: 1888000111,
  email: 'email@dot.com',
};

export default UserCard;
