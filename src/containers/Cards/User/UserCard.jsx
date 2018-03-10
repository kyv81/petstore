import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Image, FAB } from 'components';
import { AnimalAdd, ModalContainer, UserField } from 'containers';
import { tryCreateAnimal } from 'actions';

const propTypes = {
  firstName: PropTypes.string,
  id: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.number,
  email: PropTypes.string,
  users: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
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
    const { id, users } = this.props;
    const { isEdited } = this.state;
    return (
      <div className="col s6">
        <Route path="/cabinet" render={() => <h2>Мой кабинет</h2>} />
        <Route path="/user/:id" render={() => <h2>Кабинет пользователя</h2>} />
        <FAB onClick={this.onAdd} />
        {isEdited ? (
          <ModalContainer>
            <AnimalAdd
              onAddCancel={this.onAddCancel}
              onAddSubmit={this.onAddSubmit}
            />
          </ModalContainer>
        ) : null}
        <Image src="http://via.placeholder.com/350x150" />
        {users.map(user => {
          return user.id === id ? (
            <div key={Date.now()} className="user-wrapper">
              <div>
                <h4>Личные данные</h4>
                <div>
                  Имя:
                  <UserField text={user.firstName} />
                </div>
                <div>
                  Фамилия:
                  <UserField text={user.lastName} />
                </div>
              </div>
              <div>
                <h4>Контакты</h4>
                <div>
                  <i className="material-icons">phone</i>
                  <UserField text={`+${user.phone}`} />
                </div>
                <div>
                  <i className="material-icons">mail_outline</i>
                  <UserField text={user.email} />
                </div>
              </div>
            </div>
          ) : null;
        })}
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
