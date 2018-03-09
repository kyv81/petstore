import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'components';
import { UserField } from 'containers';

const propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.number,
  email: PropTypes.string,
};

class UserCard extends React.Component {
  render() {
    const { firstName, lastName, phone, email } = this.props;
    return (
      <div>
        <Image src="http://via.placeholder.com/350x150" />
        <div>
          <h4>Личные данные</h4>
          <div>
            Имя:
            <UserField text={firstName} />
          </div>
          <div>
            Фамилия:
            <UserField text={lastName} />
          </div>
        </div>
        <div>
          <h4>Контакты</h4>
          <div>
            <i className="material-icons">phone</i>
            <UserField text={`+${phone}`} />
          </div>
          <div>
            <i className="material-icons">mail_outline</i>
            <UserField text={email} />
          </div>
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
