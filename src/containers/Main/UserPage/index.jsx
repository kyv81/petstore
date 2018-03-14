import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserAnimals } from 'containers';
import { UserCard } from 'components';
import { tryEditUser } from 'actions';

import { selectCurrentUserId, selectUserById, selectUsersList } from 'selectors';

const mapStateToProps = state => {
  const localUser = selectUserById(state, selectCurrentUserId(state));
  const users = selectUsersList(state);
  return {
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
  };

  editUser = user => {
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
      })
  };

  render() {
    const { id, users, localUser } = this.props;
    const user = users.find(item => item.get('id') === id);
    const isEditable =
      localUser !== undefined &&
      localUser.size > 0 &&
      localUser.get('id') === user.get('id');

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
