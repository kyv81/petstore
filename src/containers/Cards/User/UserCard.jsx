import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Image, FAB } from 'components';
import { AnimalAdd, ModalContainer, UserField } from 'containers';
import { tryCreateAnimal } from 'actions';
import styles from './index.css';

const propTypes = {
  dispatch: PropTypes.func,
  firstName: PropTypes.string,
  id: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.number,
  email: PropTypes.string,
  users: PropTypes.array,
};

const mapStateToProps = (state, ownProps) => {
  // найдем юзера в массиве юзеров
  function findUser(users, id) {
    let index = users.findIndex(user => user.id === id);
    let user = users[index];
    return user;
  }

  return {
    user: findUser(state.users.users, ownProps.id),
  };
};

@connect(mapStateToProps)
class UserCard extends React.Component {
  state = {
    isEdited: false,
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

  render() {
    const { user } = this.props;
    const { isEdited } = this.state;
    return (
      <div className="col s6">
        <Route path="/cabinet" render={() => <h2>Мой кабинет</h2>} />
        <Route path="/user/:id" render={() => <h2>Кабинет пользователя</h2>} />
        <div className="card">
          <div className="card-image">
            <Image src="http://via.placeholder.com/350x150" />
          </div>
          {user ? (
            <div key={user.id}>
              <div className="card-content row">
                <h3 className="card-title">Личные данные</h3>
                <div className={`col s10 ${styles.fieldRow}`}>
                  <div>Имя:</div>
                  <Route
                    path="/cabinet"
                    render={() => (
                      <UserField text={user.firstName} isEditable />
                    )}
                  />
                  <Route
                    path="/user/:id"
                    render={() => (
                      <UserField text={user.firstName} isEditable={false} />
                    )}
                  />
                </div>
                <div className={`col s10 ${styles.fieldRow}`}>
                  <div>Фамилия:</div>
                  <Route
                    path="/cabinet"
                    render={() => <UserField text={user.lastName} isEditable />}
                  />
                  <Route
                    path="/user/:id"
                    render={() => (
                      <UserField text={user.lastName} isEditable={false} />
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
                    render={() => <UserField text={user.phone} isEditable />}
                  />
                  <Route
                    path="/user/:id"
                    render={() => (
                      <UserField text={user.phone} isEditable={false} />
                    )}
                  />
                </div>
                <div className={`col s10 ${styles.fieldRow}`}>
                  <i className="material-icons">mail_outline</i>
                  <Route
                    path="/cabinet"
                    render={() => <UserField text={user.email} isEditable />}
                  />
                  <Route
                    path="/user/:id"
                    render={() => (
                      <UserField text={user.email} isEditable={false} />
                    )}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <Route path="/cabinet" render={() => <FAB onClick={this.onAdd} />} />
          {isEdited ? (
            <ModalContainer>
              <AnimalAdd
                onAddCancel={this.onAddCancel}
                onAddSubmit={this.onAddSubmit}
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
