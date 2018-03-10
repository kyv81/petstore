import React from 'react';
import { UserCard, UserAnimals } from 'containers';

export default class UserPage extends React.Component {
  render() {
    let { id } = this.props;
    return (
      <div className="row">
        <UserCard id={id} />
        <UserAnimals id={id} />
      </div>
    );
  }
}
