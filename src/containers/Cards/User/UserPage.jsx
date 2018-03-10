import React from 'react';
import { UserCard, UserAnimals } from 'containers';

class UserPage extends React.Component {
  render() {
    return (
      <div>
        <UserCard />
        <UserAnimals />
      </div>
    );
  }
}

export default UserPage;
