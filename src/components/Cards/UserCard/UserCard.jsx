import React from 'react';
import PropTypes from 'prop-types';
import { Image, UserField, UserAvatar } from 'components';

export default class UserCard extends React.Component {
  state = {
    isEditing: false,
    user: {
      id: this.props.user.get('id'),
      imgUrl: 'http://via.placeholder.com/350x150',
      firstName: this.props.user.get('firstName'),
      lastName: this.props.user.get('lastName'),
      phone: this.props.user.get('phone'),
      email: this.props.user.get('email'),
    },
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    isEditable: PropTypes.bool,
  };

  handleFirstName = firstName => {
    this.setState(
      {
        user: Object.assign(this.state.user, { firstName }),
      },
      () => this.onSave(this.state.user),
    );
  };

  handleLastName = lastName => {
    this.setState(
      {
        user: {
          user: Object.assign(this.state.user, { lastName }),
        },
      },
      () => this.onSave(this.state.user),
    );
  };

  handlePhone = phone => {
    this.setState(
      {
        user: {
          user: Object.assign(this.state.user, { phone }),
        },
      },
      () => this.onSave(this.state.user),
    );
  };

  handleEmail = email => {
    this.setState(
      {
        user: {
          user: Object.assign(this.state.user, { email }),
        },
      },
      () => this.onSave(this.state.user),
    );
  };

  onSave = user => {
    this.props.onSave(user);
  };

  render() {
    const {
      onUploadStart,
      onUploadError,
      onUploadSuccess,
      isEditable,
      user,
      storageRef,
    } = this.props;
    const { firstName, lastName, phone, email } = this.state.user;
    let imgUrl = user.get('imgUrl');

    return (
      <div className="card">
        <div className="card-content">
          <UserAvatar
            imgUrl={imgUrl}
            onUploadStart={onUploadStart}
            onUploadError={onUploadError}
            onUploadSuccess={onUploadSuccess}
            isEditable={isEditable}
            storageRef={storageRef}
          />
          <UserField
            type="text"
            text={firstName}
            isEditable={isEditable}
            onSave={this.handleFirstName}
          />
          <UserField
            type="text"
            text={lastName}
            isEditable={isEditable}
            onSave={this.handleLastName}
          />
          <hr />
          <UserField
            type="text"
            text={phone}
            isEditable={isEditable}
            onSave={this.handlePhone}
          />
          <UserField
            type="text"
            text={email}
            isEditable={isEditable}
            onSave={this.handleEmail}
          />
        </div>
      </div>
    );
  }
}
