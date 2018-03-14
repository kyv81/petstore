import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserAnimals } from 'containers';
import { UserCard } from 'components';

const mapStateToProps = state => {
  const users = state.getIn(['users', 'users']);
  const localUser = state.getIn(['auth', 'data']);
  return {
    users,
    localUser,
  };
};

@connect(mapStateToProps)
export default class UserPage extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    users: PropTypes.object,
    localUser: PropTypes.object,
  };

  editUser = user => {
    // TODO: тут сделать редактирование юзера через API
    console.log(user);
  };

  render() {
    const { id, users, localUser } = this.props;
    const user = users.find(item => item.get('id') === id);
    const isEditable =
      localUser.size > 0 && localUser.get('id') === user.get('id');

    return (
      <div className="row">
        <div className="col s12 m4">
          {user && (
            <UserCard
              onSave={this.editUser}
              user={user}
              isEditable={isEditable}
            />
          )}
        </div>
        {/* TODO вставить сюда фильтр */}
        <UserAnimals id={id} />
      </div>
    );
  }
}
